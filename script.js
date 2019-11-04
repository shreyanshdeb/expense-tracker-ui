function onFormSubmit(){
    var formData = readFormData();
    console.log(formData);
    //
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if (xhr.status>=200 & xhr.status<300){
            console.log("success", xhr);
        }else{
            console.log("failed", xhr);
        }
    }
    console.log(JSON.stringify(formData));
    xhr.open("POST","http://127.0.0.1:1234/api/v1/expense");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(formData));
}

function readFormData(){
    var formData = {};
    formData["Amount"] = parseFloat(document.getElementById("amount").value);
    formData["Datetime"] = document.getElementById("date").value;
    formData["Title"] = document.getElementById("title").value;
    formData["Category"] = document.getElementById("category").value;
    return formData;
}

function getExpenseList(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:1234/api/v1/expenses")
    xhr.onload = function(){
       try{
            const json = JSON.parse(xhr.responseText);
            populateList(json);
       }catch(e){
            console.warn("Could not load", e);
       }
    }   
    xhr.send();
}

function populateList(json){
    const expenseList = document.querySelector("#expense-list-container > div");

    json.forEach((row)=>{   
        row.forEach((cell)=>{
            console.log(cell)
        })
    });
}

document.addEventListener("DOMContentLoaded", () => {getExpenseList()});