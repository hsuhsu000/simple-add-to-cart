//Render Products
let productDiv = document.querySelector("#product-div");
let cartsDiv = document.querySelector(".carts-table");
let showDiv = document.querySelector(".show");

function renderProducts() {
  products.forEach((product) => {
    productDiv.innerHTML += `<div class="col-12 col-lg-6 mb-4">
              <div class="card">
                <div class="card-body">
                  <img src="${product.src}" class="w-100" alt="" />
                  <hr />
                  <p class="fs-5 fw-bold">${product.name}</p>
                  <p>Price - <span class="text-primary fs-5 fw-bold">$ ${product.price}</span></p>
                  <div class="btn btn-primary w-100 cart-btn fs-6 fw-bold" onclick="addtoCarts(${product.id})">Add to cart</div>
                </div>
              </div>
            </div>`;
  });
}
renderProducts();

//cart array
let carts = JSON.parse(localStorage.getItem("productCarts")) || [];

//add to carts array
function addtoCarts(id) {
  if (carts.some((cart) => cart.id === id)) {
    changeQuantity("plus", id);
  } else {
    let cart = products.find((product) => product.id === id);
    carts.push({
      ...cart,
      quantity: 1,
    });
    console.log(carts);
  }
  updateCarts();
}

//render product carts
function renderProductsCarts() {
  showDiv.innerHTML = "";
  cartsDiv.innerHTML = "";
  carts.forEach((cart) => {
    cartsDiv.innerHTML += `<tr>
                  <td class="w-25"><img src="${cart.src}" class="img-fluid w-75" alt="" /></td>
                  <td><p class="fs-5 pt-2">$ ${cart.price}</p></td>
                  <td><i class="fa-solid fa-circle-minus fs-5 text-primary pt-3" onclick="changeQuantity('minus',${cart.id})" style="cursor:pointer"></i>
                  <span class="mx-2 fs-5 pt-3">${cart.quantity}</span>
                  <i class="fa-solid fa-circle-plus fs-5 text-primary pt-3" onclick="changeQuantity('plus',${cart.id})" style="cursor:pointer"></i></td>
                  <td><i class="fa-solid fa-trash text-danger fs-5 pt-3" onclick="removeCart(${cart.id})" title="Remove" style="cursor:pointer"></i></td>
                </tr>`;
  });
  show_hide();
}

function changeQuantity(condition, id) {
  carts = carts.map((cart) => {
    let quantity = cart.quantity;
    if (cart.id === id) {
      if (condition == "plus") {
        quantity++;
      } else if (condition == "minus" && quantity > 1) {
        quantity--;
      }
    }
    return {
      ...cart,
      quantity,
    };
  });
  updateCarts();
}

//total price and cart number
function renderNumber() {
  let totalprice = 0,
    totalcart = 0;
  carts.forEach((cart) => {
    totalprice += cart.price * cart.quantity;
    totalcart += cart.quantity;
  });

  document.querySelector("#totalPrice").innerHTML = `${totalprice}`;
  document.querySelector("#totalCart").innerHTML = `${totalcart}`;
}

//remove carts
function removeCart(id) {
  carts = carts.filter((cart) => cart.id !== id);
  updateCarts();
}

//show hide
function show_hide() {
  if (!cartsDiv.innerHTML) {
    showDiv.innerHTML = `<h5 class="text-center">No items in cart.</h5><hr>`;
  }
}

//update functions
function updateCarts() {
  renderProductsCarts();
  renderNumber();
  localStorage.setItem("productCarts", JSON.stringify(carts));
}

updateCarts();
