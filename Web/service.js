const BaseURL = 'http://192.168.33.22/REST/';

window.addEventListener("load", handleWindowLoad);


function handleWindowLoad() {
    let btnJSON = document.getElementById("btnjson");
    let deleteBtn = document.getElementById("btnDeleteContact");
    let btnAddContact = document.getElementById("btnAddContact");
    btnJSON.addEventListener("click", handleClickJson);
    deleteBtn.addEventListener("click", handleClickDeleteContact);
    btnAddContact.addEventListener("click", handleClickPostContact);
}

function handleClickJson() {
    const URL = BaseURL + 'contacts/';//'http://192.168.33.22/REST/contacts/';
    fetch(URL)
        .then( (response) => {return response.json();})   // json() of toJSON() gebruiken ???
        .then(function (data) {
            data.forEach(myFunction);
            // writeOutput(data.id + " " + data.name);// + " " + data.email);
        })
        .catch( (exception) => {writeAllContactsOutput(exception);});
}

function myFunction(contact){
    writeAllContactsOutput(contact.id + " " + contact.name + " " + contact.email);
}

function handleClickDeleteContact() {
    let id = document.getElementById("contactId").value;
    const URL = BaseURL + 'contacts/';
    fetch(URL+id, {
        method: 'DELETE'
        // body: id
    })
        .then( (response) => {return response.json();})   // toJSON() gebruiken ???
        // .then(function (data) {
        //     writeDeleteOutput(data.id + " " + data.name);
        // })
        //of
        // .then( (response) => {
        //     if(response.status == 201) {
        //         return response.json();
        //     } else {
        //         throw response.status;
        //     }
        // })
        // .then(function (data) {
        //     writeOutput(data.id + " " + data.name);
        // })
        .catch( (exception) => {writeDeleteOutput(exception);});
}

function handleClickPostContact() {
    const URL = BaseURL + 'contacts/';
    let contactName = document.getElementById("contactName").value;
    let contact = {name: contactName};
    fetch(URL, {
            method: "POST",
            body: JSON.stringify(contact)
        }
    ).then( (response) => {
        if(response.status == 200) { // stond eerst op 201 ( == Created)
            return response.json();
        } else {
            throw response.status;
        }
    })
        .then(function (data) {
            // writeAddContactOutput(data.id + " " + data.name);
        })
        .catch( (exception) => {writeAddContactOutput(exception.message);});
}

function writeAddContactOutput(text) {
    let textNode = document.createTextNode(text + "\n");
    let output = document.getElementById("output");
    output.appendChild(textNode);
}

function writeDeleteOutput(text) {
    let textNode = document.createTextNode(text + "\n");
    let output = document.getElementById("output");
    output.appendChild(textNode);
}

function writeAllContactsOutput(text) {
    let textNode = document.createTextNode(text + "\n");
    let output = document.getElementById("AllContactsOutput");
    output.appendChild(textNode);
}