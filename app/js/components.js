function init() {
   loadComponentInfo();
}

function loadComponentInfo() {
    let componentType = localStorage.getItem("component"); //El modelo que se debe cargar
    document.getElementById('desc-component-title').innerHTML = componentType; //Carga la lista
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("JSONFiles");
    xobj.open('GET', 'JSONFiles/Components.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            //callback(xobj.responseText);
            localStorage.setItem("Components",xobj.responseText);
        }
    };
    let components = JSON.parse(localStorage.getItem("Components"));
    console.log(components);
    console.log(componentType);
    alert(components[componentType].Descripcion);
    document.getElementById('componentDescription').innerHTML = components[componentType].Descripcion;
}
