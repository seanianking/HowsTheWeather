var weather = weather;



function getTheCurrentWeather() {
    //  API route, pulls city information from the user's input on the web page, then "trims" it by eliminating and spaces in front or behind of the text. Also converts units to imperial system.  //
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + $("#pickedCity").val().trim() + "&mode=JSON&units=imperial&APPID=22a6eb6c0d59d0b9ac34a811b19c54e6";
    console.log(queryURL);
    //  Allow async using ajax method // 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //  callback to set the returned data to a JSON object
        weather = {
            Name: response.name,
            WeatherIcon: response.weather.icon,
            WeatherDescription: response.weather[0].description,
            Temperature: response.main.temp,
            Humidity: response.main.humidity,
            Windspeed: response.wind.speed,
        }
        console.log(weather);
        //Callback function to display the weather
    })
};

$("#submit").click(function(event) {
    event.preventDefault();
    // getTheCurrentWeather();
    console.log(event)
    alert("you clicked me")
});

function showCurrentWeather() {
    $("#currentWeather").empty();
    $.each(weather, function(key, value) {
        var current = $("<p class='info'></p>");
        $("#currentWeather").append(current);
        $("#currentWeather").append(current.text = (key + " : " + value));
        console.log(key);
        console.log(value);
        console.log(current);
    })
}