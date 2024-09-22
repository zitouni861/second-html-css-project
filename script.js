let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let search = document.getElementById('search');
let total = document.getElementById('total');

let  mood='create';
let  tpm;
// Get total
function getTotal(){ 
    if(price.value != 0){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background= 'green';
    }else
    {
        total.innerHTML='';
        total.style.background='rgb(134, 63, 63)';
    }
}


//save localstorage

let dataPro=[];
if(localStorage.product !=null)
{
    dataPro=JSON.parse(localStorage.product);
}else
{
    dataPro=[];
}
//create product

submit.onclick=function(){
        let newPro={
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value.toLowerCase()
        }

        if (title.value != '' && price.value !='' && category.value!='' && newPro.count < 100){
          if (mood === 'create')
            {
            if (newPro.count >1)
                {
                for(let i=0; i<newPro.count;i++)
                {
                    dataPro.push(newPro);
                }
                }
            else
                {
                    dataPro.push(newPro);
                    clearInputs();
                }  
            }
        }
        else
        {
            dataPro[ tpm ]= newPro;
            mood='create';
            submit.innerHTML='create';
            count.style.display='block';
        }
        


        localStorage.setItem('product',JSON.stringify(dataPro));

        
        showPro();
}

//clear inputs
function clearInputs()
{
    title.value='',
    price.value='',
    taxes.value='',
    ads.value='',
    discount.value='',
    total.innerHTML='',
    count.value='',
    category.value='';

    total.style.background="rgb(134, 63, 63)"
}

//read 
function showPro() {
    let table = ''; // Initialize the table string

    // Loop through the dataPro array
    for (let i = 0; i < dataPro.length; i++) {  // Use i < dataPro.length instead of i > dataPro.length
        table += `
        <tr>
            <td>${i +1}</td> <!-- Row number (assuming you want row numbers starting from 1) -->
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" class="Btn">Update</button></td>
            <td><button onClick="deleteData(${i})" class="Btn">Delete</button></td>
        </tr>
        `;
    }
    
    // Insert the generated table rows into the table body (with id="tbody")
    document.getElementById('tbody').innerHTML = table;
    let deleteBtn=document.getElementById('deleteAll');
    if(dataPro.length>0){
        deleteBtn.innerHTML=
        `<button onclick="deleteAll()">Delete all (${dataPro.length})</button>`
    }else{
        deleteBtn.innerHTML='';
    }

}
showPro()

//delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro);
    showPro();
}
function deleteAll(){
    dataPro.splice(0);
    localStorage.clear();
    showPro();
}

//update
function updateData(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    category.value=dataPro[i].category;
    getTotal();
    count.style.display='none';
    submit.innerHTML='update';
    mood='update'
    tpm =i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}

//search
let searchMood='title';
function getSearchMood(id)
{
    let search=document.getElementById('search')
    if(id =='searchBTL')
    {
        searchMood='title'
    }
    else
    {
        searchMood='category'    
    }
    search.placeholder=' search by '+searchMood;
    search.focus();
    search.value ='';
    showPro();
}

function searchData(value){
    let table='';
    for (let i =0; i< dataPro.length; i++){ 
    if (searchMood === 'title')
        {
            
            {
                if(dataPro[i].title.includes(value.toLowerCase()))
                {
                    table += `
                        <tr>
                            <td>${i}</td> <!-- Row number (assuming you want row numbers starting from 1) -->
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateData(${i})" class="Btn">Update</button></td>
                            <td><button onClick="deleteData(${i})" class="Btn">Delete</button></td>
                        </tr>
                        `;
                }
            }
        }
    else
    {
                if(dataPro[i].category.includes(value.toLowerCase()))
                {
                    table += `
                        <tr>
                            <td>${i}</td> <!-- Row number (assuming you want row numbers starting from 1) -->
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateData(${i})" class="Btn">Update</button></td>
                            <td><button onClick="deleteData(${i})" class="Btn">Delete</button></td>
                        </tr>
                        `;
                }
            }
    }
    document.getElementById('tbody').innerHTML = table;
}

//clean data