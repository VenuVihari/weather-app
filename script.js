async function getWeather() {
    const apiKey = 'b57ad1157d7cfac9677254bdc65180c2';
    const city = document.getElementById('city').value.trim(); // Trim whitespace from city input
    if (!city) {
        document.getElementById('weather-info').innerHTML = '<p>Please enter a city name.</p>';
        return;
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        displayWeatherInfo(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiKey = 'b57ad1157d7cfac9677254bdc65180c2';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            try {
                let response = await fetch(apiUrl);
                let data = await response.json();
                displayWeatherInfo(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        });
    } else {
        document.getElementById('weather-info').innerHTML = '<p>Geolocation is not supported by this browser.</p>';
    }
}

function displayWeatherInfo(data) {
    if (data.cod === 200) {
        const weatherInfo = `
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Description: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
        `;
        document.getElementById('weather-info').innerHTML = weatherInfo;
    } else {
        document.getElementById('weather-info').innerHTML = `<p>${data.message}</p>`;
    }
}
