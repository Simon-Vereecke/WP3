const BaseURL = 'http://192.168.33.22/REST/';

window.addEventListener("load", handleWindowLoad);


function handleWindowLoad() {
    let btnJSON = document.getElementById("btnAllContacts");
    let deleteBtn = document.getElementById("btnDeleteContact");
    let btnAddContact = document.getElementById("btnAddContact");
    btnJSON.addEventListener("click", handleClickGetAllContacts);
    deleteBtn.addEventListener("click", handleClickDeleteContact);
    btnAddContact.addEventListener("click", handleClickPostContact);
}

function handleClickGetAllContacts() {
    const URL = BaseURL + 'contacts/';//'http://192.168.33.22/REST/contacts/';
    fetch(URL)
        .then( (response) => {return response.json();})
        .then(function (data) {
            let output = document.getElementById("AllContactsOutput");
            output.innerHTML = ' ';
            data.forEach(myFunction);
        })
        .catch( (exception) => {writeAllContactsOutput(exception);});
}

function myFunction(contact){
    if(contact.email === null)
        writeAllContactsOutput(contact.id + " " + contact.name);
    else
        writeAllContactsOutput(contact.id + " " + contact.name + " " + contact.email);
}

function handleClickDeleteContact() {
    let idInput = document.getElementById("contactId");
    let id = idInput.value;

    // Validatie
    if(isNaN(id) || parseInt(id) < 1 || id === "") {
        alert("Geef een cijfer in groter dan 0");
        console.log("Id is niet geldig");
        return;
    }

    const URL = BaseURL + 'contacts/';
    fetch(URL+id, {
        method: 'DELETE'
    }).then( (response) => {
        if(response.status == 200) {
            alert('Contact succesvol verwijderd');
            let idInput = document.getElementById("contactId");
            idInput.value = '';
        }
            else {
                throw response.status;
            }

    })
        .catch( (exception) => {writeDeleteOutput(exception);});
}

function handleClickPostContact() {
    console.log('postClick');
    const URL = BaseURL + 'contacts/';
    let contactNameInput = document.getElementById("contactName");
    let contactName = contactNameInput.value;
    let contactEmailInput = document.getElementById("contactEmail");
    let contactEmail = contactEmailInput.value;

    // Validatie
    if(!contactName.match(/^[a-zA-Z_]+$/)){
        alert('Vul een naam in die enkel bestaat uit letters, hoofdletters en/of underscore');
        contactNameInput.value = "";
        return;
    } else if (!contactEmail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        alert('Vul een geldig e-mailadres in');
        contactEmailInput.value = "";
        return;
    }

    let contact = {name: contactName, email: contactEmail};
    fetch(URL, {
            method: "POST",
            body: JSON.stringify(contact)
        }
    ).then( (response) => {
        if(response.status == 200) { // stond eerst op 201 ( == Created)
            alert('Contact succesvol aangemaakt');
            let contactNameInput = document.getElementById("contactName");
            contactNameInput.value = '';
            let contactEmailInput = document.getElementById("contactEmail");
            contactEmailInput.value = '';
        } else {
            throw response.status;
        }
    })
        .catch( (exception) => {writeAddContactOutput(exception.message);});
}

function writeAllContactsOutput(text) {
    let textNode = document.createTextNode(text + "\n");
    let output = document.getElementById("AllContactsOutput");
    output.appendChild(textNode);
}