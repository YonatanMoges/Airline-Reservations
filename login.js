var db = new Localbase('flight-management');
var user = 1;
var Btn = document.getElementById("btn-login");
var username = document.getElementById("username");
var password = document.getElementById("password")
Btn.addEventListener('click', login);
db.collection('users').get().then(users=>{
if(!(users.length == 2)){
    
    // console.log(user)
    db.collection('users').add(
        {username:'checker',
         password:'hellochecker',
         role:'checker'   
        }
        )
        db.collection('users').add(
            {username:'admin',
            password:'admin@@1234',
            role:'admin'
        })
}
}).then(
    
)
console.log(user == 0);
if(user == 0){
db.collection('users').add(
{username:'checker',
 password:'hellochecker',
 role:'checker'   
}
)
db.collection('users').add(
    {username:'admin',
    password:'admin@@1234',
    role:'admin'
})}
function login(){

db.collection('users').doc({username: username.value,password:password.value}).get().then(
    document => {
        if(document["role"] == 'checker'){
        
            window.location.href = "checker.html";
        
        }else if(document["role"]=='admin'){
            
            window.location.href = "admin.html";

        }else{

            window.location.reload();

        }
    }

)
}