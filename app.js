//Render Products
let productDiv = document.querySelector("#product-div");
let cartsDiv = document.querySelector(".carts-table");
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
let carts = [];

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
  renderProductsCarts();
}

function renderProductsCarts() {
  cartsDiv.innerHTML = "";
  carts.forEach((cart) => {
    cartsDiv.innerHTML += `<tr>
                  <td class="w-25"><img src="${cart.src}" class="img-fluid w-75" alt="" /></td>
                  <td><p class="fs-5 pt-2">$ ${cart.price}</p></td>
                  <td><i class="fa-solid fa-circle-minus fs-5 text-primary pt-3" onclick="changeQuantity('minus',${cart.id})" style="cursor:pointer"></i>
                  <span class="mx-2 fs-5 pt-3">${cart.quantity}</span>
                  <i class="fa-solid fa-circle-plus fs-5 text-primary pt-3" onclick="changeQuantity('plus',${cart.id})" style="cursor:pointer"></i></td>
                  <td><i class="fa-solid fa-trash text-danger fs-5 pt-3" title="Remove" style="cursor:pointer"></i></td>
                </tr>`;
  });
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
  renderProductsCarts();
}
