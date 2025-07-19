document.getElementById(
  "button"
).innerHTML = `<input type="button" value="Search by Title" id="searchtitle" onclick="search('searchtitle')">
        <input type="button" value="Search by Category" id="searchcategory" onclick="search('searchcategory')">`;
document.getElementById("head").innerHTML = 
        `<h1>CRUD Product Management System</h1>
        <h2>Create, Read, Update, Delete Products</h2>`;
document.getElementById("x").innerHTML = `<input type="number" placeholder="Count" id="count">
    <input type="text" placeholder="Category" id="category">
    <input type="button" value="Create" id="create">`;
document.getElementById("input").innerHTML = `<input type="text" name="" id="price" placeholder="Price" onkeyup="gettotal()" >
        <input type="text" name="" id="taxs" placeholder="Taxes" onkeyup="gettotal()">
        <input type="text" id="ads" placeholder="Ads" onkeyup="gettotal()">
        <input type="text" id="discount" placeholder="Discount" onkeyup="gettotal()">
        <span id="totall">Total :</span>
        <span id="totale">0000</span>`;
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxs = document.getElementById("taxs");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("totale");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let searchcategory=document.getElementById("searchcategory");
let searchtitle = document.getElementById("searchtitle");
let totall = document.getElementById("totall");
let table = document.getElementById("table");
let deleteall = document.getElementById("deletall");
let mod = 0;
let tmp;
let mode = "bytitle";
let modsearch;
let result;
// style 
document.body.style.background = "black";
document.body.style.color = "white";
document.body.style.fontFamily ="'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif";
// get total
function gettotal() {
    if (price.value != "") {
        result = ((+price.value) + (+taxs.value) + (+ads.value )- (+discount.value));
        total.innerHTML = result;
        total.style.background = "green";
        totall.style.background = "green";

    }
    else {
        total.style.background = "red";
        totall.style.background = "red";
        total.innerHTML = "";
    }
}

//declare array data 
let datas;
if (localStorage.user != null) {
    // Retrieve the stored object
    datas = JSON.parse(localStorage.user)
}
else
{
    datas = [];
}
// function delete element 
deleteUnique = (ele) => {
    datas.splice(ele, 1);
    localStorage.user = JSON.stringify(datas);
    showdata();
    addButtonDeleteAll();
};
// show data
showdata = () => {
    let tab = `<tr class="headtable">
        <th>ID</th>
        <th>Title</th>
        <th>Price</th>
        <th>Taxes</th>
        <th>Ads</th>
        <th>Discount</th>
        <th>Total</th>
        <th>Category</th>
        <th>Update</th>
        <th>Delete</th>
    </tr>`;
    for (let i = 0; i < datas.length; i++)
    {
    tab += `<tr>
            <th>${+i+1}</th>
            <th>${datas[i].title}</th>
            <th>${+datas[i].price}</th>
            <th>${+datas[i].taxs}</th>
            <th>${+datas[i].ads}</th>
            <th>${+datas[i].discount}</th>
            <th>${datas[i].total}</th>
            <th>${datas[i].category}</th>
            <th><input type="button" onclick="update(${i})" value="Update"></th>
            <th><input onclick="deleteUnique(${i})" type="button" value="Delete"></th>
        </tr>`;
    }
    table.innerHTML = tab;
};
showdata();

// clean data
cleanData = () => {
    title.value = "";
    price.value = "";
    taxs.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// save informations object in object in array
saveDataObjectInArray = () => {
    let newprod = {
        title: title.value,
        price: price.value,
        taxs: taxs.value,
        ads: ads.value,
        discount: discount.value,
        total: result,
        category: category.value,
    };
            // function add object or element  in  array 
    if (mod == 0)
        {
            if (count.value > 1)
                {
                    for (let i = 0; i < count.value; i++)
                    {
                        datas.push(newprod);
                    }
                }
            else
                    datas.push(newprod);
        }
    else
        {
            // update data
            datas[tmp] = newprod;
            create.value = "Create";
            count.style.display="block"
            mod = 0;
        }
}

create.onclick = () => {
    saveDataObjectInArray();
    localStorage.setItem("user", JSON.stringify(datas));
    showdata();
    addButtonDeleteAll();
    cleanData(); 
}


// function delete all
deleteAll=()=> {
    datas.splice(0);
    // remove all elements
    localStorage.clear();
    showdata();
    addButtonDeleteAll();
};

// add button delete all
addButtonDeleteAll = () => {
    let x=''
    if (datas.length > 0) {
        x = `<input type="button" ondblclick="cleanData()"  onclick="deleteAll()" value="Delete All (${datas.length})" id="deleteAll">`;
    }
    else { x= `` };
    deleteall.innerHTML = x;
}
addButtonDeleteAll();

// update 
update = (e) => {
    // display values 
        title.value = datas[e].title;
        price.value= datas[e].price;
        taxs.value=datas[e].taxs;
        ads.value = datas[e].ads;
        discount.value =datas[e].discount;
        category.value = datas[e].category;
        gettotal();
    // display button count 
        count.style.display = "none";
    // change value button create  -> update and change mod create in mode update element
        create.value = "Update";
        mod = 1;
        tmp = e;
    // scroll page a little
    scroll({
        top: 0,
        behavior: "smooth",
    });
}

//  search elements 

// select mode(mode category or title)
search = (id) => {
    if (id == "searchcategory") {
        search.placeholder = "Search by category";
        modsearch = 'c';
        console.log(id);
    } else {
        search.placeholder = "Search by title";
        modsearch = 't';
    }
    search.focus();
    search.value = "";
    showdata();
}

x= (value) => {
    let tabb = "";
    if (modsearch == 't')
    {
        tabb = `<tr class="headtable">
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Taxes</th>
            <th>Ads</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Category</th>
            <th>Update</th>
            <th>Delete</th>
        </tr>`;
        for(let i = 0; i < datas.length; i++)
        {
            if (datas[i].title.toLowerCase().includes(value.toLowerCase()))
            {
                tabb += `<tr>
                <th>${+i+1}</th>
                <th>${datas[i].title}</th>
                <th>${+datas[i].price}</th>
                <th>${+datas[i].taxs}</th>
                <th>${+datas[i].ads}</th>
                <th>${+datas[i].discount}</th>
                <th>${datas[i].total}</th>
                <th>${datas[i].category}</th>
                <th><input type="button" onclick="update(${i})" value="Update"></th>
                <th><input onclick="deleteUnique(${i})" type="button" value="Delete"></th>
                </tr>`;
            }
        }
    }
    else if (modsearch == "c")
    {
        tabb = `<tr class="headtable">
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Taxes</th>
            <th>Ads</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Category</th>
            <th>Update</th>
            <th>Delete</th>
        </tr>`;
        for (let i = 0; i < datas.length; i++)
        {
            if (datas[i].category.toLowerCase().includes(value.toLowerCase()))
            {
                tabb += `<tr>
            <th>${+i+1}</th>
            <th>${datas[i].title}</th>
            <th>${+datas[i].price}</th>
            <th>${+datas[i].taxs}</th>
            <th>${+datas[i].ads}</th>
            <th>${+datas[i].discount}</th>
            <th>${datas[i].total}</th>
            <th>${datas[i].category}</th>
            <th><input type="button" onclick="update(${i})" value="Update"></th>
            <th><input onclick="deleteUnique(${i})" type="button" value="Delete"></th>
            </tr>`;
            }
        }
    }
    if (value == '') {
        showdata();
    } else {
        table.innerHTML = tabb;
    }
}




    
