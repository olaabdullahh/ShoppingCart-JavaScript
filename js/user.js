
let userInfo = document.querySelector("#user_info");
let userDom = document.querySelector("#user");
let links = document.querySelector("#links");
let username = localStorage.getItem("username");
let logout = document.querySelector("#logout")

if (username){
    links.remove();
    userInfo.style.display = "flex";
    userDom.innerHTML = `welcome ${username}`;
    userDom.style.paddingRight = "300px";

}
logout.addEventListener("click", function(){
    localStorage.clear();
    setTimeout(() => {
window.location = "register.html"
    }, 1500)
})