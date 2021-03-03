//global variables
var db = new Localbase('flight-management')
var home = document.getElementById("home");
var book = document.getElementById("book");
var manage = document.getElementById("Manageflight");
var content = document.getElementById("content-section");
var notice = document.getElementById("notice-section");

home.addEventListener('click',function(){
    window.location.href="index.html";

}) 
book.addEventListener('click', bookPage);
manage.addEventListener('click', managePage);
 
 
function bookPage(){
content.innerHTML="";
let topDiv = document.createElement("div");
topDiv.className="book-form";
let h2 = document.createElement("h2");
h2.className="header";
let headerText = document.createTextNode("Book A flight")
h2.appendChild(headerText);
let div1  = document.createElement("div");
div1.className="source-span";
let div2 =  document.createElement("div");
div2.className="destination-span"; 
var outPutSource = `Source: <select  class="source" name="" id="source" default="none">`; 
var outPutDestination = `Destination: <select  class="source" name="" id="destination" default="none">`;

db.collection('flights').get().then(
    flights=>{
        
        for(i=0;i<flights.length;i++){
        console.log(flights[i]["source"]);
        outPutSource += `<option class="option-item" value="${flights[i]["source"]}" id="${flights[i]["key"]}">${flights[i]["source"]}</option>`;
        outPutDestination += `<option class="option-item" value="${flights[i]["destination"]}" id="${flights[i]["key"]}">${flights[i]["destination"]}</option>`    
        }
    }
).then(
    Destination=>{
        outPutSource+=`</select>`;
        outPutDestination +=`</select>`;
       
        div1.innerHTML =outPutSource ;
        div2.innerHTML=outPutDestination;
    }
 
);

let div3 = document.createElement("div");
let anotherDiv = document.createElement("h2");
div3.className="calendar-span";
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10){
  dd='0'+dd
} 
if(mm<10){
  mm='0'+mm
} 
today = yyyy+'-'+mm+'-'+dd;

