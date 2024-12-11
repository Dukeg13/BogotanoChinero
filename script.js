/*Creacion de variables. Con D3 se está seleccionando el elemento con etiqueta MAIN del DOM
Luego dentro del MAIN se va a seleccionar la ID SCROLLY, esta será una cadena de selecciones,
hasta llegar a los STEPS en donde se seleccionan todos los elementos que pertenecen a la clase .STEP*/
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

/*VARIABLES FUNCIONAMIENTO MENU*/

//LEAFLET, CONTENEDOR ATLAS
var map = L.map('map').setView([5, -75], 6);
var marker;
var baseMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 6,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

//CONTENEDORES DE DATOS
const pdfViewer = document.getElementById("pdf-viewer");
const analysisContainer = document.getElementById("analysis-container");
const recuerdosContainer = document.getElementById("recuerdos-container");
const recuerdoImg = document.getElementById("recuerdo-img");
const recuerdoTitle = document.getElementById("recuerdo-title");

let locationsData = [];
let currentLocation = null;
let currentImageIndex = 0;


//Lugares visitados por Tanco
var locations = [
    {"name":"Bogotá","atlas":{"latitude":4.71945109289652,"longitude":-74.0810506904781,"zoom":5,"scale":0.7},"recuerdos":[{"title":"Plaza Bolívar","url":"https://github.com/Dukeg13/BogotanoChinero/blob/main/images/caribe/caribe0.jpeg?raw=true"},{"title":"Cerro Monserrate","url":"https://github.com/Dukeg13/BogotanoChinero/blob/main/images/caribe/caribe1.jpg?raw=true"}],"escritos":{"title":"Escrito sobre Bogotá","pdf_url":"docs/Tanco Armero, Viaje a China-58-74.pdf"},"analisis":{"title":"Análisis histórico de Bogotá","content":"Bogotá fue un epicentro cultural importante durante el siglo XIX."}},{"name":"Calamar","atlas":{"latitude":10.2482502569287,"longitude":-74.9144487580497,"zoom":10,"scale":0.3},"recuerdos":[{"title":"Plaza Bolívar","url":"images/Biblioteca Nacional de Colombia/sujeto.png"},{"title":"Cerro Monserrate","url":"images/Biblioteca Nacional de Colombia/sujeto.png"}],"escritos":{"title":"Escrito sobre Bogotá","pdf_url":"docs/Tanco Armero, Viaje a China-58-74.pdf"},"analisis":{"title":"Análisis histórico de Bogotá","content":"Bogotá fue un epicentro cultural importante durante el siglo XIX."}},{"name":"Arroyondo","atlas":{"latitude":10.2524525271258,"longitude":-75.0179146439506,"zoom":10,"scale":0.3},"recuerdos":[{"title":"Plaza Bolívar","url":"images/Biblioteca Nacional de Colombia/sujeto.png"},{"title":"Cerro Monserrate","url":"images/Biblioteca Nacional de Colombia/sujeto.png"}],"escritos":{"title":"Escrito sobre Bogotá","pdf_url":"docs/Tanco Armero, Viaje a China-58-74.pdf"},"analisis":{"title":"Análisis histórico de Bogotá","content":"Bogotá fue un epicentro cultural importante durante el siglo XIX."}},{"name":"Arjona","atlas":{"latitude":10.2532304936834,"longitude":-75.3500553873603,"zoom":10,"scale":0.3},"recuerdos":[{"title":"Plaza Bolívar","url":"images/Biblioteca Nacional de Colombia/sujeto.png"},{"title":"Cerro Monserrate","url":"images/Biblioteca Nacional de Colombia/sujeto.png"}],"escritos":{"title":"Escrito sobre Bogotá","pdf_url":"docs/Tanco Armero, Viaje a China-58-74.pdf"},"analisis":{"title":"Análisis histórico de Bogotá","content":"Bogotá fue un epicentro cultural importante durante el siglo XIX."}},{"name":"Turbaco","atlas":{"latitude":10.3348345385657,"longitude":-75.4124550411077,"zoom":10,"scale":0.3},"recuerdos":[{"title":"Plaza Bolívar","url":"images/Biblioteca Nacional de Colombia/sujeto.png"},{"title":"Cerro Monserrate","url":"images/Biblioteca Nacional de Colombia/sujeto.png"}],"escritos":{"title":"Escrito sobre Bogotá","pdf_url":"docs/Tanco Armero, Viaje a China-58-74.pdf"},"analisis":{"title":"Análisis histórico de Bogotá","content":"Bogotá fue un epicentro cultural importante durante el siglo XIX."}},{"name":"Cartagena","atlas":{"latitude":10.3937722113251,"longitude":-75.4844984909218,"zoom":10,"scale":0.7},"recuerdos":[{"title":"Plaza Bolívar","url":"images/Biblioteca Nacional de Colombia/sujeto.png"},{"title":"Cerro Monserrate","url":"images/Biblioteca Nacional de Colombia/sujeto.png"}],"escritos":{"title":"Escrito sobre Bogotá","pdf_url":"docs/Tanco Armero, Viaje a China-58-74.pdf"},"analisis":{"title":"Análisis histórico de Bogotá","content":"Bogotá fue un epicentro cultural importante durante el siglo XIX."}}
];

