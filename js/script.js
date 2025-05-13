// Getting Data from Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

var addToCartButtons = document.querySelectorAll(".add-to-cart");


// html Panels 
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.target;

    document.querySelectorAll(".panel").forEach((panel) => {
      panel.classList.add("hidden");
    });

    document.querySelectorAll(".tab").forEach((t) => {
      t.classList.remove("border-b-4", "border-gray-400");
    });

    document
      .querySelector(`.panel-${target.split("-")[1]}`)
      .classList.remove("hidden");

    tab.classList.add("border-b-4", "border-gray-400");
  });
});

// Add To Cart

addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = btn.dataset.title;
    const price = btn.dataset.price;
    const id = btn.dataset.id;

    let product = { id, title, price, count: 1 };
    let productTemp = cart.filter((card) => card.id == id);
    if (productTemp.length) {
      productTemp[0].count++;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    alert(`محصول ${title} به سبد خرید اضافه شد !`);
  });
});

// Cart Modal

const openCartButtons = document.querySelectorAll('[id="open-cart"]');
const closeCart = document.getElementById("close-cart");
const modal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");

openCartButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("hidden");
    renderCart();
  });
});

closeCart.addEventListener("click", () => {
  modal.classList.add("hidden");
});

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      "<p class='text-center text-gray-400'>سبد خرید خالی است</p>";
    totalPriceEl.textContent = "";
    return;
  }

  cart.forEach((item, index) => {
    total += Number(item.price * item.count);

    cartItemsContainer.insertAdjacentHTML(
      "beforeend",
      `
        <div class="flex justify-between items-center border-b border-gray-700 pb-2 px-4">
          <div>
            <p class="font-semibold">${item.title}</p>
            <p class="text-sm text-gray-400">${item.price} <sub>تومان</sub></p>
          </div>
          <div class="div__boxCart">
          <button onclick="minus(${item.id})">-</button>
          <p class="text-sm text-gray-400">${item.count}</p>
          <button onclick="plus(${item.id})">+</button>
          </div>
          
        </div>
        `
    );

  });

  totalPriceEl.innerHTML = `جمع کل: ${total.toLocaleString()} تومان`;

  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });
}

function minus(id) {
  let productTemp = cart.filter((card) => card.id == id)[0];
  if (productTemp.count == 1) {
    let deleteCart = cart.filter((card) => card.id != id);
    
    cart = deleteCart;
    alert(`محصول ${productTemp.title} از سبد خرید حذف شد !`);
  } else {
    productTemp.count--;
    alert(`محصول ${productTemp.title} از سبد خرید کم شد !`);
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function plus(id) {
  

  let productTemp = cart.filter((card) => card.id == id)[0];
  productTemp.count++


  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  alert(`محصول ${productTemp.title} به سبد خرید اضافه شد !`);
}

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});