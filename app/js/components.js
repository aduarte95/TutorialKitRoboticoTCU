function init() {
   loadComponentInfo();
}

function loadComponentInfo() {
    let componentType = localStorage.getItem("component"); //El modelo que se debe cargar

    document.getElementById('desc-component-title').innerHTML = componentType; //Carga la lista
}
