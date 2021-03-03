import productdb,{
    bulkcreate
} from './module.js';

let db = productdb("Userdb",{
    users:`Email,firstName,lastName,Password`
});

const email = document.getElementById("email");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const password = document.getElementById("password");
const btnSignUp = document.getElementById("signUp");

btnSignUp.onclick=(event)=>{
    let flag = bulkcreate(db.users,{
        Email : email.value,
        FirstName : firstName.value,
        LastName : lastName.value,
        Password : password.value,
    })
    console.log(flag);

    email.value="";
    firstName.value="";
    lastName.value="";
    password.value="";
}