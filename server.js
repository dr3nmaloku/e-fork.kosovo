import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { DatabaseSync } from "node:sqlite";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 5173);
const distDir = join(__dirname, "dist");
const dataDir = join(__dirname, "data");
const dbPath = join(dataDir, "efork.sqlite");

await mkdir(dataDir, { recursive: true });

const db = new DatabaseSync(dbPath);
db.exec(`
  CREATE TABLE IF NOT EXISTS quote_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT,
    phone TEXT NOT NULL,
    email TEXT,
    city TEXT,
    model TEXT,
    capacity TEXT,
    lift_height TEXT,
    use_case TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    source TEXT NOT NULL DEFAULT 'website',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const quoteColumns = db.prepare("PRAGMA table_info(quote_requests)").all().map((column) => column.name);
if (!quoteColumns.includes("use_case")) {
  db.exec("ALTER TABLE quote_requests ADD COLUMN use_case TEXT");
}

const insertQuote = db.prepare(`
  INSERT INTO quote_requests
  (name, company, phone, email, city, model, capacity, lift_height, use_case, message)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const listQuotes = db.prepare(`
  SELECT id, name, company, phone, email, city, model, capacity, lift_height, use_case, message, status, created_at
  FROM quote_requests
  ORDER BY created_at DESC
  LIMIT ?
`);

app.set("trust proxy", 1);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("tiny"));
app.use(express.json({ limit: "24kb" }));
app.use(express.urlencoded({ extended: false, limit: "24kb" }));

const quoteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Shume kerkesa ne nje kohe te shkurter. Ju lutemi provoni perseri me vone." }
});

function clean(value, max = 500) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, max);
}

function validateQuote(body) {
  const quote = {
    name: clean(body.name, 120),
    company: clean(body.company, 140),
    phone: clean(body.phone, 60),
    email: clean(body.email, 160),
    city: clean(body.city, 100),
    model: clean(body.model, 120),
    capacity: clean(body.capacity, 80),
    liftHeight: clean(body.height || body.liftHeight, 80),
    useCase: clean(body.usage || body.useCase, 240),
    message: clean(body.message, 1200)
  };

  const errors = [];
  if (quote.name.length < 3) errors.push("Emri dhe mbiemri jane te detyrueshem.");
  if (quote.phone.length < 6) errors.push("Telefoni eshte i detyrueshem.");
  if (quote.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quote.email)) errors.push("Email nuk eshte valid.");
  return { quote, errors };
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "efork-kosovo", database: existsSync(dbPath) });
});

app.post("/api/quotes", quoteLimiter, (req, res) => {
  const { quote, errors } = validateQuote(req.body || {});
  if (errors.length) return res.status(400).json({ errors });

  const result = insertQuote.run(
    quote.name,
    quote.company,
    quote.phone,
    quote.email,
    quote.city,
    quote.model,
    quote.capacity,
    quote.liftHeight,
    quote.useCase,
    quote.message
  );

  res.status(201).json({
    ok: true,
    id: result.lastInsertRowid,
    message: "Kerkesa u pranua me sukses. Do t'ju kontaktojme sa me shpejt."
  });
});

app.get("/api/admin/quotes", (req, res) => {
  const expectedToken = process.env.ADMIN_TOKEN;
  if (expectedToken && req.get("x-admin-token") !== expectedToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (!expectedToken && process.env.NODE_ENV === "production") {
    return res.status(404).json({ error: "Not found" });
  }
  res.json({ quotes: listQuotes.all(Math.min(Number(req.query.limit) || 50, 200)) });
});

app.use(express.static(distDir));
app.get(/.*/, (req, res) => {
  const safePath = req.path.replace(/^\/+/, "");
  const htmlPath = resolve(distDir, safePath);
  if (safePath.endsWith(".html") && htmlPath.startsWith(distDir)) {
    return res.sendFile(htmlPath);
  }
  res.sendFile(join(distDir, "index.html"));
});

app.listen(port, () => {
  console.log(`E-Fork Kosovo backend running at http://127.0.0.1:${port}`);
});
