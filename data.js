window.onload = function () {

    /**
     * STEP 2
     * Set your account access keys when the page and scripts have loaded.
     */
    const aeris = new AerisWeather('zCfrYllISK6ZDa81GnpVS', 't1UBi1U14GtUd40ixzqOtLO8uJkJaPD3hhH9e8N5');
    /**
     * STEP 3
     * Start using the library by accessing the available convenience methods on your `AerisWeather` instance.
     */
    aeris.api().endpoint('observations').place('seattle,wa').get().then((result) => {
        const data = result.data.ob;
        document.querySelector('#status').innerHTML = `The current weather is ${data.weatherPrimary.toLowerCase()} and ${data.tempF} degrees.`;
    });

};

// jQuery(document).ready(function ($) {
//     $.ajax({
//         url: "https://api.aerisapi.com/observations/seattle,wa?client_id=zCfrYllISK6ZDa81GnpVS&client_secret=t1UBi1U14GtUd40ixzqOtLO8uJkJaPD3hhH9e8N5"
//     })
//         .done(function (json) {
//             if (json.success == true) {
//                 var ob = json.response.ob;
//                 $('#temperature').html('The current weather in Seattle is ' + ob.weather.toLowerCase() + ' with a temperature of ' + ob.tempF + '&deg;');
//             }
//             else {
//                 alert('An error occurred: ' + json.error.description);
//             }
//         });
// });
// const WeatherStackApiKey = "cf1786a6ea91cd1a6489b9179560e347";

// const forecast = (latitude, longitude, callback) => {
//     request(
//         {
//             uri: `http://api.weatherstack.com/current?access_key=${WeatherStackApiKey}&query=${latitude},${longitude}`,
//             json: true,
//         },
//         (error, response, body) => {
//             if (error) {
//                 callback("Unable to connect to weather service!", undefined);
//             } else if (body.error) {
//                 callback("Unable to find location", undefined);
//             } else {
//                 callback(undefined, {
//                     weather_description: body.current.weather_descriptions,
//                     temperature: body.current.temperature,
//                     feels_like: body.current.feelslike,
//                 });
//             }
//         }
//     );
// };
// module.exports = data;

// const forecast = (latitude, longitude, callback) => {
//     const url = `http://api.weatherstack.com/current?access_key=ce59be9657cc9859c578d95311bb1232&query=${latitude},${longitude}`;

//     request({ url, json: true }, (error, response) => {
//         if (error) {
//             callback("Unable to connect to weather service", undefined);
//         } else if (response.body.error) {
//             callback("Unable to find location", undefined);
//         } else {
//             const { temperature, feelslike, weather_descriptions } = response.body.current;
//             const data = `Current Temperature is: ${temperature} degree. Feels like ${feelslike} degree.\nWeather description: ${weather_descriptions[0]}`;
//             callback(undefined, data);
//         }
//     });
// };



// function gettingJSON() {
//     console.log("jquery loaded");
//     $.getJSON("api.openweathermap.org/data/2.5/weather?lat=14.5546336&lon=121.015680&appid=ce59be9657cc9859c578d95311bb1232}", function (json) {
//         console.log(JSON.stringify(json));
//     });
// }

// map.on ('load', function () {
    // let weather = {
    //     apiKey: 'ce59be9657cc9859c578d95311bb1232',
    //     fetchWeather: function (city) {
    //         fetch(
    //             "https://api.openweathermap.org/data/2.5/weather?q=" +
    //             city +
    //             "&units=metric&appid=" +
    //             this.apiKey
    //         )
    //             .then((response) => {
    //                 if (!response.ok) {
    //                     alert("No weather found.");
    //                     throw new Error("No weather found.");
    //                 }
    //                 return response.json();
    //             })
    //             .then((data) => this.displayWeather(data));
    //     },
    //     displayWeather: function (data) {
    //         const location = data;
    //         const { temp, humidity } = data.main;
    //         const { icon, description } = data.weather[0]

    //         document.querySelector('#icon').src = "https://openweathermap.org/img/wn/" + icon + ".png";
    //         document.querySelector('#location').innerText = location;
    //         document.querySelector('#temperature').innerText = temp + '°C';
    //         document.querySelector('#status').innerText = description;
    //         document.querySelector('#humidity').innerText = humidity + '%';
    //     },
    //     search: function () {
    //         this.fetchWeather(document.querySelector('#geocoder').value);
    //     }
    // };
    // document.querySelector('#geocoder').addEventListener('keyup', function (event) {
    //     if (event.key == 'Enter') {
    //         weather.search();
    //     }
    // });

// })


