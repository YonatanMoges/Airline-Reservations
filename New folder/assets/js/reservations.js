
import {getData,createEle} from './module.js';

import productdb from './module.js'

const btnview=document.getElementById("btn-view")
let db = productdb("Productdb",{
    products:`++index,flight_name,from_city,to_city,date,time,airport_name,ticket_price`
});

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
            
            
           })
        }
    }) 
}

btnview.onclick=table;

// data = "aaaaa"

// str = `${data}`;