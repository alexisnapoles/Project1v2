window.addEventListener('load', () => {

    CLIENT_ID = zCfrYllISK6ZDa81GnpVS;
    CLIENT_SECRET = t1UBi1U14GtUd40ixzqOtLO8uJkJaPD3hhH9e8N5;

    const aeris = new AerisWeather('[CLIENT_ID]', '[CLIENT_SECRET]');

    const request = aeris.api()
        .endpoint('conditions')
        .place(':auto')
        .format('json')
        .plimit(1)
        .filter(1min);
    request.get().then((result) => {
        console.log(result);
    });
});


// fetch('https://api.aerisapi.com/conditions/:auto?format=json&plimit=1&filter=1min&client_id=[CLIENT_ID]&client_secret=[CLIENT_SECRET]')
//     .then((response) => {
//         return response.json();
//     })
//     .then((json) => {
//         if (!json.success) {
//             console.log('Oh no!');
//         } else {
//             console.log(json);
//         }
//     })
//     .catch((error) => {
//         console.log('Oh no!');
//     });