
var apikey = "22a6eb6c0d59d0b9ac34a811b19c54e6";
var previousCity = JSON.parse(localStorage.getItem("previousCity")) || 'Salt Lake City'
var searchedCityArr = JSON.parse(localStorage.getItem("searchedCityArr")) || [];

function getTheCurrentWeather() {
    //  API route, pulls city information from the user's input on the web page, then "trims" it by eliminating and spaces in front or behind of the text. Also converts units to imperial system.  //
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + $("#pickedCity").val().trim() + "&mode=JSON&units=imperial&APPID=" + apikey;
    console.log(queryURL);
    //  Allow async using 'ajax' method and 'then' method // 
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {
            // Log the resulting object
            console.log(response);

            // Transfer content to HTML
            $("#searchedCity").text(response.name);
            $('#weatherIcon').attr('src', `https://openweathermap.org/img/w/${response.weather[0].icon}.png`)
            $('#weatherIcon').attr('alt', `${response.weather[0].description}`)
            $('#weatherType').text(`${response.weather[0].description}`)
            $("#currentTemp").text("Temperature: " + Math.round(response.main.temp) + " °F");
            $("#currentHumid").text("Humidity: " + response.main.humidity + '%');
            $("#currentWind").text("Wind Speed: " + Math.round(response.wind.speed) + 'MPH');


            //UV Index API call and appending functionality
            var queryURLuv = `https://api.openweathermap.org/data/2.5/uvi/forecast?appid=` + apikey + `&lat=` + response.coord.lat + `&lon=` + response.coord.lon + `&cnt=1`

            $.ajax({
                url: queryURLuv,
                method: "GET"
            })
                .then(function (response) {
                    $('#currentUV').text("UV Index: " + response[0].value)
                    console.log(response)
                }).fail(function () {
                    alert('City not found. Try again, please!');
                });
        })
};

function getTheFutureWeather() {
    //API call for the 5 day forecast
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + $("#pickedCity").val().trim() + "&mode=JSON&units=imperial&appid=" + apikey;
    console.log(forecastURL);

    $.ajax({
        url: forecastURL,
        method: "GET"
    })
        .then(function (response) {
            //Log the resulting object
            console.log(response);
            $('#forecast').empty();
            //Transfer the content to HTML:
            for (var i=1; i<48; i+=8) {
            var column = $(`<div class="column hero is-info regap">`);
            var forecastDate = $(`<p class="displayResult"></p>`);
            var forecastIcon = $(`<img style="width: 150px; align-self: center !important;" id="forecastIcon" src="" alt="">`);
            var forecastType = $(`<p class="displayResult"></p>`);
            var forecastTemp = $(` <p class="displayResult"></p></div>`);
            

            forecastDate.text(response.list[i].dt_txt.slice(0,10));
            forecastIcon.attr('src', `https://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png`);
            forecastIcon.attr('alt', `${response.list[i].weather[0].description}`);
            forecastType.text(`${response.list[i].weather[0].description}`);
            forecastTemp.text(response.list[i].main.temp + " °F");
            console.log(forecastType)

            $('#forecast').append(column);
            column.append(forecastDate, forecastIcon, forecastType, forecastTemp)
            }

            ///////////HTML skeleton for forecast tiles
            // <div class="column hero is-info regap">
            //     <p class="displayResult">Date</p>
            //     <img style="width: 150px; align-self: center !important;" id="forecastIcon" src="" alt="">
            //         <p class="displayResult">Temp</p>
            //         <p class="displayResult">UV index</p>
            //             </div>


})};






$("#submit").click(function(event) {
    event.preventDefault();
    getTheCurrentWeather();
    getTheFutureWeather();

    var cityName = $('#pickedCity').val();
    //Create object and push to localStorage
    var cityNameJSON = {
        city: cityName
    }
    
    searchedCityArr.push(cityNameJSON);
    localStorage.setItem('searchedCityArr', JSON.stringify(searchedCityArr))
    localStorage.setItem('previousCity', JSON.stringify(cityName))
});










//////////*********This function was used initially when the JSON information was set as a variable */
// function showCurrentWeather() {
//     $("#currentWeather").empty();
//     $.each(weather, function(key, value) {
//         var current = $("<p class='info has-text-weight-semibold'></p>");
//         $("#currentWeather").append(current);
//         $("#currentWeather").append(current.text = (key + ": " + value));
//         console.log(key);
//         console.log(value);
//         console.log(current);
//     })
// }