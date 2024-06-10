let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let signup = document.querySelector("#sign_up");

signup.addEventListener ("click", function(e){
    e.preventDefault();
if (username.value === "" || email.value === "" || password.value === "") {
    alert('please Fill Data')
}else {
    localStorage.setItem('username', username.value);
    localStorage.setItem('email', email.value);
    localStorage.setItem('password', password.value);
    setTimeout (function(){
        window.location = "login.html"
    } , 1500)
}


});