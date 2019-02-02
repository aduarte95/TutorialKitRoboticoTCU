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

        let y = localStorage.getItem("model");
        if( y == "1")
        {
            document.getElementById('desc-model-title').innerHTML = x.LED.Foto;
            document.getElementById('message').innerHTML = x.LED.Descripcion;
        }
        else if( y =="2")
        {
            document.getElementById('desc-model-title').innerHTML = x.Resistencia.Titulo;
            document.getElementById('message').innerHTML = x.LED.Descripcion;
        }
        else if( y == "3")
        {
            document.getElementById('desc-model-title').innerHTML = x.Resistencia.Titulo;
            document.getElementById('message').innerHTML = x.Resistencia.Descripcion;
        }
        else if( y == "4")
        {
            document.getElementById('desc-model-title').innerHTML = x.Resistencia.Titulo;
            document.getElementById('message').innerHTML = x.Resistencia.Descripcion;
        }
        else if( y == "5")
        {
            document.getElementById('desc-model-title').innerHTML = x.Resistencia.Titulo;
            document.getElementById('message').innerHTML = x.Resistencia.Descripcion;
        }
        else if( y == "6")
        {
            document.getElementById('desc-model-title').innerHTML = x.Resistencia.Titulo;
            document.getElementById('message').innerHTML = x.Resistencia.Descripcion;
        }
        else
        {
            document.getElementById('desc-model-title').innerHTML = x.Resistencia.Titulo;
            document.getElementById('message').innerHTML = x.Resistencia.Descripcion;
        }
    });

}
var x = JSON.parse(localStorage.getItem("json"));
