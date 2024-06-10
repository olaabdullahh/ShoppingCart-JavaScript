// Define product
let productDom = document.querySelector('.products');
let cartProductDivDom = document.querySelector('.cart-products div');
let cartProductMenu = document.querySelector('.cart-products');
let numcart = document.querySelector('.numcart');
let shoppingCartIcon = document.querySelector('.ShoppingCart');
let products = productsDb;


// Display products
let drawProductUI;
(drawProductUI = function (products = []){
    let productUI = products.map ( (item) => {
        return `
        <div class="card m-2" style="width: 18rem;">
            <img src= ${item.imageUrl} class="card-img-top" alt="img1">
            <div class="card-body">
              <a class="productsLink" onclick="saveItemData(${item.id}) " class="card-title"> Product: ${item.title}</a>
              <h5> price: ${item.price} $</h5>
              <h5> category: ${item.category} </h5>
                 <button class="btn btn-primary" onclick= "addToCart(${item.id} )">Add To Cart</button>
              <a href="#"><i class="fas fa-heart" id="btn" style="color:${item.liked == true ? "red" : ""}" onclick="addToFavorite(${item.id})"></i> </a>
            </div>
          </div>
        `
    } );
    productDom.innerHTML = productUI.join("");
})(JSON.parse(localStorage.getItem('products')) || products);

// Check If There is in localStorage
let addedItem = localStorage.getItem('productsInCart') ? JSON.parse(localStorage.getItem('productsInCart')) : [];
if (addedItem) {
   addedItem.map(item => {
    cartProductDivDom.innerHTML += `<p> ${item.title} ${item.qty}</p>`;
   } )
   numcart.style.display = "block";
   numcart.innerHTML += addedItem.length;
}
// Add To Cart
function addToCart(id) {
    if (localStorage.getItem('username')){
        let clickedItem = products.find((item) => item.id === id);
        let item = addedItem.some((i) => i.id === clickedItem.id);
        if(item){
           addedItem = addedItem.map(p => {
            if(p.id === clickedItem.id) p.qty +=1;
          return p;
           })
        }else{
            addedItem.push(clickedItem);
        }
// UI 
        cartProductDivDom.innerHTML = "";
        addedItem.forEach((item) => {
            cartProductDivDom.innerHTML += `<p> ${item.title} ${item.qty}</p> `;
        } );
// Save Data
localStorage.setItem('productsInCart', JSON.stringify(addedItem));

// Add counter Of Item
let cartItem = document.querySelectorAll('.cart-products div p');
numcart.style.display = "block";
numcart.innerHTML = cartItem.length;

    }else {
        window.location = "login.html"
    }
};
function getUniqueArr(arr, filterType){
let unique = arr.map((item) => item[filterType]).map((item, i, final) => final.indexOf(item) === i && i).filter((item) => arr[item]).map((item) => arr[item]);
return unique
}


shoppingCartIcon.addEventListener('click' , openCartMenu)
// Open Cart Menu

function openCartMenu (){
if(cartProductDivDom.innerHTML != ""){
    if (cartProductMenu.style.display == "block"){
        cartProductMenu.style.display = "none";
    }else{
        cartProductMenu.style.display = "block";
    }
} 
};
function saveItemData(id){
localStorage.setItem('productId', id);
window.location = "cartDetails.html"
}

// search function
let selectName = document.getElementById('search');
let input1 = document.getElementById('search1');
selectName.addEventListener("change", getProductsFilter);
function getProductsFilter(e){
    let val = e.target.value;
    let products = JSON.parse(localStorage.getItem("products")) || products;
    if(val === "Search By title"){
        input1.addEventListener('keyup', function(e){
            search(e.target.value, JSON.parse(localStorage.getItem('products')) )
        if (e.target.value.trim() === ""){
            drawProductUI(JSON.parse(localStorage.getItem("products")))
        }
        });
        function search(title , myArray){
            let arr = myArray.filter((item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1);
            drawProductUI(arr); }
    }else{
        input1.addEventListener('keyup', function(e){
            search(e.target.value, JSON.parse(localStorage.getItem('products')) )
        if (e.target.value.trim() === ""){
            drawProductUI(JSON.parse(localStorage.getItem("products")))
        }
        });
        function search(category , myArray){
        
            let arr1 = myArray.filter((item) => item.category.toLowerCase().indexOf(category.toLowerCase()) !== -1);
            drawProductUI(arr1); }
    }
}


input1.addEventListener('keyup', function(e){
    search(e.target.value, JSON.parse(localStorage.getItem('products')) )
if (e.target.value.trim() === ""){
    drawProductUI(JSON.parse(localStorage.getItem("products")))
}
});

function search(title , myArray){

    let arr = myArray.filter((item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1);
    drawProductUI(arr); }
    
// Add To Favorite
let favoriteItems = localStorage.getItem('productsFavorite') ? JSON.parse(localStorage.getItem('productsFavorite')) : [];

function addToFavorite(id) {
    if (localStorage.getItem('username')){
        let clickedItem = products.find((item) => item.id === id);
        clickedItem.liked = true;
        favoriteItems = [...favoriteItems, clickedItem];
        let uniqueProducts = getUniqueArr(favoriteItems,"id");
localStorage.setItem('productsFavorite', JSON.stringify(uniqueProducts));
products.map(item => {
    if(item.id === clickedItem.id ){
        item.liked = true;
    }
})
localStorage.setItem('products', JSON.stringify(products));
drawProductUI(products);
    }else {
        window.location = "login.html"
    }
};