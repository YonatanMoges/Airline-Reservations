window.onload = ()=>{
    window.sessionStorage.setItem("username","aaa@gmail.com");
    window.sessionStorage.setItem("password","123");
}

var input = document.getElementsByTagName('input');
//var adminEmail=document.getElementById("adminEmail");
//var adminPassword=document.getElementById("adminPassword");
var login = document.getElementById("login");
var form = document.querySelector("form");

;
form.onsubmit=()=>{
    return false
}
login.onclick=()=>{
    console.log(input[0].value);
    console.log(input[1].value);
    /* console.log(adminEmail.value);
    console.log(adminPassword.value); */
    if ((input[0].value !="")&&(input[1].value !="")){
        if((input[0].value == sessionStorage.getItem("username"))&&(input[0].value==sessionStorage.getItem("password"))){
            form.onsubmit=()=>{return 1}
        }
        
    
    else{
        if(input[0].value == ""){
             alert("Username is empty") ;
            ;
            
        }
        if(input[1].value == ""){
            alert("Password is empty") ;
           ;
           
       }
    }
}
    


/* 
const adminEmail = document.getElementById(adminEmail);
const adminPassword = document.getElementById(adminPassword);

if ((adminEmail==="abc")&&(adminPassword==="123")){

}
else{
    
} */