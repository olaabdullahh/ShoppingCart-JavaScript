
let productsDom1 = document.querySelector('.products1');
let noProducts1 = document.querySelector(".noProducts1");

function drawFavoriteProductUI (allProducts = []){
    if(JSON.parse(localStorage.getItem('productsFavorite')).length === 0)
noProducts1.innerHTML = "There Is No Items !!"
    let products = JSON.parse(localStorage.getItem('productsFavorite')) || allProducts;
    let productUI1 = products.map ( (item) => {
        return `
        <div class="card mb-3 m-1" style="width:400px">
        <div class="row g-0 ">
          <div class="col-md-4">
            <img src= ${item.imageUrl} class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body">
              <h2 class="card-title">Product: ${item.title}</h2>
              <h5> price: ${item.price} $</h5>
              <h5> category:  ${item.category} </h5>
                 <button class="btn btn-primary removeItem" onclick="removeFavoriteFromCart(${item.id})")>Remove From Cart</button>
            </div>
            </div>
            </div>
          </div>`;
    } );
    productsDom1.innerHTML = productUI1.join("");
}
drawFavoriteProductUI();

function removeFavoriteFromCart(id){
    let productsFavorite = localStorage.getItem("productsFavorite");
    if(productsFavorite){
let items = JSON.parse(productsFavorite);
let filteredItems = items.filter((item) => item.id !== id);
localStorage.setItem("productsFavorite", JSON.stringify(filteredItems));
drawFavoriteProductUI(filteredItems);
    }
};