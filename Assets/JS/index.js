var weather = weather;

var apikey = "22a6eb6c0d59d0b9ac34a811b19c54e6";

function getTheCurrentWeather() {
    //  API route, pulls city information from the user's input on the web page, then "trims" it by eliminating and spaces in front or behind of the text. Also converts units to imperial system.  //
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+$("#pickedCity").val().trim()+"&mode=JSON&units=imperial&APPID="+apikey;
    console.log(queryURL);
    //  Allow async using 'ajax' method and 'then' method // 
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
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
            var queryURLuv = `https://api.openweathermap.org/data/2.5/uvi/forecast?appid=`+apikey+`&lat=`+response.coord.lat+`&lon=`+response.coord.lon+`&cnt=1`

            $.ajax({
                    url: queryURLuv,
                    method: "GET"
                })
                .then(function(response) {
                    $('#currentUV').text("UV Index: " + response[0].value)
                    console.log(response)
                }).fail(function() {
                    alert('City not found. Try again, please!');
                });
            })
       
};

$("#submit").click(function(event) {
    event.preventDefault();
    getTheCurrentWeather();

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