div3.innerHTML = `<input type="date" name="booking-date" id="date" value='${today}' min='${today}'>`;
let btn = document.createElement("button");
btn.className="btn-book";
let btnTxt = document.createTextNode("Search");
    btn.id = "searchButton";
    btn.appendChild(btnTxt);
    topDiv.appendChild(h2);
    topDiv.appendChild(div1);
    topDiv.appendChild(div2);
    topDiv.appendChild(div3);
    topDiv.appendChild(btn)
    content.appendChild(topDiv);
    var buttonSearch = document.getElementById("searchButton"); 
    buttonSearch.addEventListener('click', searchFlights);    
}
function managePage(){
    content.innerHTML = "";
    let topDiv =  document.createElement("div");
    topDiv.className = "manage-booking";
    let h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode("Manage Flight"));
    h2.className="new-header";
    let div1 = document.createElement("div");
    div1.className="ticket-reference-span";
    div1.innerHTML = `Ticket Reference: <input class="ticket-ref" type="text" name="ticketRef" id="ticketRef" placeholder="ticket-reference">`;
    let div2  = document.createElement("div");
    div2.className="last-name-span";
    div2.innerHTML=`  Last Name: <input class="last-name" type="text" name="fullName" id="fullName" placeholder="Last Name">`;
    let btn = document.createElement("button");
    btn.className="search-tickets";
    btn.id = "retrieve";
    let btnText = document.createTextNode("Retrieve");
    btn.addEventListener('click',retrieve)
    btn.appendChild(btnText);
    topDiv.appendChild(h2);
    topDiv.appendChild(div1);
    topDiv.appendChild(div2);
    topDiv.appendChild(btn);
    content.appendChild(topDiv);
    var retrieve = document.getElementById("retrieve");
   console.log(retrieve);
   retrieve.addEventListener('click',alls);

}
function searchFlights(e){
   
    content.innerHTML == '';
    var source =  document.getElementById("source");
    var destination =  document.getElementById("destination");
    var date =  document.getElementById("date");
    var tableCheck = document.getElementsByClassName("flights-listed")[0];
    if(tableCheck){
        tableCheck.remove();
    }
    var table = `
    <table class="flights-listed">
    <tr>
        <th>Flight Number</th>
        <th>Source</th>
        <th>Destination</th>
        <th>Price</th>
        <th>Available seats</th>
         
    </tr>
    `;
    var innerTable = ``;
    db.collection("flights").get({keys:true}).then(flights=>{
     
    for(i=0;i<flights.length;i++){
   if(flights[i]["data"]["source"]==source.value && flights[i]["data"]["destination"]==destination.value && flights[i]["data"]["date"] == date.value){
   
    innerTable += `<tr id='${flights[i]["key"]}'>
           
    <td>
    ${i+1}
    </td>
    <td>
    ${flights[i]["data"]["source"]}
    </td>
    <td>
    ${flights[i]["data"]["destination"]}
    </td>
    <td>
    ${flights[i]["data"]["price"]}
    </td>
    <td>
    ${flights[i]["data"]["availableSeats"]}
    </td>
    <td>
    <button class="btn-book Book-button">Book</button> 
    </td>
    </tr>`;
   }     
}


   }).then( response=>{
       if(innerTable===``){
            innerTable = `<h2>No flights with the specified Detail Exist</h2> <button class="btn-book" id="back">Back</button>`;
            content.innerHTML = ``;
            content.innerHTML =innerTable;
            let back  = document.getElementById("back");
            back.addEventListener('click', backToFlight); 
        }else{
            let finalTable = table + innerTable;
            content.innerHTML = finalTable;
        }
   }).then(book=>{
    var bookingBtn = document.getElementsByClassName("Book-button");
    console.log(bookingBtn.length);
    for(btn of bookingBtn){
        btn.addEventListener('click', addToBookings);
    }
 
   }); 

    
}
function backToFlight(){
    book.click();
}
function addToBookings(e){
    var addElementId = e.target.parentNode.parentNode.id;
    var innercontent = ` <div class="login-details">
    Amount:<input type="number" class="text" id="amount">
    Full Name:<input class="text" type="Text"  id="fullName" placeholder="*******">
  <span class="price">
  </span>  
</div>
<button class="btn-login"id="${addElementId}">Book</button>
`;
content.innerHTML += innercontent;
btnAdd  = document.getElementsByClassName("btn-login")[0];
btnAdd.addEventListener('click', addFinale);    
}
function addFinale(e){
    
    var bookingData={};
    var amount  = document.getElementById("amount").value;
    var name  = document.getElementById("fullName").value;
    var bookDate = new Date();
    var btnID = e.target.id;
    var seats = 0;
    var requiredId = ``;
  
    db.collection('flights').doc(btnID).get().then(
        flights=>{
            console.log(flights);
            pricetxt= flights["source"];
            console.log(pricetxt)
            bookingData = {
                name:name,
                source:flights["source"],
                destination:flights["destination"],
                price:flights["price"],
                availableSeats:flights["availableSeats"],
                departureTime:flights["departureTime"],
                date:flights["date"],
                amount:amount,
                ticketRef:btnID,
                bookedOn:bookDate
            }
            seats = flights["availableSeats"];
        
           
        }

    ).then(
      response=>{  db.collection('bookings').add(bookingData).then(book=>{
            requiredId=book.split(":")[3].split(",")[0].replace('"',"").replace('"',"");
            db.collection
            document.write(`this are your ticket details <br>name:${name}<br>
             TicketReference:${requiredId} 
            `)
        });

      }).then(
    response=>{
    
        if(seats - amount >= 0){
            db.collection('flights').doc(btnID).update(
                {availableSeats:seats-amount}
            )
        
      
        }else{
            db.collection('flights').doc(btnID).delete();
        }
    }     
      
    )
}
function alls(){
    console.log();
    var ticket = document.getElementById("ticketRef").value;
    var Name = document.getElementById("fullName").value;
    outPut = `  <table class="flights-listed">
    <tr>
        <th>Full Name</th>
        <th>Date</th>
        <th>departureTime</th>
        <th>Action</th>
    </tr>`;
    var bookedOn = 0;
    db.collection('bookings').get({keys:true}).then(
        bookings=>{
            var today = new Date();
           
       if(bookings[0]["key"]==ticket){
        bookedOn = bookings[0]["data"]["bookedOn"];
        var today= new Date(bookings[0]["data"]["date"]);  
        const diffTime = Math.abs(bookedOn - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        console.log(diffTime + " milliseconds");
        console.log(diffDays + " days");      
      
        

        // var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 *60* 24)); 
        // console.log(diffDays);
        if (diffDays < 3){
         confirm("Reminder your flight is approaching")
        }   
        outPut += `<tr id="${bookings[0]["key"]}">
                <td>
                <input type="text" class="text" value='${bookings[0]["data"]["name"]}' id="fullName">
                </td>
                <td>
                <input type="date" value="${bookings[0]["data"]["date"]}" disabled>
                </td>
                <td>
                <input type="text" class="text" value="${bookings[0]["data"]["departureTime"]}" disabled>
                </td>
                <td><button class="btn-book" id="cancel-booking" name="${bookedOn}">Cancel</button></td>
        
                </tr>` ;
           
           
           }}
    ).then(
        response=>{
            content.innerHTML = outPut;
            var fullName = document.getElementById("fullName");
            var cancelBtn = document.getElementById("cancel-booking");
            fullName.addEventListener('blur',editBooking);
            if(cancelBtn){
                cancelBtn.addEventListener('click',cancelBooking);

            }
        }

    );
    
} 
function editBooking(e){
var editId = e.target.parentNode.parentNode.id;
  var newName = e.target.value;
  console.log(newName);
  db.collection('bookings').doc(editId).update(
    {name:newName}

  );
}
function cancelBooking(e){
    var deleteId= e.target.parentNode.parentNode.id;
    var bookedOn =  e.target.name;
    var today = new Date();
    console.log(today);
    const diffTime = Math.abs(today - bookedOn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if(diffDays > 3){
    confirm("you have passed the three days refund limit");
    }else{
        db.collection('bookings').doc(deleteId).delete();
        home.click();
    }
}
function stringToDate(_date,_format,_delimiter)
{
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
}