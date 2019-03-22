
    function externalLink(url) {
        const remote = require('electron').remote;
        const BrowserWindow = remote.BrowserWindow;

        var win = new BrowserWindow({ width: 1000, height: 600, autoHideMenuBar: true });
        win.loadURL(url);
    }
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("JSONFiles");
    xobj.open('GET', 'JSONFiles/Components.json', false); // Replace 'my_data' with the path to your file
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
        localStorage.setItem("jsonComponents",response);

        loadComponentInfo();
    });
}

function loadComponentInfo() {
    let componentType = localStorage.getItem("component"); //El modelo que se debe cargar
    let back = "description.html";

    if(localStorage.getItem('level') == "lvlZero") {
        back = "sectionSteps.html";
    }

    document.getElementById('component-back').innerHTML = "<a href=\"" + back +"\"> <i class=\"fa fa-arrow-left fa-3x\"> </i> </a>";
    document.getElementById('desc-component-title').innerHTML = componentType; //Carga la lista
    document.getElementById('component-img').innerHTML = "<img class=\"left\" style=\"width:50%\"  src=\"" + result[componentType].Foto +"\"/>"; //Carga la lista
    document.getElementById('componentDescription').innerHTML = result[componentType].Descripcion;
}

var result = JSON.parse(localStorage.getItem("jsonComponents"));
let components;
