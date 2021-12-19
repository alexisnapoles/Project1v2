function initMap() {
    let startPosition = [14.5546336, 121.015680];
    map = L.map('map');
    map.setView(startPosition, 10);

    // setup tilelayer
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: MAPBOX_ACCESS_TOKEN
    }).addTo(map);
}
initMap();

/* ======================================== MAP LAYERS ====================================== */
let booksLayer = L.layerGroup();
let cafeLayer = L.layerGroup();

/* ============= BOOKS CAT ================= */
// this section assigns a function that allows retrieval of json file for books
async function retriveBooksData() {
    let bCategory = 'commercial.books';
    let booksResults = await getPlacesData(bCategory);
    // console.log(booksResults);
    let booksArray = booksResults.features
    // return booksArray = features array;

    // empty array that will store data information
    let bSearchMarkers = [];

    // clears previous search results
    booksLayer.clearLayers();

    let bResults = document.querySelector('#booksSearchResult');

    // pull out important objects or data from the retrieved apikey
    for (let b of booksArray) {
        // assigning of variables to store json objects 
        // let bookPoint = [b.geometry.coordinates[0], b.geometry.coordinates[1]];
        let bPointName = b.properties.name;
        let bPointAddress = b.properties.formatted
        let bdataSource = b.properties.datasource.attribution
        // logs array of coordinates per data featurearray
        // console.log(bPointName);

        // markers layer
        let bookMarker = L.marker([b.geometry.coordinates[1], b.geometry.coordinates[0]]);
        bookMarker.bindPopup(`
        <div><h1>${bPointName}</h1></div>
        <br />
        <div><h3>${bPointAddress}</h3></div>
        <br />
        <div><h3>${bdataSource}</h3></div>
        `);
        bookMarker.addTo(booksLayer);
        bSearchMarkers.push(bookMarker);

        // results are displayed in the appended Child node
        let bResultsElement = document.createElement('div');
        bResultsElement.innerHTML = bPointName;
        bResultsElement.addEventListener('click', () => {
            map.flyTo([b.geometry.coordinates[1], b.geometry.coordinates[0]], 15);
            bookMarker.openPopup();
        })
        bResults.appendChild(bResultsElement);
    }
    return;  
}

/* ============= CAFE CAT ================= */
async function retriveCafeData() {
    let cCategory = 'catering.cafe';
    let cafeResults = await getPlacesData(cCategory);
    let cafeArray = cafeResults.features;
    let cSearchMarkers = [];

    cafeLayer.clearLayers();

    let cResults = document.querySelector('#cafeSearchResult');

    for (let c of cafeArray) {
        let cPointName = c.properties.name;
        let cPointAddress = c.properties.formatted
        let cdataSource = c.properties.datasource.attribution

        let cafeMarker = L.marker([c.geometry.coordinates[1], c.geometry.coordinates[0]]);
        cafeMarker.bindPopup(`
        <div><h1>${cPointName}</h1></div>
        <br />
        <div><h3>${cPointAddress}</h3></div>
        <br />
        <div><h3>${cdataSource}</h3></div>
        `);
        cafeMarker.addTo(cafeLayer);
        cSearchMarkers.push(cafeMarker);

        let cResultsElement = document.createElement('div');
        cResultsElement.innerHTML = cPointName;
        cResultsElement.addEventListener('click', () => {
            map.flyTo([c.geometry.coordinates[1], c.geometry.coordinates[0]], 15);
            cafeMarker.openPopup();
        })
        cResults.appendChild(cResultsElement);
    }
    return;
}

/* ============= ADDING BOOKS AND CAFE LAYERS TO MAP ================= */
async function addMapLayers(){
    await retriveBooksData();
    await retriveCafeData();
    console.log('addMapLayers; Before layer is added');
    let baseLayers = {
        'Book Stores': booksLayer,
        'Cafe': cafeLayer,
    }
    L.control.layers(baseLayers).addTo(map);
    console.log('addMapLayers; After layer is added');
}

window.addEventListener('DOMContentLoaded', async (e) => {
    addMapLayers();
    console.log('all function code: after map layer done')
})

/* ======================================== END OF SCRIPT =========================================  */


/* ============================================ NOTES ============================================= */
/* 
# IMPORTANT NOTE:
    ## All codes are attributed to the following:
        >>>>>> Map App Lab,
        >>>>>> Documentations,
        >>>>>> Stackoverflow, etc.
    ## Future improvements:
        >>>>>> layout,
        >>>>>> functionality of button,
        >>>>>> more interactive layers that the user might find useful
    ## Additionals:
        >>>>>> reiterate
*/
/* ======================================== END OF NOTES ========================================= */