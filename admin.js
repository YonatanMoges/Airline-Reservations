var content = document.getElementById("content-section");
var view = document.getElementById("view");
var add = document.getElementById("add");
var manage = document.getElementById("manage");
var notice = document.getElementById("notice-section");
view.addEventListener('click',viewPage);
add.addEventListener('click',addPage);
manage.addEventListener('click',managePage);
var db = new Localbase('flight-management');

function addPage(e){
    content.innerHTML="";
    let topDiv = document.createElement("div");
    topDiv.className="book-form";
    let h2 = document.createElement("h2");
    h2.className="header";
    let headerText = document.createTextNode("Add a Flight")
    h2.appendChild(headerText);
    let div1  = document.createElement("div");
    div1.className="source-span";
    div1.innerHTML = `Source: <input type="text" class="text" name="source" id="source-input" placeholder="enter the source adress">`;
    let div2 =  document.createElement("div");
    div2.className="destination-span"; 
    div2.innerHTML = `Destination:  <input type="text" class="text" name="source" id="destination-input" placeholder="enter the source adress">`;
    let div3 = document.createElement("div");
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
    div3.innerHTML = `<input type="date" name="booking-date" id="date-input" min=${today}> <input type="text" name="Time" id="departure-time-input" class="textTime" placeholder="enter the departure Time"> <input type="number" class="textTime" id="available-seats-input" placeholder="seatsvailable"><input type="text" class="textTime" placeholder="price" id="price-input">`;
    let btn = document.createElement("button");
    btn.className="btn-book";
    btn.id="add-flight";
    btn.addEventListener('click', addFlight);
    let btnTxt = document.createTextNode("Add");
    btn.appendChild(btnTxt);
    topDiv.appendChild(h2);
    topDiv.appendChild(div1);
    topDiv.appendChild(div2);
    topDiv.appendChild(div3);
    topDiv.appendChild(btn)
    content.appendChild(topDiv);

}
function viewPage(e){
    content.innerHTML="";
    let textRead = '';
    content.innerHTML += ``; 
    var outPut=`<table class="flights">
    
    <tr><th>BookingID</th>
        <th>FUllName</th>
        <th>Amount</th>
        <th>Actions</th>
    </tr>`;
    db.collection('bookings').get({keys:true}).then(
    bookings => {
    for(i=0;i<bookings.length;i++){
        outPut += `<tr id='${bookings[i]["key"]}'> 
            <td>${bookings[i]["key"]}</td>
            <td>${bookings[i]["data"]["name"]}</td>
            <td>${bookings[i]["data"]["amount"]}</td>
            <td><button class="btn-book delete-btn">Delete</button></td>
        </tr>`}
    }
    ) .then(response=>{
        content.innerHTML += outPut; 
        var delBtn  = document.getElementsByClassName("delete-btn");
        console.log(delBtn);
        for(let btn of delBtn){

            btn.addEventListener('click', deleteBooking);
        }
    
    });

}
function managePage(e){
    content.innerHTML="";
    var data = 0;
    var  outPut = `<table class="flights">
    <tr>
    <th>#</th>
    <th>Source</th>
    <th>Destination</th>
    <th>Departure Time</th>
    <th>Date</th>
    <th>Price</th>
    <th>Delete</th>
    </tr>
    `;
    db.collection('flights').get({keys:true}).then(flights=>{
        for(i =  0 ; i < flights.length;i++){
         console.log(flights[i]["data"]["source"]);
           
         outPut += `<tr id='${flights[i]["key"]}'> 
         <td>
         ${i+1}
         </td>
         <td>
         <input type="text" value="${flights[i]["data"]["source"]}" class="source-edit text" id="source-edit" >
         </td>
         <td><input type="text" value="${flights[i]["data"]["destination"]}" class="destination-edit text" id="destination-edit"></td>
         <td>
         <input type="text" value="${flights[i]["data"]["departureTime"]}" id="departure-time-edit" class=" departure-time-edit text">
         </td>
         <td><input type="date" class="date-edit" id="date-edit" value="${flights[i]["data"]["date"]}"></td>
         <td> <input type="text" class="text price-edit" value="${flights[i]["data"]["price"]}"></td>
         <td><button class="btn-flight-cancel  delete-button">Delete</button></td>
        </tr>
        `
        }
        

    }).then(run=>{
        content.innerHTML= outPut;
    }).then(
        handler=>{
            var source = document.getElementsByClassName("source-edit");
            var destination = document.getElementsByClassName("destination-edit");
            var departureEdit = document.getElementsByClassName("departure-time-edit");
            var dateEdit = document.getElementsByClassName("date-edit");
            var priceEdit = document.getElementsByClassName("price-edit");
            var deleteButton = document.getElementsByClassName("delete-button");
            var btnCount = deleteButton.length;
            for(i=0;i<btnCount;i++){
                deleteButton[i].addEventListener('click', deleteFlight);
            }
            var inputs = [source, destination,departureEdit,dateEdit,priceEdit];

            inputs.forEach(function(ele){
                
                for (let item of ele){
                    item.addEventListener('blur', editFlight);
                }
            });
        }

    );

}
function addFlight(){
    var source = document.getElementById("source-input");
    var destination = document.getElementById("destination-input");
    var date = document.getElementById("date-input");
    var departureTime = document.getElementById("departure-time-input");
    var availableSeats = document.getElementById("available-seats-input");
    var price = document.getElementById("price-input");
    var flightData = {
        source:`${source.value}`,
        destination:`${destination.value}`,
        date:`${date.value}`,
        departureTime:`${departureTime.value}`,
        availableSeats:`${availableSeats.value}`,
        price:`${price.value}`,
    }
    db.collection('flights').add(flightData).then(response=>{
            var r = confirm("flight added succesfully");
             add.click();
        }).catch(error => {
         let r  =  confirm("adding flight Failed: Make sure you entered the correct values and try again");
    });
      
}
function editFlight(e){
    var editId= e.target.parentNode.parentNode.id;
    var dataHolder = document.getElementById(`${editId}`);
    var values = dataHolder.children;
   
    db.collection('flights').doc(editId).update({
        source:`${values[1].children[0].value}`,
        destination:`${values[2].children[0].value}`,
        departureTime:`${values[3].children[0].value}`,
        date:`${values[4].children[0].value}`,
        price:`${values[5].children[0].value}`,
    });
 
}
function deleteFlight(e){
    var deleteId=  e.target.parentNode.parentNode.id;
    if(!confirm("This will completely remove the data ? continue")){console.log("do not delete")}else{

        db.collection('flights').doc(deleteId).delete().then(response=>{

                manage.click();

        });
    }


}
function deleteBooking(e){
    deleteElementId=  e.target.parentNode.parentNode.id;
    if(confirm("are you sure you want to delete")){
        db.collection('bookings').doc(deleteElementId).delete().then(
            response=>{
                view.click();
            }
            );    

    }
}


