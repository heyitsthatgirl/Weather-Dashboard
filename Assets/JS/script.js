// API key created for OpenWeather
var APIKey = "c782320bee57f5259773bc1678ef4852";
// variable created to access city

// create a query URL

// var geocodeURL = "api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + APIKey;

var cityDiv = document.getElementById('displayCity');
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
    var weather = data;
    // grabs the current temps from the weather data
    console.log("current weather: ", weather.list[0].main);
    console.log("temperature in Kelvin: ", weather.list[0].main.temp);
    var now = weather.list[0].main.temp;
    // converts Kelvin into Farenheit and adds degree symbol
    var nowFar = Math.floor(((now-273.15)*1.8)+32) + "\xB0";
    var temp = document.createElement("h1");
    temp.innerHTML = nowFar;
    cityDiv.appendChild(temp);
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
