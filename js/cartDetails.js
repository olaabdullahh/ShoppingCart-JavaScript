let products = JSON.parse(localStorage.getItem("products"));
 let productId = localStorage.getItem("productId");
 let itemDom = document.querySelector('.itemdetails')
 let productDetails = products.find((item) => item.id == productId);
itemDom.innerHTML = `    <img src="${productDetails.imageUrl}" alt="img1">
<h2>  ${productDetails.title} </h2>
<span> category: ${productDetails.category} </span> <br> <span> Quantity:
${productDetails.qty} </span>`