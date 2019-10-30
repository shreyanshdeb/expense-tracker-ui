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
    xhr.open("POST","http://127.0.0.1:3000/api/v1/expense");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(formData);
}

function readFormData(){
    var formData = {};
    formData["amount"] = parseFloat(document.getElementById("amount").value);
    formData["datetime"] = document.getElementById("date").value;
    formData["title"] = document.getElementById("title").value;
    formData["category"] = document.getElementById("category").value;
    return formData;
}