import { products } from "./main.js";

const slug = location.pathname.split("/").pop().replace(".html", "");
const product = products.find((item) => item.slug === slug) || products[0];
const specs = [
  ["Capacity", product.capacity],
  ["Load center", "500 mm (editable placeholder)"],
  ["Maximum lifting height", product.height],
  ["Overall dimensions", "To be confirmed by supplier datasheet"],
  ["Turning radius", "Editable placeholder"],
  ["Battery type", product.battery],
  ["Battery voltage", "48V / 80V option (editable placeholder)"],
  ["Charging time", "To be confirmed by charger and battery configuration"],
  ["Motor", product.drive],
  ["Tyres", "Solid / pneumatic option (editable placeholder)"],
  ["Operating weight", "To be confirmed by supplier datasheet"],
  ["Warranty", "Editable placeholder; final terms confirmed in offer"],
  ["Available accessories", "Side shift, fork positioner, cabin, lighting package (editable)"]
];

document.title = `${product.name} | E-Fork Kosovo`;
document.querySelector("#product-detail").innerHTML = `
  <header class="site-header detail-header">
    <a class="brand" href="/"><span>E</span>Fork Kosovo</a>
    <nav class="nav"><a href="/#models">Modelet</a><a href="/#why-us">Pse Ne</a><a href="/#quote">Kërko Ofertë</a><a href="/#contact">Kontakt</a></nav>
    <a class="btn btn-primary" href="/#quote">Kërko Ofertë</a>
  </header>
  <section class="detail-hero">
    <div class="gallery">
      <img class="main-photo" src="${product.image}" alt="${product.name}">
      <div class="thumbs"><img src="${product.image}" alt=""><img src="https://cdn.rawpng.com/3031214151.webp" alt=""><img src="https://djjequipment.com.au/wp-content/uploads/2025/03/1280X1280-1.png" alt=""></div>
    </div>
    <div class="detail-copy">
      <p class="eyebrow">Specifika të editueshme</p>
      <h1>${product.name}</h1>
      <p>${product.description} Të dhënat teknike në këtë faqe janë placeholder realiste dhe duhet të zëvendësohen me datasheet-in zyrtar të furnitorit.</p>
      <dl class="spec-summary">
        <div><dt>Capacity</dt><dd>${product.capacity}</dd></div>
        <div><dt>Battery</dt><dd>${product.battery}</dd></div>
        <div><dt>Drive type</dt><dd>${product.drive}</dd></div>
      </dl>
      <a class="btn btn-primary" href="/#quote">Kërko Ofertë për këtë Model</a>
    </div>
  </section>
  <section class="section">
    <div class="section-head"><p class="eyebrow">Technical data</p><h2>Technical Specification Table</h2></div>
    <div class="table-wrap"><table><tbody>${specs.map(([key, value]) => `<tr><th>${key}</th><td>${value}</td></tr>`).join("")}</tbody></table></div>
  </section>
  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    brand: { "@type": "Brand", name: "E-Fork Kosovo" },
    offers: { "@type": "Offer", priceCurrency: "EUR", availability: "https://schema.org/PreOrder", price: "0", url: location.href }
  })}</script>
`;
