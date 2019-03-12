
function init() {
    loadJSON(function(response) {
        // Parse JSON string into object
        localStorage.setItem("jsonSection",response);
    });
    chargeGrid();
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

function loadJSONStepSection(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("JSONFiles");
    xobj.open('GET', 'JSONFiles/Nivel0Sections.json', false); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}
var stepResult = JSON.parse(localStorage.getItem("jsonStepSection"));

function setSection(lvlZSection)
{
    localStorage.setItem("section", lvlZSection);
}

function setSectionStep(step)
{
    localStorage.setItem("sectionStep", step);
}

function card1(sectionTitle, src, ref) {
    return "<div class=\"col s12 m4\" >" +
        "<div class=\"card text-center\" >" +
           "<div class=\"card-horizontal\">" +
                "<div class=\"card-body sizecard\">" +
                    "<h4 class=\"card-title\">" +sectionTitle+ "</h4>" +
                    "<div class=\"img-square-wrapper\">" +
                        "<img src=\""+src+"\"width=\"10%\" height=\"10%\">"+
                    "</div>" +
                "</div>" +
           "</div>" +
           "<div class=\"card-footer\">"+
                "<a href=\""+ ref +"\" class=\"btn btn-primary\" onclick=\"setSection('" + sectionTitle + "');setSectionStep(-1);\">Comenzar</a>" +
           "</div>" +
        "</div>"+
    "</div>";
}

function cardRow(tittleBar,cards) {
    var x = "";
    var t ;
    for (i = 0; i < cards.length; i++) {
        t = Object.keys(cards[i])[0];
        x += card1(cards[i][t],cards[i].Imagen,'sectionSteps.html');
    }
    return "<nav class=\"navbar navbar-light bg-light justify-content-center\" >"+
                    "<h3 class=\"navbar-text\" style=\"color:black\">"+tittleBar+"</h3>"+
            "</nav>"+
        "<div class=\"card-group\" align=\"center\" width=\"100%\" > "+
            x +
        "<\div>"+
        "<hr style=\"border-color:white;width:100%\">";
}
function chargeGrid()
{
    console.log(Object.keys(result).length);
    let x = "";
    for (let key in result) {
        if (result.hasOwnProperty(key)) {
            console.log(key + ": " + result[key].Nombre);
             x += cardRow(result[key].Nombre,result[key].Tarjetas)
        }
    }
    document.getElementById('cartita').innerHTML = x;
}


let count = 0; //To know the next or previous step.
const SECTION = -1;

function loadSectionSteps(step) { //Step is an integer that adds or rest from the gloabal count
    loadJSONStepSection(function(response) {
        // Parse JSON string into object
        localStorage.setItem("jsonStepSection",response);
    });

    let sectionName = localStorage.getItem("section"); //La sección que se debe cargar
    let sectionType = stepResult[sectionName]; //Json result
    let title = "";
    let description;
    let imageSrc;
    let bottom; //Bottom of the step
    let previous;
    let width;
    let progressBar = "";
    let totalSections = sectionType.Pasos.length + 1;

    count += parseInt(step);

    if(count == SECTION) { //Its the description of title and needs to go back to section's section
        title = sectionName;
        description = sectionType["Descripcion"];
        previous = "<a class=\"btn btn-primary\" href=\"section.html\"";
        imageSrc = sectionType["Imagen"];
    } else { //Needs to go into Pasos array.
        previous = "<a class=\"btn btn-primary\" href=\"#\" onclick=\"loadSectionSteps(-1)\" ";

        if(sectionType.Pasos.length != 0) {

            description = sectionType.Pasos[count]["Descripcion"];
            imageSrc = sectionType.Pasos[count]["Imagen"];
        }
    }

    if(sectionType.Pasos.length != 0) {
        width = ((count+2)/(sectionType.Pasos.length+1))*100;

        progressBar = "<div class=\"progress progress-position\">" +
            "<div class=\"progress-bar progress-bar-striped\" role=\"progressbar\" style=\"width: " + width + "%\" aria-valuenow=\"" + width + "\" aria-valuemin=\"0\" aria-valuemax=\"100\">" +
            "</div>" +
            "</div>";
    }

    bottom = "<div class=\"col-md-auto\">" +
                    previous + "role=\"button\"> &laquo; Anterior</a>" +
            "</div>" +
            "<div class=\"col\">" +
                progressBar +
            "</div>";

//For button next
    if(count + 1 < sectionType.Pasos.length) { //Tamaño array de pasos.
        bottom += "<div class=\"col-md-auto text-right\">" +
            "<a class=\"btn btn-primary\" href=\"#\" role=\"button\" onclick=\"loadSectionSteps(1)\">Siguiente &raquo;</a>" +
            "</div>";
    } else if (count + 1 < totalSections){
        bottom += "<div class=\"col-md-auto text-right\">" +
            "<a class=\"btn btn-primary\" href=\"section.html\" role=\"button\"> Finalizar &raquo;</a>" +
            "</div>";
    }

    document.getElementById('section-step-title').innerHTML = title;
    document.getElementById('section-step-desc').innerHTML = description;
    document.getElementById('section-step-image').innerHTML = "<img class=\"image-size\" src=\"" + imageSrc + "\">";
    document.getElementById('section-step-bottom').innerHTML = bottom;
}

