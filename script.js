mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
});

function successLocation(position) {
    setupMap([position.coords.longitude, position.coords.latitude])
};


function errorLocation() {
    setupMap([121.015680, 14.5546336])
};


function setupMap(center) {
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: center, // starting position [lng, lat]
    zoom: 13 // starting zoom
    })

    const nav = new mapboxgl.NavigationControl()
    map.addControl(nav)

    const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
    })
    map.addControl(directions, "top-left")

    const geocoder = new MapboxGeocoder({
        // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        marker: true, // Do not use the default marker style
        types: 'country,region,place,postcode,locality,neighborhood,poi',
        placeholder: 'Enter Location',
        flyTo: {
            bearing: 0,
            // Control the flight curve, making it move slowly and
            // zoom out almost completely before starting to pan.
            speed: 0.2, // Make the flying slow.
            curve: 1, // Change the speed at which it zooms out.
            // This can be any easing function: it takes a number between
            // 0 and 1 and returns another number between 0 and 1.
            easing: function (t) {
                return t;
            }
        },    
    });
    document.querySelector('#geocoder').appendChild(geocoder.onAdd(map));

    map.on('load', function () {
        map.addSource('single-point', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: []
            }
        });

    geocoder.on('result', function (features){
        console.log(features.result)
        // map.getSource('single-point').setData(features.result.geometry);
        // document.querySelector('#location').innerHTML = features.result.text
    })
});
}; 

// const forecast = (latitude, longitude, callback) => {
//     const url = `http://api.weatherstack.com/current?access_key=WEATHERMAP_APIKEYd&query=${latitude},${longitude}`;

//     request({ url, json: true }, (error, response) => {
//         if (error) {
//             callback("Unable to connect to weather service", undefined);
//         } else if (response.body.error) {
//             callback("Unable to find location", undefined);
//         } else {
//             const { temperature, humidity, weather_descriptions } = response.body.current;
//             // document.querySelector('#location').innerText = temperature;
//             // document.querySelector('#status').innerText = weather_descriptions;
//             // document.querySelector('#humidity').innerText = humidity;
//             const data = `Current Temperature is: ${temperature} degree. Feels like ${feelslike} degree.\nWeather description: ${weather_descriptions[0]}`;
//             callback(undefined, data);
//         }
//     });
// };
