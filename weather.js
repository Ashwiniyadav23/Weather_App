const API_KEY = '5f882717e66ccfe926bee16eccec226e';

const form = document.querySelector('#weatherForm');
const search = document.querySelector('#search');
const weather = document.querySelector('#weather');
const weatherImage = document.querySelector('#weather-image');
const temperature = document.querySelector('#temperature');
const weatherDescription = document.querySelector('#weather-description');
const errorMessage = document.querySelector('#error-message');

const weatherImages = {
    'Clear': 'https://i.pinimg.com/564x/c0/91/63/c09163fd1efb370de89a342acdbf7573.jpg',
    'Clouds': 'https://i.pinimg.com/564x/d9/cc/72/d9cc72b535a876c7d1f2c32f494f22da.jpg',
    'Rain': 'https://i.pinimg.com/564x/36/af/7f/36af7f354578e602d7f454b7a6ac3d78.jpg',
    'Snow': 'https://i.pinimg.com/originals/99/af/0c/99af0c1dbad28e95336f91caa7a14660.gif',
    'Thunderstorm': 'https://i.pinimg.com/564x/f4/aa/5b/f4aa5b1c94e79acc7508192f861c9230.jpg',
    'Drizzle': 'https://i.pinimg.com/564x/b3/5f/6f/b35f6fde1e98acfe27c2adefb3499dc7.jpg',
    'Mist': 'https://i.pinimg.com/564x/db/29/33/db29337c7d4b8bba93acf2cf81bcf091.jpg',
};

const getWeather = async (city) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        showWeather(data);
    } catch (error) {
        errorMessage.textContent = error.message;
        weatherImage.src = 'https://i.pinimg.com/564x/db/29/33/db29337c7d4b8bba93acf2cf81bcf091.jpg'; // Default image
        temperature.textContent = '';
        weatherDescription.textContent = '';
    }
};

const showWeather = (data) => {
    const weatherType = data.weather[0].main;
    weatherImage.src = weatherImages[weatherType] || 'https://i.pinimg.com/564x/db/29/33/db29337c7d4b8bba93acf2cf81bcf091.jpg';
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    errorMessage.textContent = ''; // Clear error message if weather data is found
};

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const city = search.value;
    if (city) {
        getWeather(city);
    }
});
