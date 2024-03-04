//*API KEY AND URL*/
const apiKey = "91a485739d049e94c54897fe3b796736";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//*DOM ELEMENTS
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

//*ASYNC FNC TO CALL API TO GET RESPONSE
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  let data = await response.json();

  //*DOM ELEMENTS*/
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + " °C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  //*WEATHER IMAGES DISPLAY*/
  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
  }
}

//*KO KLIKNEŠ SEARCH BUTTON IZVEDE FUNKCIJO CHECKWEATHER ZA DOLOČENO MESTO KI GA VPIŠEŠ
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
