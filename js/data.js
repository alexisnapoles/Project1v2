// ========================== API CALL ======================
const apikey = geoapifyKey;
async function getPlacesData(category){
    try{
        const placesResponse = await axios.get(`https://api.geoapify.com/v2/places?categories=${category}&conditions=named&filter=rect:120.86480892431364,14.677469503643234,121.21295129987739,14.364446305397085&limit=50&apiKey=${apikey}`);
        // console.log(placesResponse.data);
        if (placesResponse){
            hideloader();
        }
        return placesResponse.data;
    } catch (err) {
        console.log(err);
    }
}

function hideloader() {
    document.getElementById('loading').style.display = 'none';
}