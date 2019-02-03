function setModel(model)
{
    localStorage.setItem("model", model);
}

// return JSON data from any file path (asynchronous)
function getJSON(path) {
    return fetch(path).then(response => response.json());
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("JSONFiles");
    xobj.open('GET', 'JSONFiles/models-test.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function init() {
    loadJSON(function(response) {
        // Parse JSON string into object
        localStorage.setItem("json",response);

        loadModelInfo();
    });
}

function loadModelInfo() {
    let modelType = localStorage.getItem("model"); //El modelo que se debe cargar
    let kitModel; //Modelo escogido en el json.
    let componentText=""; //Texto de los componentes del modelo (nombre y cantidad)
    let size;//Número de componentes del modelo.

    switch(modelType) {
        case "1":
            kitModel = result.Resistencia;
            break;
        case "2":
            //kitModel = result. ;
            break;
        case "3":
            //kitModel = result. ;
            break;
        case "4":
            //kitModel = result. ;
            break;
        case "5":
            //kitModel = result. ;
            break;
        case "6":
            //kitModel = result. ;
            break;
        default:
        //kitModel = result. ;
        }

    document.getElementById('desc-model-title').innerHTML = kitModel.Foto; //Titulo del modelo
    document.getElementById('message').innerHTML = kitModel.Descripcion; //Descripción

    size = kitModel.Componentes.length;
    for (let i = 0; i < size; i++) { //Itera y almacena cuántos componentes tenga y hace elementos de una lista.
        componentText += "<a class=\"list-group-item-action\" href=\"ComponentDescription.html\">" +
            "<li class=\"list-group-item d-flex justify-content-between align-items-center\" >" + kitModel.Componentes[i] +
            "<span class=\"badge badge-primary badge-pill\">"+ kitModel.Cantidad[i]+"</span>" +
            "</li>" +
            "</a>"
    }
    document.getElementById('desc-model-component').innerHTML = componentText; //Carga la lista
}

var result = JSON.parse(localStorage.getItem("json"));
