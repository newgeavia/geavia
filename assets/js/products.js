// Dummy product data
const products = [
  { id: 1, name: "Diamond Earrings", category: "earrings", img: "assets/images/ear1.jpg", price: "₹5,999" },
  { id: 2, name: "Gold Earrings", category: "earrings", img: "assets/images/ear2.jpg", price: "₹7,999" },
  { id: 3, name: "Wedding Necklace Set", category: "wedding", img: "assets/images/wed1.jpg", price: "₹25,999" },
  { id: 4, name: "Bridal Set", category: "wedding", img: "assets/images/wed2.jpg", price: "₹32,999" },
  { id: 5, name: "Kundan Bangles", category: "bangles", img: "assets/images/bang1.jpg", price: "₹2,999" },
  { id: 6, name: "Gold Bangles", category: "bangles", img: "assets/images/bang2.jpg", price: "₹3,999" },
  { id: 7, name: "Pearl Necklace", category: "necklaces", img: "assets/images/neck1.jpg", price: "₹15,999" },
  { id: 8, name: "Diamond Necklace", category: "necklaces", img: "assets/images/neck2.jpg", price: "₹22,999" },
];

// 1. Get category from URL
const params = new URLSearchParams(window.location.search);
const category = params.get("cat");

// 2. Title update
document.getElementById("category-title").innerText =
  category === "all" ? "All Jewellery" : category.charAt(0).toUpperCase() + category.slice(1);

// 3. Filter products
const filtered = category === "all" ? products : products.filter(p => p.category === category);

// 4. Render products
const container = document.getElementById("product-list");
if (filtered.length === 0) {
  container.innerHTML = "<p>No products found.</p>";
} else {
  container.innerHTML = filtered.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price}</p>
      <button>Add to Cart</button>
    </div>
  `).join("");
}
