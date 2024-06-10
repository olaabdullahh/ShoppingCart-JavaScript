let username = document.querySelector("#username");
let password = document.querySelector("#password");
let signin = document.querySelector("#sign_in");

let getuser = localStorage.getItem("username");
let getpassword = localStorage.getItem("password");


signin.addEventListener("click", function(e){
e.preventDefault();
if (username.value === "" || password.value === "") {
    alert('please Fill Data')}else{
        if (getuser && getuser.trim()  === username.value.trim() && getpassword && getpassword === password.value){
            setTimeout(function(){
        window.location = "index.html"
            }, 1500)
        }else {
            alert('User Name Or Password Is Wrong');
        }
    }
});

