var search  = document.getElementById("search");
var searchId  =  document.getElementById("ticketRef");
var content = document.getElementById("content-section");
search.addEventListener('click', display);
var db = new Localbase("flight-management");
function display(e){
    content.innerHTML =``;
    outPut = `
        <table>
        <tr>
        <th>
        Full Name
        </th>
        <th>
        Amount
        </th>
        <th>
        Departure Time
        </th>
        <th>
        Actions
        </th>
        </tr>

    `;
    console.log(searchId.value);
    db.collection('bookings').get({keys:true}).then(
        bookings=>{
            console.log(bookings[0])
            if(bookings[0]["key"]==searchId.value){     
            outPut += `<tr id="${bookings[0]["key"]}">
            <td>${bookings[0]["data"]["name"]}</td>
            <td>${bookings[0]["data"]["amount"]}</td>
            <td>${bookings[0]["data"]["departureTime"]}</td>
            <td><button class="btn-login" id="deleteBtn">Delete</button></td>

            </tr>`;
            }
        }

    ).then(
        response=>{
            content.innerHTML= outPut; 
            var del = document.getElementById("deleteBtn");
            del.addEventListener('click',delTicket);
        }
    );
}
function delTicket(e){
    var deleteId = e.target.parentNode.parentNode.id;
    if(confirm("are you sure you want to delete this entry?")){
        db.collection('bookings').doc(deleteId).delete()
    }
}