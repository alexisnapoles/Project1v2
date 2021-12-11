async function search(lat, lng, query) {
    // setup search parameters
    let ll = lat + ',' + lng;
    let response = await axios.get(`http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&${query}&callback=FUNCTION_NAME`, {
        
    })
}