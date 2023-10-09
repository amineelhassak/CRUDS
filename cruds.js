document.getElementById(
  "button"
).innerHTML = `<input type="button" value="search by title" id="searchtitle" onclick="seearch('searchtitle')">
        <input type="button" value="search by category" id="searchcategory" onclick="seearch('searchcategory')">`;
document.getElementById("head").innerHTML = 
        `<h1>cruds</h1>
        <h2>hhhhhhhh</h2>`;
document.getElementById("x").innerHTML = `<input type="number" placeholder="count" id="count">
    <input type="text" placeholder="category" id="category">
    <input type="button" value="create" id="create">`;
document.getElementById("input").innerHTML = `<input type="text" name="" id="price" placeholder="price" onkeyup="gettotal()" >
        <input type="text" name="" id="taxs" placeholder="taxs" onkeyup="gettotal()">
        <input type="text" id="ads" placeholder="ads" onkeyup="gettotal()">
        <input type="text" id="discount" placeholder="discount" onkeyup="gettotal()">
        <span id="totall">Totale :</span>
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
// get totale
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

//delecler array data 
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
deletUique = (ele) => {
    datas.splice(ele, 1);
    localStorage.user = JSON.stringify(datas);
    showdata();
    AddbuttonDeletAll();
};
// show data
showdata = () => {
    let tab = `<tr class="headtable">
        <th>id</th>
        <th>title</th>
        <th>price</th>
        <th>taxes</th>
        <th>ads</th>
        <th>discount</th>
        <th>total</th>
        <th>category</th>
        <th>update</th>
        <th>delete</th>
    </tr>`;
    for (let i = 0; i < datas.length; i++)
    {
    tab += `<tr>
            <th>${+i+1}</th>
            <th>${datas[i].title}</th>
            <th>${+datas[i].price}</th>
            <th>${+datas[i].ads}</th>
            <th>${+datas[i].discount}</th>
            <th>${+datas[i].taxs}</th>
            <th>${result}</th>
            <th>${datas[i].category}</th>
            <th><input type="button" onclick="updite(${i})" value="updite"></th>
            <th><input onclick="deletUique(${i})" type="button" value="delete"></th>
        </tr>`;
    }
    table.innerHTML = tab;
};
showdata();

// clean data
cleandata = () => {
    title.value = "";
    price.value = "";
    taxs.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// save informations d'oject in object in array
SaveDataObjectInArray = () => {
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
            // updite data
            datas[tmp] = newprod;
            create.value = "create";
            count.style.display="block"
            mod = 0;
        }
}

create.onclick = () => {
    SaveDataObjectInArray();
    localStorage.setItem("user", JSON.stringify(datas));
    showdata();
    AddbuttonDeletAll();
    cleandata(); 
}


// function delete all
DeleteAll=()=> {
    datas.splice(0);
    // remove all elements
    localStorage.clear();
    showdata();
    AddbuttonDeletAll();
};

// add button delete all
AddbuttonDeletAll = () => {
    let x=''
    if (datas.length > 0) {
        x = `<input type="button" ondblclick="cleandata()"  onclick="DeleteAll()" value="delete all  (${datas.length})" id="deletalle"></inpute>`;
    }
    else { x= `` };
    deleteall.innerHTML = x;
}
AddbuttonDeletAll();

// updite 
updite = (e) => {
    // affiche values 
        title.value = datas[e].title;
        price.value= datas[e].price;
        taxs.value=datas[e].taxs;
        ads.value = datas[e].ads;
        discount.value =datas[e].discount;
        category.value = datas[e].category;
        gettotal();
    // display button count 
        count.style.display = "none";
    // change value button creat  -> updite and change mod create in mode updite element
        create.value = "updite";
        mod = 1;
        tmp = e;
    // scroll page a lettile
    scroll({
        top: 0,
        behavior: "smooth",
    });
}

//  serach elements 

// select mode(mode category or title)
seearch = (id) => {
    if (id == "searchcategory") {
        search.placeholder = "search by category";
        modsearch = 'c';
        console.log(id);
    } else {
        search.placeholder = "search by title";
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
        for(let i = 0; i < datas.length; i++)
        {
            if (datas[i].title.includes(value))
            {
                tabb += `<tr>
                <th>${+i}</th>
                <th>${datas[i].title}</th>
                <th>${+datas[i].price}</th>
                <th>${+datas[i].ads}</th>
                <th>${+datas[i].discount}</th>
                <th>${+datas[i].taxs}</th>
                <th>${gettotal()}</th>
                <th>${datas[i].category}</th>
                <th><input type="button" onclick="updite(${i})" value="updite"></th>
                <th><input onclick="deletUique(${i})" type="button" value="delete"></th>
                </tr>`;
            }
        }
    }
    else if (modsearch == "c")
    {
        for (let i = 0; i < datas.length; i++)
        {
            if (datas[i].category.includes(value))
            {
                tabb += `<tr>
            <th>${+i}</th>
            <th>${datas[i].title}</th>
            <th>${+datas[i].price}</th>
            <th>${+datas[i].ads}</th>
            <th>${+datas[i].discount}</th>
            <th>${+datas[i].taxs}</th>
            <th>${gettotal()}</th>
            <th>${datas[i].category}</th>
            <th><input type="button" onclick="updite(${i})" value="updite"></th>
            <th><input onclick="deletUique(${i})" type="button" value="delete"></th>
            </tr>`;
            }
        }
    }
    if (valuee = '') showdata();
    table.innerHTML = tabb;
}




    
