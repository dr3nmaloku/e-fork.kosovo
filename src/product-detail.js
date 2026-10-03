import { products } from "./main.js";

const slug = location.pathname.split("/").pop().replace(".html", "");
const product = products.find((item) => item.slug === slug) || products[0];
const gallery = product.images?.length ? product.images : [];
const specs = product.specs
 ? Object.entries(product.specs)
 : [ ["Model", product.model],
 ["Kapaciteti", product.capacity],
 ["Lartësia maksimale e ngritjes", product.height],
 ["Bateria", product.battery],
 ["Tipi i lëvizjes", product.drive],
 ["Gomat", product.tyres]
 ].filter(([, value]) => value && value !== "Na kontaktoni për specifikat");

document.title = `${product.name} | E-Fork Kosovo`;
document.querySelector("#product-detail").innerHTML = `
 <header class="site-header detail-header">
 <a class="brand" href="/"><span>E</span>Fork Kosovo</a>
 <nav class="nav"><a href="/#models">Modelet</a><a href="/#why-us">Pse Ne</a><a href="/#quote">Kërko Ofertë</a><a href="/#contact">Kontakt</a></nav>
 <a class="btn btn-primary" href="/?model=${encodeURIComponent(product.name)}#quote">Kërko Ofertë</a>
 </header>
 <section class="detail-hero">
 <div class="gallery">
 ${gallery[0] ? `<img class="main-photo" src="${gallery[0]}" alt="${product.name}">` : `<div class="main-photo product-image-placeholder"><span>${product.model}</span><small>Foto zyrtare në katalog në pritje</small></div>`}
 <div class="thumbs">${gallery.map((image) => `<img src="${image}" alt="${product.name}">`).join("")}</div>
 </div>
 <div class="detail-copy">
 <p class="eyebrow">Katalog E-Fork Kosovo</p>
 <h1>${product.name}</h1> <p><strong>Modeli:</strong> ${product.model}</p>
 <p>${product.description}</p>
 <dl class="spec-summary">
 <div><dt>Kapaciteti</dt><dd>${product.capacity}</dd></div>
 <div><dt>Bateria</dt><dd>${product.battery}</dd></div>
 <div><dt>Tipi i lëvizjes</dt><dd>${product.drive}</dd></div>
 </dl>
 <div class="hero-buttons">
 <a class="btn btn-primary" href="/?model=${encodeURIComponent(product.name)}#quote">Kërko Ofertë për këtë Model</a> </div>
 </div>
 </section>
 <section class="section">
 <div class="section-head"><p class="eyebrow">Specifikat teknike</p><h2>Të dhënat teknike</h2><p>Shfaqen vetëm fushat që janë të disponueshme nga katalogu. Për konfigurime të tjera, na kontaktoni për specifikat.</p></div>
 <div class="table-wrap"><table><tbody>${specs.map(([key, value]) => `<tr><th>${key}</th><td>${value}</td></tr>`).join("")}</tbody></table></div>
 </section>
 <script type="application/ld+json">${JSON.stringify({
 "@context": "https://schema.org",
 "@type": "Product",
 name: product.name,
 model: product.model,
 image: gallery,
 description: product.description,
   offers: { "@type": "Offer", priceCurrency: "EUR", availability: "https://schema.org/PreOrder", url: location.href }
 })}</script>
`;


