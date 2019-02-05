function setModel(model)
{
    localStorage.setItem("model", model);
}

function loadLvl() {
    let lvl = localStorage.getItem("level"); //El modelo que se debe cargar
    let title1, title2, src1, src2;

    if(lvl == "1") {
        title1="Micropiano";
        src1 ="images/piano.png";
        title2 ="Caballo";
        src2 ="images/horse.png";
    }
    else {
        title1="Generador";
        src1 ="images/generador.png";
        title2 ="Motor";
        src2 ="images/mot.png";
    }

    let modelText = "<div class=\"card text-center\">" +
       "<div class=\"card-body\">" +
        "<img class=\"card-img-top\" src=\"" + src1 +"\"  alt=\"" + title1 + "\">" +
        "<h5 class=\"card-title\">" + title1 +"</h5>" +
        "</div>" +
        "<div class=\"card-footer\">" +
        "<a href=\"description.html\" class=\"btn btn-primary\" onclick=\"setModel('" + title1 + "')\">Comenzar</a>" +
        "</div>" +
        "</div>" +

        "<div class=\"card text-center\">" +
        "<div class=\"card-body\">" +
        "<img class=\"card-img-top\" src=\"" + src2 +"\"  alt=\"" + title2 + "\">" +
        "<h5 class=\"card-title\">" + title2 +"</h5>" +
        "</div>" +
        "<div class=\"card-footer\">" +
        "<a href=\"description.html\" class=\"btn btn-primary\" onclick=\"setModel('" + title2 + "')\">Comenzar</a>" +
        "</div>" +
        "</div>";
    document.getElementById('lvl-deck').innerHTML = modelText; //Carga la lista
}

function setComponent(component)
{
    localStorage.setItem("component", component);
}

// return JSON data from any file path (asynchronous)
function getJSON(path) {
    return fetch(path).then(response => response.json());
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("JSONFiles");
    xobj.open('GET', 'JSONFiles/Models.json', false); // Replace 'my_data' with the path to your file
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

        let lvl = localStorage.getItem("level");
        let back;

        if(lvl == "3") {
            back = "models.html";
        }
        else {
            back = "multipleLvls.html";
        }

        document.getElementById('desc-back').innerHTML = "<a href=\"" + back + "\">" +
            "<img src=\"images/atras.png\" width=\"35\" height=\"35\">" +
            "</a>";
    });
}

function loadModelInfo() {
    let modelType = localStorage.getItem("model"); //El modelo que se debe cargar
    let componentText=""; //Texto de los componentes del modelo (nombre y cantidad)
    let size;//Número de componentes del modelo.
    let title; //Titulo
    let img; //Imagen del modelo

    switch(modelType) {
        case "Micropiano":
            kitModel = result.Micropiano;
            break;
        case "Caballo":
            kitModel = result.Caballo;
            break;
        case "Generador":
            kitModel = result.Generador ;
            break;
        case "Motor":
            kitModel = result.Motor ;
            break;
        case "Girabot":
            kitModel = result.Girabot;
            break;
        case "Brazo Mecánico":
            kitModel = result.BrazoMecanico ;
            break;
        default:
            kitModel = result.Carro;
        };

    img = "<img class=\"image-size\" src=\"" + kitModel.Imagen + "\" alt=\"" + modelType +"\">";
    console.log(img);
    document.getElementById('desc-img').innerHTML = img; //Imagen del modelo

    document.getElementById('desc-model-title').innerHTML = modelType; //Titulo del modelo
    document.getElementById('message').innerHTML = kitModel.Descripcion; //Descripción

    size = kitModel.Components.length;
    for (let i = 0; i < size; i++) { //Itera y almacena cuántos componentes tenga y hace elementos de una lista.
        componentText += "<a class=\"list-group-item-action\" href=\"ComponentDescription.html\" onclick=\"setComponent('"+ kitModel.Components[i]+ "')\">" +
            "<li class=\"list-group-item d-flex justify-content-between align-items-center\" >" + kitModel.Components[i] +
            "<span class=\"badge badge-primary badge-pill\">"+ kitModel.CantidadComponentes[i]+"</span>" +
            "</li>" +
            "</a>"
    }
    document.getElementById('desc-model-component').innerHTML = componentText; //Carga la lista
}

var result = JSON.parse(localStorage.getItem("json"));
let kitModel;

function setModelType() {
    let modelType = localStorage.getItem("model"); //El modelo que se debe cargar

    switch(modelType) {
        case "Micropiano":
            kitModel = result.Micropiano;
            break;
        case "Caballo":
            kitModel = result.Caballo;
            break;
        case "Generador":
            kitModel = result.Generador ;
            break;
        case "Motor":
            kitModel = result.Motor ;
            break;
        case "Girabot":
            kitModel = result.Girabot;
            break;
        case "Brazo Mecánico":
            kitModel = result.BrazoMecanico ;
            break;
        case "nivel0":
            kitModel = result.Nivel0 ;
        default:
            kitModel = result.Carro;
    };
}

let count = 0;

function loadSteps(step) {
    let anterior;
    let bottom;

    setModelType();

    count += step;

    if (count != 1) {
        anterior = "<a class=\"btn btn-primary\" href=\"#\" onclick=\"loadSteps(-1)\" ";
    } else {
        count = 1;
        anterior = "<a class=\"btn btn-primary\" href=\"description.html\" ";
    }

    let width = (count/kitModel.Pasos.length)*100;


    bottom = "<div class=\"col-md-auto\">" +
        anterior + "role=\"button\"> &laquo; Anterior</a>" +
        "</div>" +
        "<div class=\"col\">" +
        "<div class=\"progress progress-position\">" +
        "<div class=\"progress-bar progress-bar-striped\" role=\"progressbar\" style=\"width: " + width + "%\" aria-valuenow=\"" + width + "\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>" +
        "</div>" +
        "</div>";

    if(count < kitModel.Pasos.length) {
        bottom += "<div class=\"col-md-auto text-right\">" +
            "<a class=\"btn btn-primary\" href=\"#\" role=\"button\" onclick=\"loadSteps(1)\">Siguiente &raquo;</a>" +
            "</div>";
    }



    document.getElementById('step-title').innerHTML = "Paso " + count.toString();
    document.getElementById('step-desc').innerHTML = kitModel.Pasos[count - 1].Descripcion;
    document.getElementById('step-image').innerHTML = "<img class=\"image-size\" src=\"" + kitModel.Pasos[count - 1].Image + "\" alt=\"Paso " + count.toString() + "\">";
    document.getElementById('step-bottom').innerHTML = bottom;
}