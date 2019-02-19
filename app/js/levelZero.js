let section;

function init() {
    loadJSON(function(response) {
        // Parse JSON string into object
        localStorage.setItem("jsonSection",response);

        loadSection();
    });
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("JSONFiles");
    xobj.open('GET', 'JSONFiles/NivelCero.json', false); // Replace 'my_data' with the path to your file
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

    for(index in result) {
        section = result[index];
        sectionTitle = section["Titulo"];
        src = section["Imagen"];


        if (section["SubSecciones"].length != 0) {//Verifica si seccion tiene subsecciones.
            ref = "subsection.html";
        } else {
            ref = "section.html";
        }

        sectionCard += doCard(sectionTitle, src, ref);

        ++index;
    }

    function doCard(sectionTitle, src, ref) {
        return "<div class=\"card text-center\">" +
        "<div class=\"card-body\">" +
        "<img class=\"card-img-top\" src=\"" + src +"\"  alt=\"" + sectionTitle + "\">" +
        "<h5 class=\"card-title\">" + sectionTitle + "</h5>" +
        "</div>" +
        "<div class=\"card-footer\">" +
        "<a href=\""+ ref +"\" class=\"btn btn-primary\" onclick=\"setSection('" + sectionTitle + "')\">Comenzar</a>" +
        "</div>" +
        "</div>";
    }

    document.getElementById('zero-sections').innerHTML = sectionCard; //Carga la lista
}