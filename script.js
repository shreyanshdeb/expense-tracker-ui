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
    (new Date(document.getElementById("date").value)).getTime();
    formData["amount"] = parseFloat(document.getElementById("amount").value);
    formData["datetime"] = ((new Date(document.getElementById("date").value)).getTime()/1000);
    formData["title"] = document.getElementById("title").value;
    formData["category"] = document.getElementById("category").value;
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
 
    json.forEach((row)=>{   
        createCard(expenseList, shortenCategory(row.category), row.amount, row.title, row.datetime);
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

    let date = new Date(datetime * 1000)
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + appendLeadingZeroes(date.getDate());

    categoryContainer.innerHTML = category;
    expenseAmount.innerHTML = "₹ " + amount;
    expenseInfoTitle.innerHTML = title;
    expenseInfoDatetime.innerHTML = formatted_date;

    expenseList.append(expenseCard);
}

function initDashboard(){
    const btn = document.getElementById("newExpenseBtn");
    btn.onclick = () => {
        location.href = "./add_expense.html";
    };

    getExpenseList();
    GetTotalExpense();
}

function shortenCategory(category){
    return category.charAt(0).toUpperCase();
}

function GetTotalExpense(){
    let xhr = new XMLHttpRequest();
    xhr.open("GET","http://127.0.0.1:1234/api/v1/totalexpenseforthemonth");
    xhr.open = function(){
        if (xhr.status>=200 & xhr.status<300){
            console.log("success", xhr);
            const json = JSON.parse(xhr.responseText);
            populateTotalExpense(json);
        }else{
            console.log("failed", xhr);
        }
    }
    xhr.send();
}

function populateTotalExpense(json){
    const totalExpenseHTML = document.querySelector("#total-expense-conatiner > h4")
    totalExpenseHTML.innerHTML = json.TotalExpenses;
}

function appendLeadingZeroes(n){
    if(n <= 9){
      return "0" + n;
    }
    return n
  }