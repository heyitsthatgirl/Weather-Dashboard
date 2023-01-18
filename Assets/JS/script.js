// API key created for OpenWeather
let APIKey = "c782320bee57f5259773bc1678ef4852";

let cityDiv = document.getElementById("displayCity");
let heading = document.getElementById("cityName");
let inputBox = document.getElementById("city");
let city = " ";
let searchedEl = document.getElementById("recentlySearched");
let clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clearSearched);

// target search button
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", callAPI);

if (localStorage.getItem("recently searched: ") === null) {
  localStorage.setItem("recently searched: ", "[]");
}

let recentlySearched = JSON.parse(localStorage.getItem("recently searched: "));

setButtons();
function setButtons() {
  for (let i = 0; i < recentlySearched.length; i++) {
    let cityBtn = document.createElement("button");
    cityBtn.setAttribute("class", "cityBtn");
    cityBtn.textContent = recentlySearched[i];
    searchedEl.appendChild(cityBtn);
    cityBtn.addEventListener("click", recallAPI);

    function recallAPI() {
      city = cityBtn.textContent;

      // gets the latitude and longitude of city
      let geocodeURL =
        "https://api.openweathermap.org/geo/1.0/direct?q=" +
        city +
        "&limit=1&appid=" +
        APIKey;

      fetch(geocodeURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log("city selected: ", data[0].name);
          heading.innerHTML = data[0].name + "  " + dayjs().format("M/DD/YYYY");
          getLocation(data);
        });
    }
  }
}

function callAPI() {
  city = inputBox.value;

  if(!city){
    alert("Please enter a valid city");
  }
  else{

  makeNewBtn(city);

  // gets the latitude and longitude of city
  let geocodeURL =
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
        let cityName = data[0].name;
        console.log(cityName);
        // Displays the name of the city
        heading.innerHTML = cityName + "  " + dayjs().format("M/DD/YYYY");
        getLocation(data);
      }
    });
  }
}
// uses the latitude and longitude to fetch current weather data
function getLocation(data) {
  inputBox.value = "";
  let cityInfo = data[0];
  lat = cityInfo.lat;
  lon = cityInfo.lon;
  console.log("latitude: ", lat, "longitude: ", lon);
  let queryURL =
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
      console.log("5-day forecast: ", data);
      displayWeather(data);
    });
}
function displayWeather(data) {
  // grabs the current weather conditions
  let icon = data.list[0].weather[0].icon;
  let now = data.list[0].main.temp;
  let wind = data.list[0].wind.speed;
  let humidity = data.list[0].main.humidity;

  // converts Kelvin into Farenheit and adds degree symbol
  let nowFar = Math.floor((now - 273.15) * 1.8 + 32) + "\xB0" + "F";

  console.log("current weather conditions: ", data.list[0].main);
  console.log("weather icon: ", icon);
  console.log("temperature in farenheit: ", nowFar);
  console.log("wind speed: ", wind);
  console.log("humidity: ", humidity);

  // creates elements to display current weather info
  let iconEl = document.getElementById("iconEl");
  let tempEl = document.getElementById("tempEl");
  let windEl = document.getElementById("windEl");
  let humidityEl = document.getElementById("humidityEl");

  iconEl.src = "https://openweathermap.org/img/wn/" + icon + ".png";
  tempEl.innerHTML = "Temp: " + nowFar;
  windEl.textContent = "Wind Speed: " + wind + "mph";
  humidityEl.textContent = "Humidity: " + humidity + "%";

  displayFuture(data);
}

