const products = [
  { slug: "electric-forklift-1-5t", name: "Electric Forklift 1.5T", capacity: "1.5T", height: "3.0 - 4.8 m (editable)", battery: "Lithium-Ion / Lead-acid option (editable)", drive: "Electric AC drive (editable)", image: "https://cdn.rawpng.com/3031214151.webp", description: "Compact model for indoor warehouses, retail storage and lighter pallet handling." },
  { slug: "electric-forklift-2-0t", name: "Electric Forklift 2.0T", capacity: "2.0T", height: "3.0 - 5.0 m (editable)", battery: "Lithium-Ion (editable)", drive: "Electric AC drive (editable)", image: "https://djjequipment.com.au/wp-content/uploads/2025/03/1280X1280-1.png", description: "Balanced choice for daily warehouse and production operations." },
  { slug: "electric-forklift-2-5t", name: "Electric Forklift 2.5T", capacity: "2.5T", height: "3.0 - 5.5 m (editable)", battery: "Lithium-Ion (editable)", drive: "Electric AC drive (editable)", image: "https://www.aaaforklifts.com/cdn/shop/articles/thumbnail_6ccfee68-a7ed-4c79-890b-d9a5d677661e.jpg?v=1722084122&width=2048", description: "Flexible capacity for pallets, manufacturing materials and logistics flows." },
  { slug: "electric-forklift-3-0t", name: "Electric Forklift 3.0T", capacity: "3.0T", height: "3.0 - 6.0 m (editable)", battery: "Lithium-Ion (editable)", drive: "Electric AC drive (editable)", image: "https://www.mitsubishi-forklift.co.uk/hubfs/EDIAEM33-MINAPP-HIWEB-08-P.jpg", description: "Higher-capacity model for warehouses, factories and distribution centers." },
  { slug: "electric-forklift-3-5t", name: "Electric Forklift 3.5T", capacity: "3.5T", height: "3.0 - 6.0 m (editable)", battery: "Lithium-Ion (editable)", drive: "Electric AC drive (editable)", image: "https://contenu.nyc3.digitaloceanspaces.com/journalist/ed103960-0465-448f-b4bf-64aaa473bbba/thumbnail.jpeg", description: "For businesses needing stronger lift capacity with electric operation." },
  { slug: "electric-forklift-5-0t", name: "Electric Forklift 5.0T", capacity: "5.0T", height: "3.0 - 6.0 m (editable)", battery: "Lithium-Ion high-capacity option (editable)", drive: "Electric AC drive (editable)", image: "https://safetyculture.com/library/_next/image?q=75&url=https%3A%2F%2Fmedia-signed-url-download.au.safetyculture.com%2Fcontent-library%2Foriginals%2Fe%2F9%2F8%2Ff%2Fe98f3798-c5fe-4ee9-b286-cd66a5e33405&w=3840", description: "Heavy-duty electric option for demanding material-handling environments." }
];

