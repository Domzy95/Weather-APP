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
  //*DISPLAY ERROR MESSAGE
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
  } else {
    let data = await response.json();
    console.log(data);

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
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }
  }
}

//*KO KLIKNEŠ SEARCH BUTTON IZVEDE FUNKCIJO CHECKWEATHER ZA DOLOČENO MESTO KI GA VPIŠEŠ
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

//* Function to get weather based on current location
/* When the page loads, the getWeatherByLocation() function is called. This function is responsible for obtaining the user's current location.
The getCurrentLocation() function is called within getWeatherByLocation(). This function utilizes the navigator.geolocation.getCurrentPosition() 
method to retrieve the current position asynchronously.
If the user grants permission for location access, the browser provides the latitude and longitude coordinates through the getCurrentPosition()
 function's success callback.
These coordinates are then passed to the OpenWeatherMap API to fetch the weather data for the user's current location.
If the user denies permission or if there's any error in retrieving the location, an error message is logged to the console, and the user can manually 
search for a location using the input box.
So, in summary, the code uses the Geolocation API provided by the browser to obtain the user's current location coordinates.*/
async function getWeatherByLocation() {
  try {
    const position = await getCurrentLocation();
    const { latitude, longitude } = position.coords;
    const response = await fetch(
      `${apiUrl}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    );
    const data = await response.json();
    checkWeather(data.name);
  } catch (error) {
    console.error("Error getting location:", error);
  }
}

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

//* Call getWeatherByLocation when the page loads
window.addEventListener("load", getWeatherByLocation);

//*time clock
function time() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  document.querySelector(".time").innerText = `${hours}:${minutes}`;
}
time();
setInterval(date, 100);
//* DATE
function date() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  document.querySelector(".date").innerText = `${day}.${month}.${year}`;
}
