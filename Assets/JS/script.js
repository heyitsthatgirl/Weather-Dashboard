// API key created for OpenWeather
var APIKey = "c782320bee57f5259773bc1678ef4852";

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
        // Displays the name of the city
        var heading = document.createElement("h1");
        heading.innerHTML = cityName + "  " + dayjs().format("M/DD/YYYY");
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
    displayFuture(data);
  }

  function displayFuture(data){
    var future1 = document.getElementById("future1");
    var future2 = document.getElementById("future2");
    var future3 = document.getElementById("future3");
    var future4 = document.getElementById("future4");
    var future5 = document.getElementById("future5");

    var date1 = document.createElement("h2");
    var date2 = document.createElement("h2");
    var date3 = document.createElement("h2");
    var date4 = document.createElement("h2");
    var date5 = document.createElement("h2");

    var icon1El = document.createElement("img");
    var icon2El = document.createElement("img");
    var icon3El = document.createElement("img");
    var icon4El = document.createElement("img");
    var icon5El = document.createElement("img");

    var temp1 = document.createElement("p");
    var temp2 = document.createElement("p");
    var temp3 = document.createElement("p");
    var temp4 = document.createElement("p");
    var temp5 = document.createElement("p");

    var wind1 = document.createElement("p");
    var wind2 = document.createElement("p");
    var wind3 = document.createElement("p");
    var wind4= document.createElement("p");
    var wind5 = document.createElement("p");

    var humid1 = document.createElement("p");
    var humid2 = document.createElement("p");
    var humid3 = document.createElement("p");
    var humid4 = document.createElement("p");
    var humid5 = document.createElement("p");

    var icon1 = data.list[7].weather[0].icon;
    var icon2 = data.list[15].weather[0].icon;
    var icon3 = data.list[23].weather[0].icon;
    var icon4 = data.list[31].weather[0].icon;
    var icon5 = data.list[39].weather[0].icon;

    date1.textContent = dayjs().add(1, 'day').format("M/DD/YYYY");
    date2.textContent = dayjs().add(2, 'day').format("M/DD/YYYY");
    date3.textContent = dayjs().add(3, 'day').format("M/DD/YYYY");
    date4.textContent = dayjs().add(4, 'day').format("M/DD/YYYY");
    date5.textContent = dayjs().add(5, 'day').format("M/DD/YYYY");

    icon1El.src = "https://openweathermap.org/img/wn/" + icon1 + ".png";
    icon2El.src = "https://openweathermap.org/img/wn/" + icon2 + ".png";
    icon3El.src = "https://openweathermap.org/img/wn/" + icon3 + ".png";
    icon4El.src = "https://openweathermap.org/img/wn/" + icon4 + ".png";
    icon5El.src = "https://openweathermap.org/img/wn/" + icon5 + ".png";

    temp1.textContent = "Temp: " + Math.floor((data.list[7].main.temp - 273.15) * 1.8 + 32) + "\xB0" + "F";
    temp2.textContent = "Temp: " + Math.floor((data.list[15].main.temp - 273.15) * 1.8 + 32) + "\xB0" + "F";
    temp3.textContent = "Temp: " + Math.floor((data.list[23].main.temp - 273.15) * 1.8 + 32) + "\xB0" + "F";
    temp4.textContent = "Temp: " + Math.floor((data.list[31].main.temp - 273.15) * 1.8 + 32) + "\xB0" + "F";
    temp5.textContent = "Temp: " + Math.floor((data.list[39].main.temp - 273.15) * 1.8 + 32) + "\xB0" + "F";

    wind1.textContent = "Wind Speed: " + data.list[7].wind.speed + "mph";
    wind2.textContent = "Wind Speed: " + data.list[15].wind.speed + "mph";
    wind3.textContent = "Wind Speed: " + data.list[23].wind.speed + "mph";
    wind4.textContent = "Wind Speed: " + data.list[31].wind.speed + "mph";
    wind5.textContent = "Wind Speed: " + data.list[39].wind.speed + "mph";

    humid1.textContent = "Humidity: " + data.list[7].main.humidity + "%";
    humid2.textContent = "Humidity: " + data.list[15].main.humidity + "%"; 
    humid3.textContent = "Humidity: " + data.list[23].main.humidity + "%"; 
    humid4.textContent = "Humidity: " + data.list[31].main.humidity + "%"; 
    humid5.textContent = "Humidity: " + data.list[39].main.humidity + "%";  

    
    future1.append(date1, icon1El, temp1, wind1, humid1);
    future2.append(date2, icon2El, temp2, wind2, humid2);
    future3.append(date3, icon3El, temp3, wind3, humid3);
    future4.append(date4, icon4El, temp4, wind4, humid4);
    future5.append(date5, icon5El, temp5, wind5, humid5);

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