
const API_KEY = "d502936e2ac0b9539ba9eeb9483a1d6c";

const latitude = 32.3513;
const longitude = -95.3011;

const currentWeatherURL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`;


async function getWeather() {
    try {
        // Get current weather
        const currentResponse = await fetch(currentWeatherURL);

        if (!currentResponse.ok) {
            throw new Error("Unable to retrieve current weather.");
        }

        const currentData = await currentResponse.json();

        displayCurrentWeather(currentData);


        // Get 5-day forecast
        const forecastResponse = await fetch(forecastURL);

        if (!forecastResponse.ok) {
            throw new Error("Unable to retrieve weather forecast.");
        }

        const forecastData = await forecastResponse.json();

        displayForecast(forecastData);

    } catch (error) {
        console.error("Weather error:", error);

        document.querySelector("#current-temp").textContent = "--";

        document.querySelector("#weather-description").textContent =
            "Weather data unavailable.";

        document.querySelector("#forecast-day-1").textContent =
            "Unavailable";

        document.querySelector("#forecast-day-2").textContent =
            "Unavailable";

        document.querySelector("#forecast-day-3").textContent =
            "Unavailable";

        document.querySelector("#forecast-temp-1").textContent = "--";
        document.querySelector("#forecast-temp-2").textContent = "--";
        document.querySelector("#forecast-temp-3").textContent = "--";
    }
}


function displayCurrentWeather(data) {
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;

    document.querySelector("#current-temp").textContent =
        temperature;

    document.querySelector("#weather-description").textContent =
        description;
}


function displayForecast(data) {
    const today = new Date();

    const todayString = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    });

    const forecastDays = [];

    data.list.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000);

        const dateString = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric"
        });

        // Only add future calendar days.
        if (
            dateString !== todayString &&
            !forecastDays.some((day) => day.date === dateString)
        ) {
            forecastDays.push({
                date: dateString,
                timestamp: forecast.dt,
                temperature: forecast.main.temp
            });
        }
    });


    // Get the next three days.
    const threeDayForecast = forecastDays.slice(0, 3);


    threeDayForecast.forEach((day, index) => {
        const date = new Date(day.timestamp * 1000);

        const dayName = date.toLocaleDateString("en-US", {
            weekday: "long"
        });

        const temperature = Math.round(day.temperature);

        document.querySelector(
            `#forecast-day-${index + 1}`
        ).textContent = dayName;

        document.querySelector(
            `#forecast-temp-${index + 1}`
        ).textContent = temperature;
    });
}


getWeather();