document.querySelectorAll(".info-button").forEach(button =>{
    button.addEventListener("click", () =>{
        const type = button.dataset.type;

        //Ocultar todos los contenedores
        pdfViewer.style.display = "none";
        analysisContainer.style.display = "none";
        recuerdosContainer.style.display = "none";
        document.getElementById("map").style.display = "none";
        
        if (type === "atlas") {
            map.setView([currentLocation.atlas.latitude, currentLocation.atlas.longitude], currentLocation.atlas.zoom);
            document.getElementById("map").style.display = "block";
            console.log("ATLAS", currentLocation.name)
        } else if (type === "images") {
            mostrarRecuerdos();
            console.log("RECUERDOS", currentLocation.name);
        } else if (type === "journey"){
            pdfViewer.src = `${currentLocation.escritos.pdf_url}`;
            pdfViewer.style.display = "block";
            pdfViewer.style.height = "100%"
            console.log("PDF", currentLocation.name);
        } else if (type === "analysis"){
            document.getElementById("analysis-title").textContent = currentLocation.analisis.title;
            document.getElementById("analysis-content").textContent = currentLocation.analisis.content;
            analysisContainer.style.display = "block";
            console.log("ANALISIS", )
        }

        document.querySelectorAll('.info-button').forEach(btn => {
            btn.classList.remove('active');
        });

        button.classList.add('active');
    });
});

function updateContent(){
    if (currentLocation.recuerdos && currentLocation.recuerdos.length > 0) {
        const recuerdo = currentLocation.recuerdos[0]; // Primera imagen por defecto
        document.getElementById("recuerdo-img").src = recuerdo.url;
        document.getElementById("recuerdo-title").textContent = recuerdo.title;
    } else {
        console.error("No hay recuerdos disponibles para esta ubicación.");
        document.getElementById("recuerdo-img").src = ""; // Imagen vacía
        document.getElementById("recuerdo-title").textContent = ""; // Título vacío
    }

    if (currentLocation.analisis) {
        document.getElementById("analysis-title").textContent = currentLocation.analisis.title;
        document.getElementById("analysis-content").textContent = currentLocation.analisis.content;
    }

    if (currentLocation.escritos) {
        document.getElementById("pdf-viewer").src = currentLocation.escritos.pdf_url;
    }

    console.log("Contenido actualizado para:", currentLocation.name || "Ubicación sin nombre");
}

// Inicia Scrollama
var scroller = scrollama();

// Funcion para gestionar el tamaño de la ventana
function resizeStep(scale) {
    return Math.floor(window.innerHeight * scale)
}

function handleResize() {
    // 1. Actualizar la altura de los steps. Se crea la variable stepH, la se carga con la info de la operación
    //entre la altura de la ventana dividida en dos. Se usa el método Math.floor para que se redondee a un valor entero
    var stepH = resizeStep(locations[0].atlas.scale);
    //con esta línea se entra dentro del CSS de la clase STEP y se modifica su altura con el valor de stepH
    step.style("height", stepH + "px");

    /*Esta variable permitirá definir el tamaño de la ventana que se quedará fija durante la animación del scroll, en 
    este caso, acá es donde deberá estar contenido el mapa de Leaflet. Se puede ajustar el tamaño. Como es un mapa,
    lo más conveniente es que pueda tener una buena altura para que se fácilmente identificable cada ubicación. Dejaré unos 
    pequeños espacios para que se vea un poco más pulcra la página*/
    var figureHeight = window.innerHeight * 0.95;
    /*Esto lo que hará será central verticalmente el contenedor*/
    var figureMarginTop = (window.innerHeight - figureHeight)* 0.5;

    /*Se interviene el elemento figure para que se le asignen los valores que se calcularon en el apartado anterior*/
    figure
    .style("height", figureHeight + "px")
    .style("top", figureMarginTop + "px");

    /* Se activa la funcion que se creo dentro de Scrollama. Según la documentación disponible, la última version
    permite que siempre esté disponible este método por lo cual no es necesario crear la función, sin embargo, recomienda
    mantenerlo*/
    scroller.resize();
}


