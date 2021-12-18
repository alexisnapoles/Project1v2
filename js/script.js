
function main () {
    let map;
    
    function init() {
        map = initMap();
        
        let searchResult = L.layerGroup();
        let searchMarkers = []
        let searchResultBox = document.querySelector('#filed-search-result')

            // when window loaded
            window.addEventListener('DOMContentLoaded', async () => {
            
       
            // trigger button for books category
            document.querySelector('#books').addEventListener('click', async ()=>{
                let bookCategory = 'commercial.books';
                let bookResults = await getPlacesData(bookCategory);
                let bookArray = bookResults.features.length

                searchResult.clearLayers();
                let index = 0
                for (let book in bookArray) {
                    let marker = L.marker([book.geometry.coordinates[0], book.geometry.coordinates[1]])
                    marker.bindPopup(`<div><h1>${book[index].name}</h1></div>`);
                    marker.addTo(searchResult);
                    searchMarkers.push(marker);

                    let resultElement = document.createElement('div');
                    resultElement.innerHTML = book.name;
                        resultElement.addEventListener('click', () => {
                            map.flyTo([book.geometry.coordinates[0], book.geometry.coordinates[1]], 16);
                            marker.openPopup
                        })
                        searchResultBox.appendChild(resultElement);
                if (!map.hasLayer(searchResult)) {
                    map.addLayer(searchResult);
                }
                
                }
            })
            
            
        })
    }
    init();
    
}

// ========================= CATEGORY LAYERS ========================

function initMap() {
    let startPosition = [14.5546336, 121.015680];
    let map = L.map('map');
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
main();

// let searchResult = L.layerGroup();
// let searchMarkers = []
// let searchResultBox = document.querySelector('#filed-search-result')
// // MY FUNCTIONS FROM BUTTON ON CLICK EVENT REF: INDEX.HTML


// async function myFunction2() {
//     // alert('you called function with arguments: 2 ' + val);
//     const cafeCategory = 'catering.cafe';
//     let cafeResults = await getPlacesData(cafeCategory);
//     // console.log(cafeResults);
//     searchResult.clearLayers();
//     let cafeArray = cafeResults.features
//     for (let index = 0; index < cafeArray.length; index++) {
//         // console.log(cafeArray[index].geometry.coordinates);
//         let marker = L.marker([cafeArray[index].geometry.coordinates[1], cafeArray[index].geometry.coordinates[0]])
//         marker.bindPopup(`<div><h1>${cafeArray[index].name}</h1></div>`);
//         marker.addTo(searchResult);
//         searchMarkers.push(marker);

//         let resultElement = document.createElement('div');
//         resultElement.innerHTML = cafeArray[index].name;
//         resultElement.addEventListener('click', () => {
//             map.flyTo([cafeArray[index].geometry.coordinates[1], cafeArray[index].geometry.coordinates[0]], 16);
//             marker.openPopup
//         })
//         searchResultBox.appendChild(resultElement);
//     }
// }

// // create function for category filtering: 
// function myFunction(button) {
//     let x = button.id;
//     switch (x) {
//         case 'bks':
//             myFunction1(x);
//             break;
//         case 'caf':
//             myFunction2(x);
//             break;
//         default:
//             return false;
//     }
// }

