// API key created for OpenWeather
var APIKey = "c782320bee57f5259773bc1678ef4852";
// variable created to access city

// create a query URL

// var geocodeURL = "api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + APIKey;

// target search button
var searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", callAPI);
function callAPI(){
    var inputBox = document.getElementById("city");
    var city = inputBox.value;
    
// gets the latitude and longitude of city
var geocodeURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;
fetch(geocodeURL)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (i = 0; i < data.length; i++){  
        console.log(data[0]);  
        getLocation(data);   
    }
  })

  function getLocation(data){
    var cityInfo = data[0];
        lat = cityInfo.lat;
        lon = cityInfo.lon; 
        console.log("latitude: " + lat, "longitude: " + lon); 
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=c782320bee57f5259773bc1678ef4852";
    fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
  }
}

//   function displayData(data){
//     var cityInfo = data[0];
//     var cityDiv = document.getElementById('displayCity');
//     var cityName = cityInfo.name;
//     var heading = document.createElement("h1");
//     heading.innerHTML = cityName;
//     cityDiv.appendChild(heading);
//   }