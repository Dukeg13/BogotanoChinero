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
    {
        "name": "Nueva Granada, Nov.-Dic. 1853",
        "atlas": {
          "latitude": 4.71945109289652,
          "longitude": -74.0810506904781,
          "zoom": 5,
          "scale": 0.7
        },
        "recuerdos": [
          {
            "title": "Mariquita, Colombia: a wooden bridge. Coloured lithograph",
            "author": "Charles Empson ",
            "date": 1836,
            "repository": "WELLCOME COLLECTION ",
            "credits": "From the Wellcome Collection",
            "altern-text": "Mariquita, Colombia: a wooden bridge. Coloured lithograph",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/colombia/colombia0.jpg?raw=true",
            "stable-url": "https://wellcomecollection.org/works/hpyccnjv/images?id=prsd8syw"
          },
          {
            "title": "Rio Claro, Colombia.",
            "author": "Charles Empson ",
            "date": 1836,
            "repository": "WELLCOME COLLECTION ",
            "credits": "From the Wellcome Collection",
            "altern-text": "Mariquita, Colombia: a wooden bridge. Coloured lithograph",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/colombia/colombia1.jpg?raw=true",
            "stable-url": "https://wellcomecollection.org/works/a2ehkf88/images?id=cgcz5aer"
          },
          {
            "title": "Vista del valle del Magdalena desde el alto del Sargento",
            "author": "Gutiérrez de Alba, José María",
            "date": 1874,
            "repository": "Banco de la República",
            "credits": "© Derechos reservados - Banco de la República",
            "altern-text": "Vista del valle del Magdalena desde el alto del Sargento",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/colombia/colombia2.jpg?raw=true",
            "stable-url": "https://babel.banrepcultural.org/digital/api/singleitem/image/p17054coll16/289/default.jpg"
          },
          {
            "title": "Iglesia de San Juan de Dios en Cartagena",
            "author": "Anónimo",
            "date": 1884,
            "repository": "Banco de la República",
            "credits": "© Derechos reservados - Banco de la República",
            "altern-text": "Iglesia de San Juan de Dios en Cartagena",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/colombia/colombia3.jpg?raw=true",
            "stable-url": "https://babel.banrepcultural.org/digital/api/singleitem/image/p17054coll16/343/default.jpg?highlightTerms=Cartagena"
          },
          {
            "title": "Eugenio, nuestro piloto e intérprete entre los indios salvajes",
            "author": "Gutiérrez de Alba, José María",
            "date": 1873,
            "repository": "Banco de la República",
            "credits": "© Derechos reservados - Banco de la República",
            "altern-text": "Eugenio, nuestro piloto e intérprete entre los indios salvajes",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/colombia/colombia4.jpg?raw=true",
            "stable-url": "https://babel.banrepcultural.org/digital/api/singleitem/image/p17054coll16/229/default.jpg?highlightTerms=Bogas"
          },
          {
            "title": "La Eglissa de San Juan, Cartagena",
            "author": "Timothy H. O'Sullivan",
            "date": 1870,
            "repository": "GETTY MUSEUM COLLECTION ",
            "credits": "From the Getty Museum Collection",
            "altern-text": "La Eglissa de San Juan, Cartagena",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/colombia/colombia5.jpg?raw=true",
            "stable-url": "https://www.getty.edu/art/collection/object/106TN0"
          },
          {
            "title": "Carte de Colombie contenant les Républiques de N. Grenade, Vénézuela, de l'Equateor et les Guyanes",
            "author": "Lapie, Pierre",
            "date": 1854,
            "repository": "Banco de la República",
            "credits": "© Derechos reservados - Banco de la República",
            "altern-text": "Carte de Colombie contenant les Républiques de N. Grenade, Vénézuela, de l'Equateor et les Guyanes",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/colombia/colombia6.jpg?raw=true",
            "stable-url": "https://babel.banrepcultural.org/digital/api/singleitem/image/p17054coll13/66/default.jpg"
          }
        ],
        "escritos": {
          "title": "Nueva Granada",
          "pdf_url": "https://bogotanochinero.netlify.app/docs/Tanco%20Armero,%20Viaje%20a%20China-58-74.pdf"
        },
        "analisis": {
          "title": "Nueva Granada: La partida hacia lo desconocido",
          "content": [
            "El viaje de Nicolás Tanco Armero inicia en la colorida Nueva Granada, hoy Colombia, un territorio lleno de contradicciones y riquezas naturales. Desde las empedradas calles de Bogotá hasta los calurosos puertos del Caribe, Tanco Armero retrata un paisaje en transición: la mezcla de lo colonial y lo republicano. Este es el contexto desde donde el viajero, con mirada curiosa y crítica, decide explorar el mundo.",
            "En su relato, Colombia no solo es el lugar de partida, sino también el contraste constante frente a los escenarios que encontrará más adelante. Aquí se configuran las bases de su perspectiva, marcada por su educación y las tensiones sociales de su época. Es un país joven, en búsqueda de su identidad en un mundo globalizado.",
            "Cada paso en Nueva Granada, desde las sabanas hasta las montañas, refleja las raíces que moldearon su visión del espacio y la alteridad. En esta etapa, ya se vislumbran las preguntas que lo acompañarán a lo largo de su travesía: ¿qué significa pertenecer a un lugar? ¿Cómo se construye la identidad desde la distancia?"
          ]
        }
      },
      {
        "name": "Caribe, Año Nuevo 1852",
        "atlas": {
          "latitude": 18.1653522122288,
          "longitude": -77.1694852487947,
          "zoom": 5,
          "scale": 0.3
        },
        "recuerdos": [
          {
            "title": "Saint Thomas Harbor",
            "author": "Anónimo",
            "date": 1850,
            "repository": "Wikimedia Commons",
            "credits": "From Wikimedia Commons, the free media repository",
            "altern-text": "Saint Thomas Harbor",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/caribe/caribe0.jpeg?raw=true",
            "stable-url": "https://upload.wikimedia.org/wikipedia/commons/1/1f/St_Thomas_Harbor_1850.JPG"
          },
          {
            "title": "Planting the sugar cane. Slaves working on a plantation in Antigua.",
            "author": "Clark, William",
            "date": 1823,
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Planting the sugar cane. Slaves working on a plantation in Antigua.",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/caribe/caribe1.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/13107"
          },
          {
            "title": " View of St. Thomas",
            "author": "Stadler, Joseph C",
            "date": 1810,
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": " View of St. Thomas, taken from Havensicht, Jan. 18",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/caribe/caribe2.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/16320"
          },
          {
            "title": "Present Condition of the Negroes in Jamaica.",
            "author": "De La Beche, Henry Thomas",
            "date": 1825,
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": " Notes on the Present Condition of the Negroes in Jamaica.",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/caribe/caribe3.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/147256"
          },
          {
            "title": "Jamaica 1882",
            "author": "Ramsay, John",
            "date": 1882,
            "repository": "Perry Castañeda Library Map Collection",
            "credits": "From the Perry Castañeda Library Map Collection",
            "altern-text": "Jamaica 1882 From A Dictionary, Practical, Theoretical, and Historical of Commerce and Commercial Navigation",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/caribe/caribe4.jpg?raw=true",
            "stable-url": "https://maps.lib.utexas.edu/maps/historical/jamaica_1882.jpg"
          },
          {
            "title": "Acercamiento isla St Thomas. Carta general del mar de las Antillas",
            "author": "Bregante, S.",
            "date": 1870,
            "repository": "Banco de la República",
            "credits": "© Derechos reservados - Banco de la República",
            "altern-text": "Carta general del mar de las Antillas",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/caribe/caribe5.png?raw=true",
            "stable-url": "https://babel.banrepcultural.org/digital/api/singleitem/image/p17054coll13/629/default.jpg?highlightTerms=Bregante%2C%20S."
          }
        ],
        "escritos": {
          "title": " El Caribe",
          "pdf_url": "https://bogotanochinero.netlify.app/docs/Tanco%20Armero,%20Viaje%20a%20China-74-78.pdf"
        },
        "analisis": {
          "title": "El Caribe: Mareas de mestizaje y encuentros",
          "content": [
            "El Caribe, con sus aguas turquesas y costas doradas, aparece en los escritos de Tanco Armero como un espacio de tránsito y encuentro. Desde los puertos de Cartagena hasta los muelles de Jamaica y San Tomás, el Caribe es mucho más que un mar: es un crisol de culturas, historias y tensiones.",
            "En este universo insular, el viajero descubre la vitalidad de los mercados portuarios y la mezcla de lenguas, religiones y tradiciones que cruzan fronteras. El Caribe le ofrece una visión única del mestizaje cultural, donde las influencias indígenas, africanas y europeas se entrelazan en cada puerto y comunidad.",
            "Para Tanco Armero, las islas representan un puente entre el Nuevo Mundo y el Viejo Continente. Pero también son un recordatorio de los desafíos: los estragos del colonialismo, la lucha por la libertad y la identidad de los pueblos que habitan estas tierras. El Caribe es un espacio dinámico, donde las mareas traen tanto comercio como historias de resistencia."
          ]
        }
      },
      {
        "name": "Cuba, 1852-1855",
        "atlas": {
          "latitude": 23.11755789,
          "longitude": -82.37010225,
          "zoom": 5,
          "scale": 0.7
        },
        "recuerdos": [
          {
            "title": "Teatro de Tacon",
            "author": "Anónimo",
            "date": 1800,
            "repository": "VICTORIA AND ALBERT MUSEUM",
            "credits": "From the V & A H Beard Print Collection",
            "altern-text": "Teatro de Tacon y parte del Museo de Isabell II ",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/cuba/cuba0.jpg?raw=true",
            "stable-url": "https://collections.vam.ac.uk/item/O1141638/h-beard-print-collection-print-unknown/"
          },
          {
            "title": "Teatro de Tacon",
            "author": "Federico Mialhe ",
            "date": 1800,
            "repository": "VICTORIA AND ALBERT MUSEUM ",
            "credits": "From the V & A H Beard Print Collection",
            "altern-text": "Teatro de Tacon (Habana)",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/cuba/cuba1.jpg?raw=true",
            "stable-url": "https://collections.vam.ac.uk/item/O186857/h-beard-print-collection-print-mialhe-f/"
          },
          {
            "title": "Los Ingenios.",
            "author": "Cantero, Justo G",
            "date": 1857,
            "repository": "BRITISH LIBRARY ",
            "credits": "From the British Library archive",
            "altern-text": "Los Ingenios. Coleccion de vistas de los principal",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/cuba/cuba2.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/15157"
          },
          {
            "title": "Los Ingenios.",
            "author": "Cantero, Justo G",
            "date": 1857,
            "repository": "BRITISH LIBRARY ",
            "credits": "From the British Library archive",
            "altern-text": "Los Ingenios. Coleccion de vistas de los principal",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/cuba/cuba3.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/15153"
          },
          {
            "title": "Governors residence. Cuba",
            "author": "Edward, Anthony",
            "date": 1860,
            "repository": "GETTY MUSEUM COLLECTION  ",
            "credits": "From the Getty Museum Collection",
            "altern-text": "Governors residence. Cuba",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/cuba/cuba4.png?raw=true",
            "stable-url": "https://www.getty.edu/art/collection/object/106TM8"
          },
          {
            "title": "View in Cuba",
            "author": "Edward, Anthony",
            "date": 1860,
            "repository": "GETTY MUSEUM COLLECTION  ",
            "credits": "From the Getty Museum Collection",
            "altern-text": "View in Cuba",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/cuba/cuba5.png?raw=true",
            "stable-url": "https://www.getty.edu/art/collection/object/106TM6"
          }
        ],
        "escritos": {
          "title": "Cuba",
          "pdf_url": "https://bogotanochinero.netlify.app/docs/Tanco%20Armero,%20Viaje%20a%20China-78-117.pdf"
        },
        "analisis": {
          "title": "Cuba: La revolución del azúcar",
          "content": [
            "Cuba, con su exuberante paisaje tropical y su economía azucarera dominante, se presenta en el relato de Nicolás Tanco Armero como un punto clave en el Caribe del siglo XIX. La Habana, con sus calles empedradas y sus imponentes fortalezas coloniales, simboliza un pasado lleno de poderío español, mientras que las plantaciones de caña de azúcar hablan de un presente marcado por la explotación y la esclavitud.",
            "En su recorrido, Tanco Armero observa cómo la riqueza fluye desde estas tierras, pero también cómo esta misma prosperidad se construye sobre profundas desigualdades. Cuba no es solo un espacio geográfico para el viajero, sino un espejo de las tensiones entre tradición y cambio. Aquí, el mar Caribe no solo conecta economías, sino también culturas y conflictos que definen la región.",
            "Cada rincón de la isla narra una historia: las huellas de la colonización, los ecos de la resistencia esclava y la promesa de un futuro incierto. Para Tanco Armero, Cuba es un territorio de contrastes, donde la belleza del entorno contrasta con la crudeza de las realidades humanas. Acá toma la decisión de partir a China, una búsqueda por mano de obra."
          ]
        }
      },
      {
        "name": "Estados Unidos de América, Feb.-Abr. 1855",
        "atlas": {
          "latitude": 40.758594860606,
          "longitude": -74.0900435970199,
          "zoom": 5,
          "scale": 0.5
        },
        "recuerdos": [
          {
            "title": "Mount Tom, Massachusetts, USA",
            "author": "Creswick, Thomas (painter (artist))",
            "date": "1840",
            "repository": "VICTORIA AND ALBERT MUSEUM",
            "credits": "From the V & A H Beard Print Collection",
            "altern-text": "Mount Tom, Massachusetts, USA",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/usa/usa0.jpg?raw=true",
            "stable-url": "https://collections.vam.ac.uk/item/O133690/mount-tom-massachusetts-usa-oil-painting-creswick-thomas/"
          },
          {
            "title": "Harper's Weekly",
            "author": "Anónimo",
            "date": "1863",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Harper's Weekly",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/usa/usa1.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/46727"
          },
          {
            "title": "Harper's Weekly",
            "author": "Anónimo",
            "date": "1862",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Harper's Weekly",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/usa/usa2.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/46784"
          },
          {
            "title": "Harpers Weekly",
            "author": "Anónimo",
            "date": "1869",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Harpers Weekly",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/usa/usa3.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/17358"
          },
          {
            "title": "Harpers Weekly",
            "author": "Anónimo",
            "date": "1863",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Harpers Weekly",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/usa/usa4.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/46740"
          },
          {
            "title": "The New York State Soldiers' and Sailors' home.",
            "author": "Clarke, Wm. M. (Lithographer), printer.",
            "date": "1881",
            "repository": "CALISPHERE",
            "credits": "Jay T. Last Collection of Graphic Arts and Social History",
            "altern-text": "The New York State Soldiers' and Sailors' home. : Bath, New York.",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/usa/usa5.jpg?raw=true",
            "stable-url": "https://calisphere.org/item/dcdf738fdd9f814ad26392de7b2e9b0c/"
          },
          {
            "title": "Merchants' Exchange, New York",
            "author": "Warner, C. L.",
            "date": "1836",
            "repository": "CALISPHERE",
            "credits": "Jay T. Last Collection of Graphic Arts and Social History",
            "altern-text": "Merchants' Exchange, New York",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/usa/usa6.jpeg?raw=true",
            "stable-url": "https://calisphere.org/item/5c12c1eda45a95a79b3dd6e32170afe8/"
          },
          {
            "title": "East New York.",
            "author": "Blümner, Frederick",
            "date": "1859",
            "repository": "CALISPHERE",
            "credits": "Jay T. Last Collection of Graphic Arts and Social History",
            "altern-text": "East New York. 1859",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/usa/usa7.jpeg?raw=true",
            "stable-url": "https://calisphere.org/item/6ebd3d3152e87bd1d339dbd01dd6c893/"
          },
          {
            "title": "Printing-house Square.",
            "author": "Endicott & Co.",
            "date": "1861",
            "repository": "CALISPHERE",
            "credits": "Jay T. Last Collection of Graphic Arts and Social History",
            "altern-text": "Printing-house Square. New York",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/usa/usa8.jpeg?raw=true",
            "stable-url": "https://calisphere.org/item/693f1c8487119764d38bb831396997fa/"
          },
          {
            "title": "The city of New York",
            "author": "Currier & Ives,",
            "date": "1870",
            "repository": "CALISPHERE",
            "credits": "Jay T. Last Collection of Graphic Arts and Social History",
            "altern-text": "The city of New York",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/usa/usa9.jpeg?raw=true",
            "stable-url": "https://calisphere.org/item/a7b1b36a58be9851aeabeef06bbc3191/"
          },
          {
            "title": "Birds eye view of New York & Brooklyn",
            "author": "Bachmann, John",
            "date": "1850",
            "repository": "CALISPHERE",
            "credits": "Jay T. Last Collection of Graphic Arts and Social History",
            "altern-text": "Birds eye view of New York & Brooklyn",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/usa/usa10.jpeg?raw=true",
            "stable-url": "https://calisphere.org/item/e1a520df53c1f1dcba96ec0b977e49b1/"
          },
          {
            "title": "St. Nicholas-Hotel Broadway",
            "author": "F. Heppenheimer",
            "date": "1855",
            "repository": "Wikimedia Commons",
            "credits": "From Wikimedia Commons, the free media repository",
            "altern-text": "St. Nicholas-Hotel Broadway",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/usa/usa11.jpg?raw=true",
            "stable-url": "https://upload.wikimedia.org/wikipedia/commons/e/e8/St_Nicholas_Hotel_1855.jpg?20151206142440"
          }
        ],
        "escritos": {
          "title": "Estados Unidos de América",
          "pdf_url": "https://bogotanochinero.netlify.app/docs/Tanco%20Armero,%20Viaje%20a%20China-117-147.pdf"
        },
        "analisis": {
          "title": "Estados Unidos: La modernidad en marcha",
          "content": [
            "El paso de Tanco Armero por Estados Unidos lo confronta con una sociedad en pleno auge industrial y urbano. Desde las bulliciosas calles de Nueva York hasta los fértiles campos de Filadelfia, su descripción capta tanto la opulencia como las desigualdades de esta naciente potencia mundial.",
            "Estados Unidos se presenta como un espacio de innovación, donde el ferrocarril y las fábricas transforman el paisaje. Para Tanco Armero, este país encarna las posibilidades del progreso, pero también despierta preguntas sobre el costo de la modernidad. Las tensiones raciales y la acelerada urbanización no pasan desapercibidas en su análisis.",
            "En sus escritos, Estados Unidos se convierte en un laboratorio de lo que el futuro podría traer. Tanco Armero observa con fascinación y crítica, recogiendo lecciones que inevitablemente compara con la realidad de su natal Nueva Granada."
          ]
        }
      },
      {
        "name": "Inglaterra, Abr. 1855",
        "atlas": {
          "latitude": 51.7230717631724,
          "longitude": -0.356363829555175,
          "zoom": 5,
          "scale": 0.3
        },
        "recuerdos": [
          {
            "title": "Henry VIII Gate, Windsor Castle",
            "author": "Roger Fenton",
            "date": "1860",
            "repository": "ROYAL COLLECTION TRUST",
            "credits": "From the Royal Collection Trust",
            "altern-text": "Henry VIII Gate, Windsor Castle: Changing the Guard 1860",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/inglaterra/ing0.jpg?raw=true",
            "stable-url": "https://www.rct.uk/collection/search#/16/collection/2100040/henry-viii-gate-windsor-castle-changing-the-guard"
          },
          {
            "title": "Fleming House",
            "author": "Louisa M. Paris",
            "date": "1850",
            "repository": "VICTORIA AND ALBERT MUSEUM",
            "credits": "From the V & A H Beard Print Collection",
            "altern-text": "Fleming House",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/inglaterra/ing1.jpg?raw=true",
            "stable-url": "https://collections.vam.ac.uk/item/O1068528/fleming-house-watercolour-louisa-paris/"
          },
          {
            "title": "Metropolitan improvements",
            "author": "Shepherd, Thomas Hosmer; Wallis, W",
            "date": "1828",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Metropolitan improvements; or, London in the ninet",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/inglaterra/ing2.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/17250"
          },
          {
            "title": "The picturesque scenery of England",
            "author": "T. Nelson & Sons",
            "date": "1875",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "The picturesque scenery of England",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/inglaterra/ing3.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/35364"
          },
          {
            "title": "Topographical Drawings of Surrey",
            "author": "Hapell, E",
            "date": "1832",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Topographical Drawings of Surrey",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/inglaterra/ing4.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/4846"
          },
          {
            "title": "England as seen by Foreigners",
            "author": "Hollar, Wenceslaus",
            "date": "1865",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "England as seen by Foreigners in the days of Elizabeth and James the First",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/inglaterra/ing5.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/18464"
          },
          {
            "title": "The picturesque scenery of England.",
            "author": "T. Nelson & Sons",
            "date": "1875",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "The picturesque scenery of England.",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/inglaterra/ing6.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/35365"
          },
          {
            "title": "The picturesque scenery of England",
            "author": "T. Nelson & Sons",
            "date": "1875",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "The picturesque scenery of England",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/inglaterra/ing7.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/35216"
          }
        ],
        "escritos": {
          "title": "Inglaterra",
          "pdf_url": "https://bogotanochinero.netlify.app/docs/Tanco%20Armero,%20Viaje%20a%20China-148-175.pdf"
        },
        "analisis": {
          "title": "Inglaterra: La Cuna de la Revolución Industrial",
          "content": [
            "En su travesía por Inglaterra, Tanco Armero se encontró con el corazón de la Revolución Industrial. Liverpool, con su bullicioso puerto, le ofreció un vistazo a la moderna maquinaria del comercio marítimo. En contraste, Londres lo recibió con la imponencia de sus instituciones y su arquitectura, símbolo del imperio británico en su apogeo.",
            "En sus observaciones, Armero resaltó la energía y el pragmatismo inglés, cualidades que transformaban paisajes rurales en centros urbanos vibrantes. Para el viajero colombiano, Inglaterra era más que un país: era un ejemplo vivo del cambio, un lugar donde tradición e innovación coexistían en un equilibrio fascinante."
          ]
        }
      },
      {
        "name": "Francia, Abr.-May. 1855",
        "atlas": {
          "latitude": 48.8613100901512,
          "longitude": 2.33741807565212,
          "zoom": 5,
          "scale": 0.5
        },
        "recuerdos": [
          {
            "title": "Histoire des Environs de Paris",
            "author": "de la Bédollière, Émile Gigault",
            "date": "1861",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Histoire des Environs de Paris",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/francia/fra0.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/24544"
          },
          {
            "title": "Tableau de Paris",
            "author": "Texier, Edmond",
            "date": "1852",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Tableau de Paris",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/francia/fra1.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/32303"
          },
          {
            "title": "Tableau de Paris Museé",
            "author": "Texier, Edmond",
            "date": "1852",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Tableau de Paris Museo",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/francia/fra1.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/32304"
          },
          {
            "title": "Notre-Dame de Paris.",
            "author": "Victor Marie Hugo",
            "date": "1836",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Notre-Dame de Paris.",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/francia/fra3.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/20424"
          },
          {
            "title": "Paris",
            "author": "Hubert Clerget, Édouard Riou",
            "date": "1876",
            "repository": "Wikimedia Commons",
            "credits": "From Wikimedia Commons, the free media repository",
            "altern-text": "Paris",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/francia/fra4.jpg?raw=true",
            "stable-url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/G%C3%A9ographie_illustr%C3%A9e_de_la_France_et_de_ses_colonies..._Page_645_-_Paris_-_The_British_Library.jpg/1280px-G%C3%A9ographie_illustr%C3%A9e_de_la_France_et_de_ses_colonies..._Page_645_-_Paris_-_The_British_Library.jpg?20190506185453"
          },
          {
            "title": "Voyage de Paris à la Mer",
            "author": "Jules Gabriel Janin",
            "date": "1847",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Voyage de Paris à la Mer ... Description historiqu",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/francia/fra5.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/16991"
          },
          {
            "title": "Picturesque Architecture in Paris.",
            "author": "Tomas Shotter Boys",
            "date": "1839",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Picturesque Architecture in Paris, Ghent, Antwerp",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/francia/fra6.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/12216"
          },
          {
            "title": "L'Orléanais",
            "author": "Pilophon de la Madelaine, V",
            "date": "1845",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "L'Orléanais. Histoire des Ducs et du Duché d'Oriéa",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/francia/fra7.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/20646"
          },
          {
            "title": "View of the boulevards at Paris",
            "author": "Willian Henry Fox Talbot",
            "date": "1843",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "View of the boulevards at Paris, May-June 1843",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/francia/fra8.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/47461"
          },
          {
            "title": "Paris",
            "author": "Anónimo",
            "date": "1867",
            "repository": "GALLICA",
            "credits": "From Gallica",
            "altern-text": "Paris",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/francia/fra9.JPEG?raw=true",
            "stable-url": "https://gallica.bnf.fr/ark:/12148/btv1b8445684g"
          },
          {
            "title": "Steps to the main facade, January 1867",
            "author": "Delmaet & Durandelle (photographers)",
            "date": "1867",
            "repository": "VICTORIA AND ALBERT MUSEUM",
            "credits": "From the V & A H Beard Print Collection",
            "altern-text": "Steps to the main facade, January 1867",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/francia/fra10.jpg?raw=true",
            "stable-url": "https://collections.vam.ac.uk/item/O112807/steps-to-the-main-facade-photograph-durandelle-louis-emile/"
          }
        ],
        "escritos": {
          "title": "Francia",
          "pdf_url": "https://bogotanochinero.netlify.app/docs/Tanco%20Armero,%20Viaje%20a%20China-175-251.pdf"
        },
        "analisis": {
          "title": "París: El Espejo de la Civilización",
          "content": [
            "En el corazón de su travesía, París emerge como un espacio crucial para Nicolás Tanco Armero, donde se confrontan las aspiraciones y contradicciones de Occidente. La ciudad, celebrada por su suntuosidad y riqueza cultural, es para Tanco la 'cuna de la civilización occidental'. Aquí, las calles y monumentos hablan de progreso y modernidad, pero también revelan fisuras en la moralidad que el viajero observa con aguda mirada crítica.",
            "París no solo es un lugar de observación, sino un espejo que refleja tanto las virtudes como los excesos de la civilización europea. En su relato, Tanco describe con admiración la grandiosidad de la arquitectura y la vitalidad intelectual que definen a la capital francesa. Sin embargo, no evade las escenas que desafían su sentido de decoro, como la exposición de cadáveres en público, un espectáculo que encuentra profundamente inquietante. Esta dualidad posiciona a París como un nodo donde convergen fascinación y crítica, moldeando su percepción de la otredad en otros territorios.",
            "La experiencia parisina consolida en Tanco un marco interpretativo para entender lo diferente. Desde esta 'ciudad luz', el viajero proyecta sus reflexiones sobre las costumbres y materialidades de otras sociedades, llevándose consigo una visión impregnada de admiración y escepticismo, que marcará su manera de relatar el mundo que le rodea."
          ]
        }
      },
      {
        "name": "Egipto, May. 1855",
        "atlas": {
          "latitude": 30.05813028,
          "longitude": 31.22304358,
          "zoom": 5,
          "scale": 0.4
        },
        "recuerdos": [
          {
            "title": "Utazási Album",
            "author": "Desconocido",
            "date": "1857",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Utazási Album",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/egipto/egyp0.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/18557"
          },
          {
            "title": "Utazási Album",
            "author": "Desconocido",
            "date": "1857",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Utazási Album",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/egipto/egyp1.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/18556"
          },
          {
            "title": "Vies on the Nile. Ferry to Gizen",
            "author": "Roberts, David",
            "date": "1842",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "The Holy Land, Syria, Idumea, Arabia, Egypt, & Nubia, from drawings made on the spot by D. Roberts With historical descriptions by the Revd George Croly",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/egipto/egyp2.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/18942"
          },
          {
            "title": "The Entrance to the Citadel of Cairo",
            "author": "Roberts, David",
            "date": "1842",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "The Holy Land, Syria, Idumea, Arabia, Egypt, & Nubia, from drawings made on the spot by D. Roberts With historical descriptions by the Revd George Croly",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/egipto/egyp3.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/18940"
          },
          {
            "title": "Bazaar of the Silk Merchants. Cairo",
            "author": "Roberts, David; Brockedon; Croly",
            "date": "1842",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "The Holy Land, Syria, Idumea, Arabia, Egypt, & Nubia, from drawings made on the spot by D. Roberts With historical descriptions by the Rev:d George Croly",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/egipto/egyp4.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/2648"
          },
          {
            "title": "First and Second Pyramid of Gizah. Ancient Memphis",
            "author": "Mayer, Luigi",
            "date": "1804",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Views in Egypt, Palestine, and other parts of the Ottoman Empire",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/egipto/egyp5.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/150507"
          },
          {
            "title": "Pyramids of Sakhara, & Dashoor.",
            "author": "Sausmarez, George De",
            "date": "1855",
            "repository": "VICTORIA AND ALBERT MUSEUM",
            "credits": "From the V & A H Beard Print Collection",
            "altern-text": "Pyramids of Sakhara, & Dashoor. Upper Egypt",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/egipto/egyp6.jpg?raw=true",
            "stable-url": "https://collections.vam.ac.uk/item/O181875/pyramids-of-sakhara--dashoor-watercolour-sausmarez-george-de/"
          },
          {
            "title": "Sioot - (the ancient Lycopolis.)",
            "author": "Sausmarez, George De",
            "date": "1855",
            "repository": "VICTORIA AND ALBERT MUSEUM",
            "credits": "From the V & A H Beard Print Collection",
            "altern-text": "Sioot - (the ancient Lycopolis.) - \"Upper Egypt.\" from the Stabl-Antar Hill",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/egipto/egyp7.jpg?raw=true",
            "stable-url": "https://collections.vam.ac.uk/item/O182077/sioot---the-ancient-watercolour-sausmarez-george-de/"
          }
        ],
        "escritos": {
          "title": "Egipto",
          "pdf_url": "https://bogotanochinero.netlify.app/docs/Tanco%20Armero,%20Viaje%20a%20China-268-319.pdf"
        },
        "analisis": {
          "title": "Egipto: La puerta al misterio del pasado",
          "content": [
            "Egipto es para Tanco Armero un lugar donde el tiempo parece detenerse. Sus relatos sobre las majestuosas pirámides, los templos de Giza y el río Nilo muestran su fascinación por una civilización que, a pesar de los siglos, sigue imponente. Aquí, el viajero encuentra el contraste entre la grandeza del pasado y la vida cotidiana del presente.",
            "En sus descripciones, Egipto es mucho más que un destino exótico. Es un espacio de reflexión sobre la historia universal, la decadencia de los imperios y la supervivencia cultural. Tanco Armero observa cómo las tradiciones locales se entrelazan con las influencias coloniales que en ese momento transforman el país.",
            "Egipto, en su narrativa, se convierte en una metáfora del eterno diálogo entre lo antiguo y lo moderno, entre la memoria y el cambio. Es un capítulo que invita al lector a explorar no solo las imágenes, sino también las preguntas filosóficas que plantea."
          ]
        }
      },
      {
        "name": "China, Jul. 1855-Ago. 1858",
        "atlas": {
          "latitude": 28.122399808389037,
          "longitude": 114.53905802670702,
          "zoom": 4,
          "scale": 0.7
        },
        "recuerdos": [
          {
            "title": "The Costume of China. A Pagoda or temple",
            "author": "William Miller:",
            "date": "1805",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "The Costume of China. A Pagoda or temple",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/china/chi0.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/15753"
          },
          {
            "title": "The Costume of China. South gate",
            "author": "William Miller:",
            "date": "1805",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "The Costume of China. South gate",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/china/chi1.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/15749"
          },
          {
            "title": "The Costume of China. A Chinese porter, or carrier",
            "author": "William Miller:",
            "date": "1805",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "The Costume of China. A Chinese porter, or carrier",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/china/chi2.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/15695"
          },
          {
            "title": "The Costume of China. Chinese sailing vessels",
            "author": "William Miller:",
            "date": "1805",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "The Costume of China. Chinese sailing vessels",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/china/chi3.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/18256"
          },
          {
            "title": "Chinese landscape. Landscape seen from the banks of a river",
            "author": "Five Views in China. Chinese drawings, in India ink'",
            "date": "1829",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Chinese landscape. Landscape seen from the banks of a river",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/china/chi4.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/180094"
          },
          {
            "title": "Views of China: The West Gate, Chin Kiang Foo Bridge over the Grand Canal",
            "author": "James Stoddart",
            "date": "1842",
            "repository": "ROYAL COLLECTION TRUST",
            "credits": "From the Royal Collection Trust",
            "altern-text": "Views of China: The West Gate, Chin Kiang Foo Bridge over the Grand Canal",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/china/chi5.jpg?raw=true",
            "stable-url": "https://www.rct.uk/collection/search#/11/collection/925157/views-of-china-the-west-gate-chin-kiang-foo-bridge-over-the-grand-canal"
          },
          {
            "title": "China, historisch romantisch, malerisch.",
            "author": "Thomas Allon",
            "date": "1843",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "China, historisch romantisch, malerisch.",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/china/chi6.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/163367"
          },
          {
            "title": "China: in a series of views.",
            "author": "Wright, George Newenham",
            "date": "1843",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "China: in a series of views, displaying the scenery, architecture and social habits of that ancient empire.",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/china/chi7.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/18254"
          },
          {
            "title": "The Hastings Albums",
            "author": "Anónimo",
            "date": "1860",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "The Hastings Albums",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/china/chi8.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/24538"
          },
          {
            "title": "Dutch Folly Fort on the Pearl River near Canton",
            "author": "Anónimo",
            "date": "1830",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Dutch Folly Fort on the Pearl River near Canton",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/china/chi9.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/143717"
          },
          {
            "title": "Vistas de China: Amoy desde las tumbas",
            "author": "James Stoddart (c.1817-1892)",
            "date": "1842",
            "repository": "Royal Collection Trust",
            "credits": "From the Royal Collection Trust",
            "altern-text": "Vistas de China: Amoy desde las tumbas",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/china/chi10.jpg?raw=true",
            "stable-url": "https://www.rct.uk/collection/925165/views-of-china-amoy-from-the-tombs"
          },
          {
            "title": "Vistas de China: Tonghai desde Long Battery, Chusan",
            "author": "James Stoddart (c.1817-1892)",
            "date": "1842",
            "repository": "Royal Collection Trust",
            "credits": "From the Royal Collection Trust",
            "altern-text": "Vistas de China: Tonghai desde Long Battery, Chusan",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/china/chi11.jpg?raw=true",
            "stable-url": "https://www.rct.uk/collection/search#/34/collection/925149/views-of-china-tonghai-from-long-battery-chusan"
          },
          {
            "title": "Vistas de China: Boceto en Chinghai cerca de Ningpo",
            "author": "James Stoddart (c.1817-1892)",
            "date": "1842",
            "repository": "Royal Collection Trust",
            "credits": "From the Royal Collection Trust",
            "altern-text": "Vistas de China: Boceto en Chinghai cerca de Ningpo",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/china/chi12.jpg?raw=true",
            "stable-url": "https://www.rct.uk/collection/search#/37/collection/925155/views-of-china-sketch-at-chinghai-near-ningpo"
          },
          {
            "title": "Vistas de China: El lugar de desembarco, Amoy",
            "author": "James Stoddart (c.1817-1892)",
            "date": "1842",
            "repository": "Royal Collection Trust",
            "credits": "From the Royal Collection Trust",
            "altern-text": "Vistas de China: El lugar de desembarco, Amoy",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/china/chi13.jpg?raw=true",
            "stable-url": "https://www.rct.uk/collection/search#/38/collection/925156/views-of-china-the-landing-place-amoy"
          },
          {
            "title": "Vistas de China: La Torre de Porcelana, Ciudad de Nankín",
            "author": "James Stoddart (c.1817-1892)",
            "date": "1842",
            "repository": "Royal Collection Trust",
            "credits": "From the Royal Collection Trust",
            "altern-text": "Vistas de China: La Torre de Porcelana, Ciudad de Nankín",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/china/chi14.jpg?raw=true",
            "stable-url": "https://www.rct.uk/collection/search#/44/collection/925158/the-porcelain-tower-city-of-nankin"
          },
          {
            "title": "China: La Tumba Imperial en la Isla Dorada",
            "author": "Frederick John White (fl.1834-1856)",
            "date": "1842",
            "repository": "Royal Collection Trust",
            "credits": "From the Royal Collection Trust",
            "altern-text": "China: La Tumba Imperial en la Isla Dorada",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/china/chi15.jpg?raw=true",
            "stable-url": "https://www.rct.uk/collection/search#/50/collection/921498/china-the-imperial-tomb-on-the-golden-island"
          },
          {
            "title": "Vistas de China: el continente desde Hong Kong",
            "author": "James Stoddart (c.1817-1892)",
            "date": "1842",
            "repository": "Royal Collection Trust",
            "credits": "From the Royal Collection Trust",
            "altern-text": "Vistas de China: el continente desde Hong Kong",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/china/chi16.jpg?raw=true",
            "stable-url": "https://www.rct.uk/collection/search#/51/collection/925160/views-of-china-the-mainland-from-hong-kong"
          },
          {
            "title": "Hsien-Feng, Emperador de China (1831-61)",
            "author": "Desconocido",
            "date": "1850",
            "repository": "Royal Collection Trust",
            "credits": "From the Royal Collection Trust",
            "altern-text": "Hsien-Feng, Emperador de China (1831-61)",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/china/chi17.jpg?raw=true",
            "stable-url": "https://www.rct.uk/collection/search#/13/collection/2915299/hsien-feng-emperor-of-china-1831-61"
          }
        ],
        "escritos": {
          "title": "China",
          "pdf_url": "https://bogotanochinero.netlify.app/docs/Tanco%20Armero,%20Viaje%20a%20China-344-550.pdf"
        },
        "analisis": {
          "title": "Enfrentando el Otro en China",
          "content": [
            "La llegada de Nicolás Tanco Armero a China marcó un encuentro crucial con la alteridad. En un imperio donde la tradición y el aislamiento habían tejido un entramado cultural único, Tanco confrontó un espacio que, para él, encarnaba la diferencia en su forma más pura. Desde Hong Kong hasta Amoy, cada experiencia lo enfrentó a la disonancia de costumbres, arquitectura y vida cotidiana. Sin embargo, no solo se encontró con un 'otro' distante, sino que también se reconoció como otredad para los habitantes locales, quienes observaban su figura 'europea' con igual curiosidad y desconcierto.",
            "Este doble juego de miradas, el ser observador y observado, intensificó la reflexión de Tanco sobre la otredad. La distancia cultural no solo alimentó su percepción de un Imperio celeste detenido en el tiempo, sino que también reveló los límites de su marco occidental al intentar comprender lo incomprensible. Al mismo tiempo, sus comparaciones entre China y Occidente no solo intentaron trazar una línea divisoria, sino también definir su propia identidad en contraste con la riqueza, decadencia y extrañeza que percibía en el otro extremo del mundo"
          ]
        }
      },
      {
        "name": "Palestina, Ago. 1858",
        "atlas": {
          "latitude": 31.76733769,
          "longitude": 35.21919146,
          "zoom": 5,
          "scale": 0.7
        },
        "recuerdos": [
          {
            "title": "Gerusalemme (Palestina) Tempio dei Protestanti",
            "author": "Giacomo Brogi",
            "date": "1868",
            "repository": "GETTY MUSEUM COLLECTION",
            "credits": "From the Getty Museum Collection",
            "altern-text": "Gerusalemme (Palestina) Tempio dei Protestanti",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/palestina/pal0.jpg?raw=true",
            "stable-url": "https://www.getty.edu/art/collection/object/106XEY"
          },
          {
            "title": "Gerico (Palestina) Monte della Quarentena.",
            "author": "Giacomo Brogi",
            "date": "1868",
            "repository": "GETTY MUSEUM COLLECTION",
            "credits": "From the Getty Museum Collection",
            "altern-text": "Gerico (Palestina) Monte della Quarentena.",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/palestina/pal1.jpg?raw=true",
            "stable-url": "https://www.getty.edu/art/collection/object/106XF0"
          },
          {
            "title": "Jerusalén. Betania",
            "author": "De la colección de Adolf Andersohn",
            "date": "1867",
            "repository": "Vänersborgs museum",
            "credits": "From the Vänersborgs museum",
            "altern-text": "Jerusalén. Betania",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/palestina/pal2.jpg?raw=true",
            "stable-url": "https://digitaltmuseum.se/011015260278/jerusalem-betania"
          },
          {
            "title": "Jerusalem in 1860: a series of photographic views",
            "author": "Cramb, John",
            "date": "1860",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Jerusalem in 1860: a series of photographic views",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/palestina/pal3.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/20777"
          },
          {
            "title": "Jerusalem in 1860: a series of photographic views,",
            "author": "Cramb, John",
            "date": "1860",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "Jerusalem in 1860: a series of photographic views,",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/palestina/pal4.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/20778"
          },
          {
            "title": "The Holy Land, Syria, Idumea, Egypt, & Arabia",
            "author": "Roberts, David",
            "date": "1855",
            "repository": "BRITISH LIBRARY",
            "credits": "From the British Library archive",
            "altern-text": "The Holy Land, Syria, Idumea, Egypt, & Arabia",
            "url": "https://github.com/Dukeg13/BogotanoChinero/blob/main/images/palestina/pal5.jpg?raw=true",
            "stable-url": "https://imagesonline.bl.uk/asset/17706"
          }
        ],
        "escritos": {
          "title": "Palestina",
          "pdf_url": "https://bogotanochinero.netlify.app/docs/Tanco%20Armero,%20Viaje%20a%20China-554-617.pdf"
        },
        "analisis": {
          "title": "Palestina: La espiritualidad en el paisaje",
          "content": [
            "En Palestina, Tanco Armero se encuentra con una tierra cargada de historia y simbolismo. Desde Jerusalén hasta las orillas del Jordán, su relato transmite la profunda espiritualidad que emana de este paisaje. Los lugares sagrados, tanto del cristianismo como del judaísmo y el islam, dejan una huella indeleble en su percepción.",
            "El viajero describe con detalle los mercados, las mezquitas y los lugares bíblicos, pero también observa la compleja convivencia entre culturas y religiones. Para Tanco Armero, Palestina no es solo un destino, sino un espacio donde la historia y la fe se entrelazan.",
            "En sus palabras, Palestina es una invitación a reflexionar sobre las raíces compartidas de la humanidad y la importancia del diálogo intercultural. Un lugar donde el pasado se siente vivo en cada esquina."
          ]
        }
      }
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
    document.getElementById("recuerdo-credits").textContent = `Créditos: ${recuerdo.credits || "Sin información disponible"}`;

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

