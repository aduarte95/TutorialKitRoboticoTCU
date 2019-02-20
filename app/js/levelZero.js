let section;
let totalSections = 0;
function init() {
    loadJSON(function(response) {
        // Parse JSON string into object
        localStorage.setItem("jsonSection",response);

        loadSection();
        for(x in result) {
            totalSections += result[x]["SubSecciones"].length + 1;
        }
    });
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("JSONFiles");
    xobj.open('GET', 'JSONFiles/Nivel0.json', false); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}
var result = JSON.parse(localStorage.getItem("jsonSection"));

function setSection(lvlZSection)
{
    localStorage.setItem("section", lvlZSection);
}

function loadSection() {
    let sectionTitle;
    let src;
    let sectionCard = "";
    let section;
    let ref;

    for (index in result) {
        section = result[index];
        sectionTitle = section["Titulo"];
        src = section["Imagen"];
        ref = "section.html";

        sectionCard += doCard(sectionTitle, src) + setRef(ref, sectionTitle);
        ++index;
    }
    document.getElementById('zero-sections').innerHTML = sectionCard; //Carga la lista

}

function loadSectionVariable() {
    let sectionName = localStorage.getItem("section") //La sección que se debe cargar
    return result[sectionName];
}
function loadSubsections() {
    let subsectionTitle;
    let src;
    let subsectionCard = "";
    let subsection;
    let ref = "section.html";
    let sectionType = loadSectionVariable()["SubSecciones"];

    console.log(sectionType);
    for (index in sectionType) {
        subsection = sectionType[index];
        subsectionTitle = sectionType["Titulo"];
        src = sectionType["Imagen"];

        subsectionCard += doCard(subsectionTitle, src) + setSubRef(ref, section, index);
        ++index;
    }
    document.getElementById('zero-subsections').innerHTML = subsectionCard; //Carga la lista

}

    function doCard(sectionTitle, src) {
        return "<div class=\"card text-center\">" +
        "<div class=\"card-body\">" +
        "<img class=\"card-img-top\" src=\"" + src +"\"  alt=\"" + sectionTitle + "\">" +
        "<h5 class=\"card-title\">" + sectionTitle + "</h5>" +
        "</div>" +
        "<div class=\"card-footer\">";
    }

function setRef(ref, sectionTitle) {
    return "<a href=\""+ ref +"\" class=\"btn btn-primary\" onclick=\"setSection('" + sectionTitle + "')\">Comenzar</a>" +
    "</div>" +
    "</div>";
}

function setSubRef(ref, section, index) {
    return "<a href=\""+ ref +"\" class=\"btn btn-primary\" onclick=\"setSection('" + section + "');setSubsection('" + index + "');\">Comenzar</a>" +
    "</div>" +
    "</div>";
}

let count = 0;

function loadSectionDescription() {
    let sectionName = localStorage.getItem("section") //La sección que se debe cargar
    let sectionType = result[sectionName];
    let title = sectionType["Titulo"];
    let description = sectionType["Descripcion"];
    let img = "<img class=\"image-size\" src=\"" + sectionType["Imagen"] + "\" alt=\"" + title +"\">";
    let next;
    let ref;

    if (sectionType["SubSecciones"].length != 0) {//Verifica si seccion tiene subsecciones.
        ref = "subsection.html";
    } else {
        ref = "sectionSteps.html";
    }

    next = "<section class=\"next-button\">" +
        "<a class=\"btn btn-primary\" href=\"" + ref + "\" role=\"button\">Siguiente &raquo;</a>" +
        "</section>";

    document.getElementById('section-desc-img').innerHTML = img; //Imagen del modelo
    document.getElementById('section-desc-model-title').innerHTML = title; //Titulo del modelo
    document.getElementById('section-message').innerHTML = description; //Descripción
    document.getElementById('section-button-next').innerHTML = next; //Descripción
}

function loadSectionSteps(step) {
    let anterior;
    let bottom;
    let sectionName = localStorage.getItem("section"); //La sección que se debe cargar
    let sectionType = result[sectionName];

    count += step;

    if (count != 1) {
        anterior = "<a class=\"btn btn-primary\" href=\"#\" onclick=\"loadSteps(-1)\" ";
    } else {
        count = 1;
        anterior = "<a class=\"btn btn-primary\" href=\"description.html\" ";
    }

    let width = (count/sectionType.Pasos.length)*100;


    bottom = "<div class=\"col-md-auto\">" +
        anterior + "role=\"button\"> &laquo; Anterior</a>" +
        "</div>" +
        "<div class=\"col\">" +
        "<div class=\"progress progress-position\">" +
        "<div class=\"progress-bar progress-bar-striped\" role=\"progressbar\" style=\"width: " + width + "%\" aria-valuenow=\"" + width + "\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>" +
        "</div>" +
        "</div>";

    if(count < sectionType.Pasos.length) {
        bottom += "<div class=\"col-md-auto text-right\">" +
            "<a class=\"btn btn-primary\" href=\"#\" role=\"button\" onclick=\"loadSteps(1)\">Siguiente &raquo;</a>" +
            "</div>";
    } else if (count < totalSections){
        bottom += "<div class=\"col-md-auto text-right\">" +
            "<a class=\"btn btn-primary\" href=\"#\" role=\"button\" onclick=\"setSection(result[sectionName+1]);loadSectionDescription();\">Siguiente &raquo;</a>" +
            "</div>";
    }

    document.getElementById('section-step-title').innerHTML = sectionType.Pasos[count - 1].Title;
    document.getElementById('section-step-desc').innerHTML = sectionType.Pasos[count - 1].Descripcion;
    document.getElementById('section-step-image').innerHTML = "<img class=\"image-size\" src=\"" + sectionType.Pasos[count - 1].Imagen + "\" alt=\""+ kitModel.Pasos[count - 1].Encabezado + "\">";
    document.getElementById('section-step-bottom').innerHTML = bottom;
}

