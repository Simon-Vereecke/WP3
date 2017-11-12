window.addEventListener("load", handleWindowLoad);


function handleWindowLoad() {
    let btnJSON = document.getElementById("btnjson");
    btnJSON.addEventListener("click", handleClickJson);
}

function handleClickJson() {
    const URL = 'http://192.168.33.22/REST/contacts/';
    fetch(URL)
        .then( (response) => {return response.json();})   // json() of toJSON() gebruiken ???
        .then(function (data) {
            data.forEach(myFunction);
            // writeOutput(data.id + " " + data.name);// + " " + data.email);
        })
        .catch( (exception) => {writeOutput(exception);});
}

function myFunction(contact){
    writeOutput(contact.id + " " + contact.name + " " + contact.email);
}

function writeOutput(text) {
    let textNode = document.createTextNode(text + "\n");
    let output = document.getElementById("output");
    output.appendChild(textNode);
}