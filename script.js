function onFormSubmit(){
    var formData = readFormData();
    console.log(formData);
    //
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if (xhr.status>=200 & xhr.status<300){
            console.log("success", xhr);
            alert("Expense Added");
            window.location.href="./index.html";
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

    while(expenseList.firstChild){
        expenseList.firstChild.remove();
    }
 
    let category = "W";

    json.forEach((row)=>{   
        createCard(expenseList, category, row.amount, row.title, row.datetime);
    });
}

function createCard(expenseList, category, amount, title, datetime){
    const expenseCard = document.createElement('div');
    const categoryContainer = document.createElement('div');
    const expenseInfoContainer = document.createElement('div');
    const expenseTitleConatiner = document.createElement('div');
    const expenseAmount = document.createElement('label');
    const expenseInfoTitle = document.createElement('label');
    const expenseDatetimeContainer = document.createElement('div');
    const expenseInfoDatetime = document.createElement('label');

    expenseCard.className = "expense-card";
    categoryContainer.className = "category-container";
    expenseInfoContainer.className = "expense-info-container";
    expenseTitleConatiner.className = "expense-tile-container";
    expenseAmount.className = "expense-amount";
    expenseInfoTitle.className = "expense-info-title";
    expenseDatetimeContainer.className = "expense-datetime-container";
    expenseInfoDatetime.className = "expense-info-datetime";

    expenseCard.append(categoryContainer);
    expenseCard.append(expenseInfoContainer);
    expenseInfoContainer.append(expenseTitleConatiner);
    expenseInfoContainer.append(expenseDatetimeContainer);
    expenseTitleConatiner.append(expenseAmount);
    expenseTitleConatiner.append(expenseInfoTitle);
    expenseDatetimeContainer.append(expenseInfoDatetime);

    categoryContainer.innerHTML = category;
    expenseAmount.innerHTML = "₹ " + amount;
    expenseInfoTitle.innerHTML = title;
    expenseInfoDatetime.innerHTML = datetime;

    expenseList.append(expenseCard);
}

function initDashboard(){
    const btn = document.getElementById("newExpenseBtn");
    btn.onclick = () => {
        location.href = "./add_expense.html";
    };

    getExpenseList();
}
