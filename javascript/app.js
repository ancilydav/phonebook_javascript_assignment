const API_URL ="https://696a12293a2b2151f846fdfe.mockapi.io/phonebook";

let editId =""
let search = document.getElementById("search");
let form =document.getElementById("phonebook");
let contactList=document.getElementById("contactList");

let nameinput = document.getElementById("name");
let numberinput = document.getElementById("number");
let addressinput = document.getElementById("address");

async function getContact(){
    const res = await fetch(API_URL);
    const contacts = await res.json();
    displaycontacts(contacts);
}

// DISPLAY

function displaycontacts(list){
    contactList.innerHTML=""

    for(let i=0;i<list.length;i++){
        const contact = list[i]
        contactList.innerHTML+=`
        <div class="contact">
        <p>${contact.name}</p>
        <p>${contact.number}</p>
        <p>${contact.address}</p>
        <button class="edit"onclick="editContact(${contact.id})">Edit</button>
        <button class="delete" onclick="deleteContact(${contact.id})">Delete</button>
        </div>
        `;

    }

}

// ADD/UPDATE

form.addEventListener("submit",async(e)=>{
    e.preventDefault();

 const phonebookdata ={
        name:nameinput.value,
        number:numberinput.value,
        address:addressinput.value,

    };

    if(editId !==""){
        await fetch(`${API_URL}/${editId}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
        body:JSON.stringify(phonebookdata),

        })
        editId="";
        form.querySelector("button").innerText = 'Add Contact';
         form.reset();
        getContact();
     }

     else{await fetch(API_URL,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(phonebookdata),

    });

    form.reset();
    getContact();
}
});

     

// EDIT

     async function editContact(id){
        const res = await fetch(`${API_URL}/${id}`);
        const contact = await res.json();

        nameinput.value = contact.name;
        numberinput.value = contact.number;
        addressinput.value = contact.address;

        editId =id
        form.querySelector("button").innerText = 'Update Contact';
     }

     
     
 // DELETE

async function deleteContact(id){
    await fetch(`${API_URL}/${id}`,{
        method:"DELETE",
    });
    getContact();
}



// SEARCH

  search.addEventListener('input',async function(){
    const res = await fetch(API_URL);
    const contacts = await res.json();
    const searchValue = search.value.toLowerCase();
    let result = [];

    for(let i=0;i<contacts.length;i++){
        const contact = contacts[i]
        if (
            contacts[i].name.toLowerCase().includes(searchValue)){
            result.push(contacts[i]);
        }
        displaycontacts(result);    
        };

  });

getContact();


