// ===== Mobile menu =====
function toggleMenu(){
  const m = document.getElementById('mobileMenu');
  m.classList.toggle('show');
}

// ===== Slider =====
let currentSlide = 0;
function showSlide(n){
  const slides = document.querySelectorAll('.slide');
  if(slides.length===0) return;
  slides.forEach(s => s.classList.remove('active'));
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}
function nextSlide(){ showSlide(currentSlide+1); }
function prevSlide(){ showSlide(currentSlide-1); }
setInterval(nextSlide, 5000);
document.addEventListener('DOMContentLoaded', ()=> showSlide(0));

// ===== Product gallery =====
function swapImg(src){
  const img = document.getElementById('mainImg');
  if(img) img.src = src;
}

// ===== Cart (localStorage) =====
function getCart(){
  return JSON.parse(localStorage.getItem('cart')||'[]');
}
function setCart(c){
  localStorage.setItem('cart', JSON.stringify(c));
  updateCartCountUI();
}
function updateCartCountUI(){
  const countEl = document.getElementById('cart-count');
  if(!countEl) return;
  const c = getCart();
  const count = c.reduce((n,i)=> n + (i.qty||1), 0);
  countEl.textContent = count;
}
document.addEventListener('DOMContentLoaded', updateCartCountUI);

function addToCart(item){
  let cart = getCart();
  const i = cart.findIndex(p => p.id===item.id);
  if(i>-1){
    cart[i].qty = (cart[i].qty||1) + 1;
  } else {
    item.qty = 1;
    cart.push(item);
  }
  setCart(cart);
  alert(item.name + " added to cart!");
}

function loadCart(){
  const tbody = document.getElementById('cart-items');
  const empty = document.getElementById('empty-cart');
  const totalEl = document.getElementById('total');
  const cart = getCart();
  if(!tbody || !totalEl) return;
  tbody.innerHTML = "";
  if(cart.length===0){
    if(empty) empty.style.display = 'block';
    totalEl.textContent = "₹0";
    return;
  }
  if(empty) empty.style.display = 'none';
  let total = 0;
  cart.forEach((item, idx)=>{
    const price = Number(item.price)||0;
    const qty = Number(item.qty)||1;
    const sub = price * qty;
    total += sub;
    tbody.insertAdjacentHTML('beforeend', `
      <tr>
        <td style="text-align:left;display:flex;align-items:center;gap:10px">
          <img src="${item.img}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;border-radius:8px">
          ${item.name}
        </td>
        <td>₹${price}</td>
        <td>
          <button onclick="changeQty(${idx}, -1)">-</button>
          <span style="padding:0 8px">${qty}</span>
          <button onclick="changeQty(${idx}, 1)">+</button>
        </td>
        <td>₹${sub}</td>
        <td><button onclick="removeFromCart(${idx})">Remove</button></td>
      </tr>
    `);
  });
  totalEl.textContent = "₹" + total;
  // Fill checkout summary if present
  const sItems = document.getElementById('summary-items');
  const sTotal = document.getElementById('summary-total');
  if(sItems) sItems.textContent = cart.reduce((n,i)=> n + (i.qty||1), 0);
  if(sTotal) sTotal.textContent = totalEl.textContent;
}
document.addEventListener('DOMContentLoaded', loadCart);

function changeQty(index, delta){
  let cart = getCart();
  if(!cart[index]) return;
  cart[index].qty = Math.max(1, (cart[index].qty||1) + delta);
  setCart(cart);
  loadCart();
}
function removeFromCart(index){
  let cart = getCart();
  cart.splice(index,1);
  setCart(cart);
  loadCart();
}
function buyNow(item){
  addToCart(item);
  window.location.href = 'checkout.html';
}
function checkout(){
  // In a real site, validate and send to server.
  localStorage.removeItem('cart');
  window.location.href = 'thankyou.html';
}
// --- Add product to cart ---
function addToCart(name, price, img) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let product = { name, price, img, qty: 1 };

  // Check if product already in cart
  let existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1; // increase quantity
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}
function addToCart(name, price, img) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // product object
  let product = { name, price, img };

  // cart me add karo
  cart.push(product);

  // localStorage update
  localStorage.setItem("cart", JSON.stringify(cart));

  // direct cart page open
  window.location.href = "cart.html";
}
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });
});
