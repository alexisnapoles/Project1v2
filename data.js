async function search(lat, lng, query) {
    let ll = lat + ',' + lng;
    let response = await axios.get('https://api.foursquare.com/v2/venues/search', {
        params: {
            'll': ll,  
            'query': query,
            'client_id': clientId,
            'client_secret': clientSecret,
            'v': 20211215
        }
    })
    return response.data;
}