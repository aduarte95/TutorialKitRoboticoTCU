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
    xobj.open('GET', 'JSONFiles/models.json', true); // Replace 'my_data' with the path to your file
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

        let modelType = localStorage.getItem("model");
        let kitModel = result.Resistencia;

        if( modelType == "1")
        {
            document.getElementById('desc-model-title').innerHTML = kitModel.Foto;
            document.getElementById('message').innerHTML = kitModel.Descripcion;

            let text="";

            for (let i = 0; i < 5; i++) {
                text += "<a class=\"list-group-item-action\" href=\"ComponentDescription.html\">" +
                    "<li class=\"list-group-item d-flex justify-content-between align-items-center\" >" + kitModel.Componentes[i] +
                    "<span class=\"badge badge-primary badge-pill\">"+ kitModel.Cantidad[i]+"</span>" +
                    "</li>" +
                    "</a>"
            }
            document.getElementById('desc-model-component').innerHTML = text;

        }
        else if( modelType =="2")
        {
            document.getElementById('desc-model-title').innerHTML = kitModel.Titulo;
            document.getElementById('message').innerHTML = kitModel.Descripcion;
        }
        else if( modelType == "3")
        {
            document.getElementById('desc-model-title').innerHTML =kitModel.Titulo;
            document.getElementById('message').innerHTML =kitModel.Descripcion;
        }
        else if( modelType == "4")
        {
            document.getElementById('desc-model-title').innerHTML =kitModel.Titulo;
            document.getElementById('message').innerHTML =kitModel.Descripcion;
        }
        else if( modelType == "5")
        {
            document.getElementById('desc-model-title').innerHTML =kitModel.Titulo;
            document.getElementById('message').innerHTML =kitModel.Descripcion;
        }
        else if( modelType == "6")
        {
            document.getElementById('desc-model-title').innerHTML =kitModel.Titulo;
            document.getElementById('message').innerHTML =kitModel.Descripcion;
        }
        else
        {
            document.getElementById('desc-model-title').innerHTML =kitModel.Titulo;
            document.getElementById('message').innerHTML =kitModel.Descripcion;
        }
    });

}
var result = JSON.parse(localStorage.getItem("json"));
