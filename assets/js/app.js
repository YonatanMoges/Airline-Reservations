import productdb,{
    bulkcreate,
    getData,
    createEle
} from './module.js';

let db = productdb("Productdb",{
    products:`++index,flight_name,from_city,to_city,date,time,airport_name,ticket_price`
});

//input tags
const flight_no=document.getElementById("flight_no")
const flight_Instance=document.getElementById("flight_Instance")
const fromCity=document.getElementById("fromCity")
const toCity=document.getElementById("toCity")
const arrive_date=document.getElementById("arrive_date")
const depart_time=document.getElementById("depart_time")
const airportname=document.getElementById("airport_name")
const ticketprice=document.getElementById("ticket_price")
 //buttons
 const btnadd=document.getElementById("btn-add")
 const btnview=document.getElementById("btn-view")
 const btnupdate=document.getElementById("btn-update")
 const btndelete=document.getElementById("btn-delete")

 //insert value using create button
 btnadd.onclick=(event)=>{
     let flag = bulkcreate(db.products,{
        flight_name:flight_Instance.value,
        from_city:fromCity.value,
        to_city:toCity.value,
        date:arrive_date.value,
        time:depart_time.value,
        airport_name:airportname.value,
        ticket_price:ticketprice.value,
     })
     //console.log(flag);

     flight_Instance.value="";
     fromCity.value="";
     toCity.value="";
     arrive_date.value="";
     depart_time.value="";
     airportname.value="";
     ticketprice.value="";
     getData(db.products,(data)=>{
        flight_no.value=data.index + 1 || 1;
        
     });
     table();
 }



 //create event on btn view button
 btnview.onclick=table;

 //update event
 btnupdate.onclick=()=>{
     const index = parseInt(flight_no.value || 0);
     if(index){

        db.products.update(index,{
            flight_name:flight_Instance.value,
            from_city:fromCity.value,
            to_city:toCity.value,
            date:arrive_date.value,
            time:depart_time.value,
            airport_name:airportname.value,
            ticket_price:ticketprice.value,
        }).then((updated=>{
            let get=updated?`data Updated`: `Couldn't Update data`;
            console.log(get);
        }))
     }
 }

 //delete
 btndelete.onclick=()=>{
     db.delete();
     db= productdb("Productdb",{
        products:`++index,flight_name,from_city,to_city,date,time,airport_name,ticket_price`
    });
    db.open();
    table(); 
 }

 function table(){
     const tbody=document.getElementById("tbody");
     while(tbody.hasChildNodes()){
         tbody.removeChild(tbody.firstChild);
     }
     getData(db.products,(data)=>{
         if(data){

            createEle("tr",tbody,tr=>{

             for (const value in data) {
                createEle("td",tr,td=>{
                    td.textContent=data.ticket_price === data[value]?`$${data[value]}`: data[value];
                })
             }  
             createEle("td",tr,td=>{
                 createEle("i",td,i=>{
                     i.className += "fas fa-edit btnedit";
                     i.setAttribute(`data-index`,data.index);
                     i.onclick = editbtn;
                 })
             })
             createEle("td",tr,td=>{
                createEle("i",td,i=>{
                    i.className += "fas fa-trash-alt btndelete";

                    i.onclick=deletebtn;
                    i.setAttribute(`data-index`,data.index);
                })
            })
            })
         }
     }) 
 }

 function editbtn(event){
     console.log(event.target.dataset.index);
     let index=parseInt(event.target.dataset.index);
     
     db.products.get(index,data=>{
        flight_no.value=data.index || 0;
        flight_Instance.value=data.flight_name || "";
        fromCity.value=data.from_city || "";
        toCity.value=data.to_city || "";
        arrive_date.value=data.date || "";
        depart_time.value=data.time || "";
        airportname.value=data.airport_name || "";
        ticketprice.value=data.ticket_price || "";
    
    
    })
 }

 function deletebtn(event){
     let index=parseInt(event.target.dataset.index);
     db.products.delete(index);
     table();
 }