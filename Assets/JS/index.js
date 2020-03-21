var weather = weather;



function getTheWeather() {
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

$("#submit").click(function() {
    preventDefault();
    // getTheWeather();
    alert("you clicked me")
})