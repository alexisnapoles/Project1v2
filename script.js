mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const locationElement = document.querySelector('[data-location]')
const temperatureElement = document.querySelector('[data-temperature]')
const cloudCoverElement = document.querySelector('[data-cloud-cover]')
const statusElement = document.querySelector('[data-status]')

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
})

function successLocation(position) {
    setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
    setupMap([14.5546336, 121.015680])
}

function setupMap(center) {
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [121.015680, 14.5546336], // starting position [lng, lat]
    zoom: 9 // starting zoom
    })

    const nav = new mapboxgl.NavigationControl()
    map.addControl(nav)

    const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
    })

    map.addControl(directions, "top-left")
    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        })
    );
}