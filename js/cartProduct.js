
let productsDom = document.querySelector('.products');
let noProducts = document.querySelector(".noProducts");
let price = document.querySelector('.price')

function drawCartProductUI (allProducts = []){
if(JSON.parse(localStorage.getItem('productsInCart')).length === 0)
noProducts.innerHTML = "There Is No Items !!"
    let products = JSON.parse(localStorage.getItem('productsInCart')) || allProducts;
    let productUI = products.map ( (item) => {
        return `
        <div class="card mb-3 m-1" style="width:400px">
          <div class="row g-0">
            <div class="col-md-4">
              <img src= ${item.imageUrl} class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h2 class="card-title"> Product: ${item.title}</h2>
                <h5> price: ${item.price} $</h5>
                <h5> category:  ${item.category} </h5>
                <h5> Quantity ${item.qty} </h5>

                
                <!-- دول الزرارين بتوع الزائد و الناقص -->
                <!-- Plus and Minus buttons -->
                <div class="my-3">
                  <button class="btn btn change-quantity minus" data-id="${item.id}" data-action="decrease">-</button>
                  <button class="btn btn change-quantity plus" data-id="${item.id}" data-action="increase">+</button>
                  <span class="quantity">${item.qty}</span>
                </div>


                <!-- Remove button -->
                <button class="btn btn-primary removeItem" onclick= "removeFromCart(${item.id} )">Remove From Cart</button>
              </div>
            </div>
          </div>
        </div>`;
    } );
    productsDom.innerHTML = productUI.join("");
}
drawCartProductUI();

function removeFromCart(id){
    let productsInCart = localStorage.getItem("productsInCart");
    if(productsInCart){
      let items = JSON.parse(productsInCart);
      let filteredItems = items.filter((item) => item.id !== id);
      localStorage.setItem("productsInCart", JSON.stringify(filteredItems));
      drawCartProductUI(filteredItems);

      // ضيفت الأمر ده عشان يحدث السعر بعد ما يتم حذف العنصر
      updateTotalPrice(filteredItems);
    }
};
(function getTotalPrice(){
let productPrice = JSON.parse(localStorage.getItem('productsInCart'));
let totalPriceAll = 0 ;

if(productPrice){
productPrice.forEach(item => {
  let  totalPrice = (item.price * item.qty);
  totalPriceAll += totalPrice ;
  price.textContent = `The Price ${totalPriceAll} $`;
    })}
})()


// دى الدالة اللى بتحدث السعر الكلى بعد كل عملية تغيير فى الكمية
// بستدعيها لما بعمل أى تغيير فى الكمية سواء لما يضغط على زرار إزالة أو على الزائد و الناقص
function updateTotalPrice(items){
  let totalPriceAll = 0;
  
  if (items) {
    items.forEach((item) => {
        let totalPrice = item.price * item.qty;
        totalPriceAll += totalPrice;
    });
  }
  price.textContent = `The Price ${totalPriceAll} $`;
}




// دى الدالة اللى بتعمل الزائد و الناقص
// Functionality for Plus and Minus Buttons with Decrease Button Control

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('change-quantity')) {
    const button = e.target;
    const action = button.dataset.action;
    const id = button.dataset.id;
    const productsInCart = JSON.parse(localStorage.getItem('productsInCart'));

    const product = productsInCart.find(item => item.id == id);
    
    if (action === 'decrease' && product.qty > 1) {
      product.qty--;
      button.disabled = false; // Ensure the button is enabled when qty > 1
    } else if (action === 'increase') {
      product.qty++;
      // Find the decrease button and enable it since qty is increasing
      const decreaseButton = button.parentElement.querySelector('[data-action="decrease"]');
      if (decreaseButton) {
        decreaseButton.disabled = false;
      }
    }

    // Disable the decrease button if qty is 1
    if (product.qty === 1) {
      const decreaseButton = button.parentElement.querySelector('[data-action="decrease"]');
      if (decreaseButton) {
        decreaseButton.disabled = true;
}
    }

    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
    drawCartProductUI();
    updateTotalPrice(productsInCart);
  }
}) ;



