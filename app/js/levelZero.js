
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
                "<a href=\""+ ref +"\" class=\"btn btn-primary\" onclick=\"setSection('" + sectionTitle + "')\">Comenzar</a>" +
           "</div>" +
        "</div>"+
    "</div>";
}

function cardRow(tittleBar,cards) {
    var x = "";
    for (i = 0; i < cards.length; i++) {
        console.log(cards[i]);
        x += card1(cards[i].Titulo,cards[i].Imagen,'Aqui');
    }
    return "<div class=\"row \" align=\"left\">"+
            "<div class=\"w3-bar w3-border w3-light-grey\">"+
                "<p align=\"center\">"+tittleBar+"</p>"+
            "</div>"+
            x+
        "<\div> ";
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

