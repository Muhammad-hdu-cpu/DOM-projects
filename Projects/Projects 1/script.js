const apiKey = "211e3891316656c7f8413c3f771ddc51"; 
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// Selecting elements
const searchButton = document.querySelector("button");
const searchInput = document.querySelector("input");
const tempElement = document.querySelector(".temp");
const cityElement = document.querySelector(".city");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".Wind");
const weatherIcon = document.querySelector(".weather-icon");

searchButton.addEventListener("click", () => {
  const city = searchInput.value.trim();  // Get the city name from input
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

async function getWeather(city) {
  const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;  // Fetching data in Celsius
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found!");
      return;
    }

    // Update the UI with the weather data
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { description, icon } = data.weather[0];
    const cityName = data.name;

    // Update the temp, city, humidity, wind, and icon
    tempElement.textContent = `${temp}°C`;
    cityElement.textContent = cityName;
    humidityElement.textContent = `${humidity}%`;
    windElement.textContent = `${speed} km/h`;
    weatherIcon.src = `http://openweathermap.org/img/wn/${icon}.png`;
    weatherIcon.alt = description;

  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Failed to retrieve weather data. Please try again.");
  }
}
