let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
// console.log(title, price, taxes, ads, discount, total, count, category, submit);
let mood = "create";  
let tmp;

total.innerHTML = 0;
function gettotle() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    }
    else {
        total.style.background = "#f00";
    }
}

let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
}
else {
    dataPro = [];
}

submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value, 
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };
    if(title.value != "" && price.value != "" && category.value != ""  ) {
        if (mood === 'create'){
            if (newPro.count > 1){
                 for (let i =0 ; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            }
            else {
            dataPro.push(newPro);
            }
        }
        else{
            dataPro[ tmp ]= newPro;
            mood = "create";
            submit.innerHTML = "create";
            count.style.display = "block";
        }
        localStorage.setItem("product", JSON.stringify(dataPro));
        cleardata();
        showdata();
    }
    
    else {
        alert("Please Enter Data");
    }
}
// function cleardata()
function cleardata() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = 0;
    count.value = "";
    category.value = "";
}
// function showdata() 
    
function showdata() {
    gettotle();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) { 
            table += `<tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})">update</button></td>
                    <td><button onclick="deletData(${i})">delete</button></td>
        </tr>`;
    }
    document.getElementById("tbody").innerHTML = table;
    let btnDelete = document.getElementById("deletAll");
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deletAll()">delete All (${dataPro.length})</button>
        `
    } else {
        btnDelete.innerHTML = "";
    }
}
showdata();
// function deletData(i){
function deletData(i){
console.log(i);
dataPro.splice(i,1);
localStorage.product = JSON.stringify(dataPro);
showdata();
}

//  function updateData(i){

function deletAll(){
    localStorage.clear();
    dataPro.splice(0);
    showdata();
}

function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    gettotle();
    count.style.display = "none";
    submit.innerHTML = "update";
    category.value = dataPro[i].category;
    mood = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })

}
let searchmood = 'title';
function search(id){
    let search = document.getElementById("search");
    if (id == 'searchBytitle'){
        searchmood = 'title';
        search.placeholder = 'Search By Title';
    }
    else{
        searchmood = 'category';
        search.placeholder = 'Search By Category';
    }
search.focus();
search.value = '';
showdata();
}


function searchdata(value)
{
    let table = '';
if(searchmood == 'title'){
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
            table += `<tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})">update</button></td>
            <td><button onclick="deletData(${i})">delete</button></td>
            </tr>`;
            
        }
    }
}
else {
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
            table += `<tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})">update</button></td>
            <td><button onclick="deletData(${i})">delete</button></td>
            </tr>`;
            
        }
    }
}
document.getElementById("tbody").innerHTML = table;
}