const translations = {
  en: {
    "nav.products": "Electric Forklifts", "nav.models": "Models", "nav.why": "Why Us", "nav.about": "About", "nav.faq": "FAQ", "nav.contact": "Contact",
    "cta.quote": "Request a Quote", "cta.models": "View Models", "hero.eyebrow": "Direct import for industrial equipment", "hero.title": "Electric Forklifts for Your Business",
    "hero.subtitle": "Modern solutions for warehouses, factories and businesses in Kosovo, supplied directly from selected manufacturers in China.",
    "trust.direct": "Direct supply from China", "trust.capacity": "1.5T - 5T models", "trust.battery": "Lithium-Ion batteries", "trust.business": "Business solutions",
    "products.eyebrow": "Expandable catalog", "products.title": "Find the Right Forklift for Your Work", "products.copy": "The models below use realistic editable placeholder data until official supplier specifications are added.",
    "why.eyebrow": "Partner for industrial purchasing", "why.title": "Why buy through E-Fork Kosovo?", "why.direct.title": "Direct from manufacturer", "why.direct.copy": "Communication and product selection with filtered manufacturers in China.", "why.price.title": "Competitive pricing", "why.price.copy": "Offers built around model, configuration and quantity.", "why.range.title": "Different models", "why.range.copy": "Capacities for warehouses, production, storage and logistics.", "why.support.title": "Pre- and after-sales support", "why.support.copy": "Support with selection, documentation and technical communication.", "why.parts.title": "Spare parts and maintenance", "why.parts.copy": "Parts and maintenance options according to agreement.", "why.custom.title": "Custom business solutions", "why.custom.copy": "Configurations for your working environment, load and workflow.",
    "process.eyebrow": "Clear process", "process.title": "From model selection to delivery in Kosovo", "process.s1": "Model selection", "process.s1c": "We define capacity, lift height and working environment.", "process.s2": "Offer and specifications", "process.s2c": "We send an offer with configuration and editable specifications.", "process.s3": "Import from China", "process.s3c": "Order, documentation and transport are coordinated.", "process.s4": "Delivery in Kosovo", "process.s4c": "Receiving and delivery are planned by agreement.",
    "apps.eyebrow": "Applications", "apps.title": "For environments where efficiency and control matter", "electric.eyebrow": "Electric technology", "electric.title": "Why electric forklifts?", "electric.copy": "Electric forklifts are especially suitable for indoor environments and operations where noise, direct emissions and operational control matter.", "compare.factor": "Factor",
    "about.eyebrow": "About Us", "about.title": "Kosovo-based supplier for modern material-handling equipment", "about.copy": "E-Fork Kosovo is a placeholder name for a Kosovo-based company focused on bringing electric forklifts and modern material-handling equipment from selected Chinese manufacturers to local businesses. Our focus is product selection, transparent communication, technical information and long-term business relationships.",
    "quote.eyebrow": "Quote request", "quote.title": "Contact us to receive an offer and full model specifications.", "quote.copy": "Submit your details and the team will prepare a suitable configuration for your required capacity, lift height and working environment.", "quote.submit": "Send Request",
    "faq.title": "Frequently Asked Questions", "contact.eyebrow": "Contact", "contact.title": "Speak with us about the right model", "footer.copy": "Electric forklifts and material-handling solutions for businesses in Kosovo."
  }
};

const grid = document.querySelector("#models");
const select = document.querySelector("#modelSelect");
if (grid) {
  grid.innerHTML = products.map((p) => `
    <article class="product-card reveal">
      <a href="/products/${p.slug}.html"><img src="${p.image}" alt="${p.name}" loading="lazy"></a>
      <div class="product-body">
        <h3>${p.name}</h3>
        <dl><div><dt>Capacity</dt><dd>${p.capacity}</dd></div><div><dt>Lifting height</dt><dd>${p.height}</dd></div><div><dt>Battery</dt><dd>${p.battery}</dd></div><div><dt>Drive</dt><dd>${p.drive}</dd></div></dl>
        <p>${p.description}</p>
        <div class="card-actions"><a class="btn btn-secondary" href="/products/${p.slug}.html">Shiko Detajet</a><a class="btn btn-primary" href="#quote">Kërko Ofertë</a></div>
      </div>
    </article>`).join("");
}
if (select) select.innerHTML = `<option>Modeli i interesuar</option>` + products.map((p) => `<option>${p.name}</option>`).join("");

document.querySelector(".menu-btn")?.addEventListener("click", () => document.body.classList.toggle("menu-open"));
document.querySelector(".lang-switch")?.addEventListener("click", () => {
  const next = document.documentElement.lang === "sq" ? "en" : "sq";
  document.documentElement.lang = next;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    if (next === "en" && translations.en[el.dataset.i18n]) el.textContent = translations.en[el.dataset.i18n];
    if (next === "sq") location.reload();
  });
});
document.querySelector(".quote-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector("button");
  const status = form.querySelector(".form-status");
  const formData = Object.fromEntries(new FormData(form).entries());
  const lang = document.documentElement.lang;

  button.disabled = true;
  status.className = "form-status";
  status.textContent = lang === "en" ? "Sending request..." : "Duke dërguar kërkesën...";

  fetch("/api/quotes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  })
    .then(async (response) => {
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.errors?.join(" ") || payload.error || "Request failed");
      form.reset();
      status.classList.add("success");
      status.textContent = lang === "en"
        ? "Your request was received. We will contact you soon."
        : "Kërkesa u pranua me sukses. Do t'ju kontaktojmë së shpejti.";
    })
    .catch((error) => {
      status.classList.add("error");
      status.textContent = error.message || (lang === "en"
        ? "Something went wrong. Please contact us by phone or WhatsApp."
        : "Diçka shkoi gabim. Ju lutemi na kontaktoni me telefon ose WhatsApp.");
    })
    .finally(() => {
      button.disabled = false;
    });
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) entry.target.classList.add("is-visible");
}), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

export { products };
