// API key created for OpenWeather
var APIKey = "c782320bee57f5259773bc1678ef4852";
// variable created to access city

// create a query URL

// var geocodeURL = "api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + APIKey;

var cityDiv = document.getElementById("displayCity");
// target search button
var searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", callAPI);
function callAPI() {
  var inputBox = document.getElementById("city");
  var city = inputBox.value;

  // gets the latitude and longitude of city
  var geocodeURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=1&appid=" +
    APIKey;
  fetch(geocodeURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (i = 0; i < data.length; i++) {
        console.log("city selected: ", data[0]);
        var cityInfo = data[0];
        var cityName = cityInfo.name;
        console.log(cityName);
        var heading = document.createElement("h1");
        heading.innerHTML = cityName;
        cityDiv.appendChild(heading);
        getLocation(data);
      }
    });
  // uses the latitude and longitude to fetch current weather data
  function getLocation(data) {
    var cityInfo = data[0];
    lat = cityInfo.lat;
    lon = cityInfo.lon;
    console.log("latitude: ", lat, "longitude: ", lon);
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=c782320bee57f5259773bc1678ef4852";
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log("forecasts: ", data);
        displayWeather(data);
      });
  }

  function displayWeather(data) {
    // gets icon and displays
    var icon = data.list[0].weather[0].icon;
    console.log("weather icon: ", icon);
    var iconEl = document.createElement("img");
    iconEl.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    cityDiv.appendChild(iconEl);
    // grabs the current temps from the weather data
    console.log("current weather: ", data.list[0].main);
    console.log("temperature in Kelvin: ", data.list[0].main.temp);
    // console.log("min temp: ", data.list[0].main.temp_min);
    // console.log("max temp: ", data.list[0].main.temp_max);
    var now = data.list[0].main.temp;
    // converts Kelvin into Farenheit and adds degree symbol
    var nowFar = Math.floor((now - 273.15) * 1.8 + 32) + "\xB0" + "F";
    // display for current temp
    var temp = document.createElement("p");
    temp.innerHTML = nowFar;
    console.log("temperature in farenheit: ", nowFar);
    cityDiv.appendChild(temp);
    // get wind speed and display
    var wind = data.list[0].wind.speed
    console.log("wind speed: ", wind);
    var windEl = document.createElement("p");
    windEl.textContent = wind + "mph";
    cityDiv.appendChild(windEl);
    // get humidity and display
    var humidity = data.list[0].main.humidity;
    console.log("humidity: ", humidity);
    var humidityEl = document.createElement("p");
    humidityEl.textContent = humidity + "%";
    cityDiv.appendChild(humidityEl);
  }
}
// need to display city name, date and icon representing current weather conditions
// need to display 5 day forecast including temps, humidity, and wind speed
// will need to isolate each of the desired data and see how it shows up when displayed

// display previously searched cities and display weather when they are clicked
// create a button and append to search area when city is searched, attached event listener
// save url to local storage and call on it when city is clicked

//   function displayData(data){
//     var cityInfo = data[0];
//     var cityDiv = document.getElementById('displayCity');
//     var cityName = cityInfo.name;
//     var heading = document.createElement("h1");
//     heading.innerHTML = cityName;
//     cityDiv.appendChild(heading);
//   }

// var geocodeURL =
//     "https://api.openweathermap.org/geo/1.0/direct?q=" +
//     city +
//     "&limit=1&appid=" +
//     APIKey;