function displayFuture(data) {
  let date1 = document.getElementById("date1");
  let date2 = document.getElementById("date2");
  let date3 = document.getElementById("date3");
  let date4 = document.getElementById("date4");
  let date5 = document.getElementById("date5");

  let icon1El = document.getElementById("icon1El");
  let icon2El = document.getElementById("icon2El");
  let icon3El = document.getElementById("icon3El");
  let icon4El = document.getElementById("icon4El");
  let icon5El = document.getElementById("icon5El");

  let temp1 = document.getElementById("temp1");
  let temp2 = document.getElementById("temp2");
  let temp3 = document.getElementById("temp3");
  let temp4 = document.getElementById("temp4");
  let temp5 = document.getElementById("temp5");

  let wind1 = document.getElementById("wind1");
  let wind2 = document.getElementById("wind2");
  let wind3 = document.getElementById("wind3");
  let wind4 = document.getElementById("wind4");
  let wind5 = document.getElementById("wind5");

  let humid1 = document.getElementById("humid1");
  let humid2 = document.getElementById("humid2");
  let humid3 = document.getElementById("humid3");
  let humid4 = document.getElementById("humid4");
  let humid5 = document.getElementById("humid5");

  let icon1 = data.list[7].weather[0].icon;
  let icon2 = data.list[15].weather[0].icon;
  let icon3 = data.list[23].weather[0].icon;
  let icon4 = data.list[31].weather[0].icon;
  let icon5 = data.list[39].weather[0].icon;

  date1.textContent = dayjs().add(1, "day").format("M/DD/YYYY");
  date2.textContent = dayjs().add(2, "day").format("M/DD/YYYY");
  date3.textContent = dayjs().add(3, "day").format("M/DD/YYYY");
  date4.textContent = dayjs().add(4, "day").format("M/DD/YYYY");
  date5.textContent = dayjs().add(5, "day").format("M/DD/YYYY");

  icon1El.src = "https://openweathermap.org/img/wn/" + icon1 + ".png";
  icon2El.src = "https://openweathermap.org/img/wn/" + icon2 + ".png";
  icon3El.src = "https://openweathermap.org/img/wn/" + icon3 + ".png";
  icon4El.src = "https://openweathermap.org/img/wn/" + icon4 + ".png";
  icon5El.src = "https://openweathermap.org/img/wn/" + icon5 + ".png";

  temp1.textContent =
    "Temp: " +
    Math.floor((data.list[7].main.temp - 273.15) * 1.8 + 32) +
    "\xB0" +
    "F";
  temp2.textContent =
    "Temp: " +
    Math.floor((data.list[15].main.temp - 273.15) * 1.8 + 32) +
    "\xB0" +
    "F";
  temp3.textContent =
    "Temp: " +
    Math.floor((data.list[23].main.temp - 273.15) * 1.8 + 32) +
    "\xB0" +
    "F";
  temp4.textContent =
    "Temp: " +
    Math.floor((data.list[31].main.temp - 273.15) * 1.8 + 32) +
    "\xB0" +
    "F";
  temp5.textContent =
    "Temp: " +
    Math.floor((data.list[39].main.temp - 273.15) * 1.8 + 32) +
    "\xB0" +
    "F";

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

  let weatherDisplay = document.getElementById("weatherDisplay");
  weatherDisplay.style.display = "inline-block";
}

function makeNewBtn(city) {
  // adds city to recently searched list inthe search bar
  recentlySearched.push(city);
  localStorage.setItem("recently searched: ", JSON.stringify(recentlySearched));

  //  creates a new button for the city
  let newBtn = document.createElement("button");
  newBtn.setAttribute("class", "cityBtn");
  newBtn.textContent = city;
  searchedEl.appendChild(newBtn);
  newBtn.addEventListener("click", recallAPIagain);

  searchBtn.addEventListener("click", callAPI);

  //  links the new button to a function
  function recallAPIagain() {
    city = newBtn.textContent;

    // gets the latitude and longitude of city on the button clicked
    let geocodeURL =
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
          console.log("city selected: ", data[0].name);
          heading.innerHTML = data[0].name + "  " + dayjs().format("M/DD/YYYY");
          getLocation(data);
        }
      });
  }
}

// clears the search history and reloads the page
function clearSearched() {
  localStorage.removeItem("recently searched: ");
  window.location.reload();
}
