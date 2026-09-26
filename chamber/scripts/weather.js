const API_KEY = "f2414679bf65a4b8994efd90c03d93dd";

const latitude = 32.3513;
const longitude = -95.3011;


const currentWeatherURL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`;



async function getWeather() {
    try {
        const currentResponse = await fetch(currentWeatherURL);

        if (!currentResponse.ok) {
            throw new Error("Unable to retrieve current weather.");
        }

        const currentData = await currentResponse.json();

        displayCurrentWeather(currentData);


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

        document.querySelector("#forecast-day-1").textContent = "Unavailable";
        document.querySelector("#forecast-day-2").textContent = "Unavailable";
        document.querySelector("#forecast-day-3").textContent = "Unavailable";
    }
}


function displayCurrentWeather(data) {
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;

    document.querySelector("#current-temp").textContent = temperature;

    document.querySelector("#weather-description").textContent =
        description;
}


function displayForecast(data) {
    const forecastDays = [];

    data.list.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000);

        const dateString = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric"
        });

        if (!forecastDays.some((day) => day.date === dateString)) {
            forecastDays.push({
                date: dateString,
                timestamp: forecast.dt,
                temperature: forecast.main.temp
            });
        }
    });


    const threeDayForecast = forecastDays.slice(1, 4);


    threeDayForecast.forEach((day, index) => {
        const date = new Date(day.timestamp * 1000);

        const dayName = date.toLocaleDateString("en-US", {
            weekday: "long"
        });

        const temperature = Math.round(day.temperature);

        document.querySelector(`#forecast-day-${index + 1}`).textContent =
            dayName;

        document.querySelector(`#forecast-temp-${index + 1}`).textContent =
            temperature;
    });
}


getWeather();