// Funcion para los eventos scroll
function handleStepEnter(response) {
    console.log(response.index);
    /*El response es tomado por el método handleStepEnter y como resultado arroja un array con tres valores:
    Element: Referencia al elemento HTML que dispara el trigger | Index: El identificador del elemento específico
    Direction: Up/Down, contraintuitivo, Up es cuando el elemento baja, Down cuando sube.

    Al principio del script, en el selectAll la libreria D3 asigna a cada uno de los elementos STEP un index
    para este caso, se usa la libreria D3 para intervenir el CSS del elemento que se está seleccionando.
    El método classed integrará dentro del elemento que se está seleccionando un CSS. Puede configurarle unos
    parámetros CSS o modificar el listado de estilos que intervienen el elemento. Con esta función, se está
    evaluando cual de los STEP dentro del array de D3 es el que está activo comparandolo con el Index que se 
    trae con el RESPONSE anterior. Si es TRUE agrega el estilo IS-ACTIVE que se definió al principio de la página
    al STEP*/

    step.classed("is-active", function(d, i) {
    return i === response.index;
    });
    currentLocation = locations[response.index];

    updateContent();

    console.log("Nueva currentLocation:", currentLocation);

    // Actualizar el mapa
    const { latitude, longitude, zoom } = currentLocation.atlas;

    map.setView([latitude, longitude], zoom);

    if (marker) {
        map.removeLayer(marker);
    }

    marker = L.marker([latitude, longitude]).addTo(map);

    // Actualizar el texto de ubicación
    document.getElementById("map-text").textContent = currentLocation.name;
    
    figure.select("#map-text").text(currentLocation.name);
    var newStepHeight = resizeStep(currentLocation.atlas.scale);
    d3.select(response.element).style("height", newStepHeight+"px");
};

/*Con esta función se va a configurar el elemento que se quedará quieto mientras el usuario esté scrolleando*/
function setupStickyfill() {
    /*Utiliza el métdo SELEC y EACH con los cuales está seleccionando todos los elementos que, dentro de su
    CSS, tengan la característica STICKY. El método stickyfill se asegura de que el estilo de mantenerse quieto
    se pueda ejecutar en cualquier navegador*/
    d3.selectAll(".sticky").each(function() {
    Stickyfill.add(this);
    });
}

//Funcion para iniciar Scrollama
function init() {
    //Ejecuta la funcion para que funcione correctamente el STICKY
    setupStickyfill();

    // Ejectura la función de RESIZE para que los parámetro sean correctos
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
    .setup({
        step: "#scrolly article .step",
        offset: 0.4,
    })
    .onStepEnter(handleStepEnter);
    
    // setup resize event
    window.addEventListener("resize", handleResize);
}
// kick things off
init();

document.getElementById("prev-button").addEventListener("click", () => {
    navigateImages(-1);
    console.log("Imagen anterior")
});

document.getElementById("next-button").addEventListener("click", () => {
    navigateImages(1);
    console.log("Siguiente imagen")
});

function navigateImages(direction) {
    if (!currentLocation || !currentLocation.recuerdos || currentLocation.recuerdos.length === 0) {
        console.error("No hay imágenes para mostrar.");
        return;
    }

    currentImageIndex += direction;

    // Controla los límites del índice
    if (currentImageIndex < 0) {
        currentImageIndex = currentLocation.recuerdos.length - 1;
    } else if (currentImageIndex >= currentLocation.recuerdos.length) {
        currentImageIndex = 0;
    }

    // Actualiza la imagen y el título
    const recuerdo = currentLocation.recuerdos[currentImageIndex];
    recuerdoImg.src = recuerdo.url;
    recuerdoTitle.textContent = recuerdo.title;
}

function mostrarRecuerdos(){
    if (!currentLocation || !currentLocation.recuerdos || currentLocation.recuerdos.length === 0) {
        console.error("No hay recuerdos disponibles para esta ubicación.");
        return;
    }

    currentImageIndex = 0; // Reinicia el índice
    navigateImages(0); // Muestra la primera imagen
    recuerdosContainer.style.display = "block";
    recuerdoImg.style.width= "100%";
    recuerdoImg.style.height= "80%";
    console.log(recuerdosContainer.style.width)
}

