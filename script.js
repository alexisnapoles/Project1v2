// Set up Map
let startPosition = [14.5546336, 121.015680];
let startZoom = 13;

const map = L.map('map').setView(startPosition, startZoom);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', 
    {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 21,
    id: 'mapbox/dark-v10',
    accessToken: MAPBOX_ACCESS_TOKEN
    }).addTo(map);

// Whenever map stops moving, load new weather for new location
map.on('moveend', () => {
    getTiles()
})


const key = WEATHERMAP_API;
const searchElement =  document.querySelector('input');

getTiles = () => {
    // remove existing tiles before new start
    // removeTiles()
    let lat = map.getCenter().lat;
    let lng = map.getCenter().lng;

    // OpenWeatherMap API
    let getWeatherData = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat.toFixed(6) + '&lon=' + lng.toFixed(6) + '&appid=' + key;
        fetch(getWeatherData)
            .then(resp => { return resp.json() }) // Convert data to json
            .then(data => {
                // console.log(data);
                const celsius = Math.round(parseFloat(data.main.temp) - 273.15);
                const icon = data.weather[0].icon;
                let iconSrc = `http://openweathermap.org/img/wn/${icon}.png`;

                document.querySelector('#description').innerHTML = data.weather[0].description;
                document.querySelector('#temperature').innerHTML = celsius + '&deg;';
                document.querySelector('#location').innerHTML = data.name;
                document.querySelector('#icon').innerHTML = `<img src = ${iconSrc}>`;

                if (description.indexOf('rain') > 0) {
                    document.getElementById('weather-description').className = 'rainy';
                } else if (description.indexOf('cloud') > 0) {
                    document.getElementById('weather-description').className = 'cloudy';
                } else if (description.indexOf('sunny') > 0) {
                    document.getElementById('weather-description').className = 'sunny';
                } else if (description.indexOf('clear') > 0) {
                    document.getElementById('weather-description').className = 'clear';
                }
            })
            .catch(err => {
                // catch any errors
                // console.log('There is an error with your request.');
                // console.log(err);
            });

}
getTiles();

let searchResultLayer = L.layerGroup();
window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#search-btn').addEventListener('click', async () => {
        
        let query = document.querySelector('#search-box').value;
        let center = map.getBounds().getCenter();
        let response = await search(center.lat, center.lng, query);
        // console.log(response);
        let searchMarkers = [];

        searchResultLayer.clearLayers();

        let searchResults = document.querySelector('#search-results');

        for (let eachVenue of response.response.venues) {
            let marker = L.marker([eachVenue.location.lat, eachVenue.location.lng]);
            marker.bindPopup(`<div><h1>${eachVenue.name}</h1></div>`);
            marker.addTo(searchResultLayer);
            searchMarkers.push(marker);

            let resultElement = document.createElement('div');
            resultElement.innerHTML = eachVenue.name;

            searchResults.appendChild(resultElement);

            resultElement.addEventListener('click', () => {
                map.flyTo([eachVenue.location.lat, eachVenue.location.lng], 16);
                marker.openPopup();
            })
        }
        if (!map.hasLayer(searchResultLayer)) {
            map.addLayer(searchResultLayer);
        }
    })
})
    



