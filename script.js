// Weather App JavaScript

class WeatherApp {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.showInitialState();
    }

    bindEvents() {
        const searchBtn = document.getElementById('searchBtn');
        const locationInput = document.getElementById('locationInput');

        // Search button click event
        searchBtn.addEventListener('click', () => {
            this.searchWeather();
        });

        // Enter key press event for input field
        locationInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchWeather();
            }
        });

        // Input focus event
        locationInput.addEventListener('focus', () => {
            locationInput.style.borderColor = '#4a90e2';
        });

        locationInput.addEventListener('blur', () => {
            locationInput.style.borderColor = '';
        });
    }

    showInitialState() {
        this.hideElement('weatherDisplay');
        this.hideElement('loadingSpinner');
        this.hideElement('errorMessage');
    }

    async searchWeather() {
        const locationInput = document.getElementById('locationInput');
        const location = locationInput.value.trim();

        if (!location) {
            this.showError('Please enter a location to search for weather data.');
            locationInput.focus();
            return;
        }

        this.showLoading();
        this.hideElement('errorMessage');
        this.hideElement('weatherDisplay');

        try {
            // Replace this with your actual API call
            const weatherData = await this.fetchWeatherData(location);
            this.displayWeatherData(weatherData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            this.showError('Failed to fetch weather data. Please check the location and try again.');
        } finally {
            this.hideElement('loadingSpinner');
        }
    }

    async fetchWeatherData(location) {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=1f0aa4fc0f98459881785945243011&q=${encodeURIComponent(location)}&aqi=no`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
        
    }

    displayWeatherData(data) {
        const { location, current } = data;

        // Update location information
        document.querySelector('.location-name').textContent = location.name;
        document.querySelector('.location-details').textContent = 
            `${location.region}, ${location.country}`;
        document.querySelector('.last-updated').textContent = 
            `Last updated: ${current.last_updated}`;

        // Update main weather info
        document.querySelector('.weather-icon').src = `https:${current.condition.icon}`;
        document.querySelector('.weather-icon').alt = current.condition.text;
        document.querySelector('.temperature').textContent = `${Math.round(current.temp_c)}°C`;
        document.querySelector('.condition').textContent = current.condition.text;
        document.querySelector('.feels-like-temp').textContent = `${Math.round(current.feelslike_c)}°C`;

        // Update weather stats
        document.querySelector('.visibility').textContent = `${current.vis_km} km`;
        document.querySelector('.humidity').textContent = `${current.humidity}%`;
        document.querySelector('.wind').textContent = 
            `${current.wind_kph} km/h ${current.wind_dir}`;
        document.querySelector('.pressure').textContent = `${current.pressure_mb} mb`;

        // Update additional weather cards
        document.querySelector('.uv-index').textContent = current.uv;
        document.querySelector('.cloud-cover').textContent = `${current.cloud}%`;
        document.querySelector('.precipitation').textContent = `${current.precip_mm} mm`;
        document.querySelector('.dewpoint').textContent = `${Math.round(current.dewpoint_c)}°C`;

        // Show weather display with animation
        this.showElement('weatherDisplay');
        this.addFadeInAnimation();
    }

    showLoading() {
        this.showElement('loadingSpinner');
    }

    showError(message) {
        document.getElementById('errorText').textContent = message;
        this.showElement('errorMessage');
    }

    showElement(elementId) {
        const element = document.getElementById(elementId);
        element.classList.remove('d-none');
    }

    hideElement(elementId) {
        const element = document.getElementById(elementId);
        element.classList.add('d-none');
    }

    addFadeInAnimation() {
        const weatherDisplay = document.getElementById('weatherDisplay');
        weatherDisplay.style.animation = 'none';
        weatherDisplay.offsetHeight; // Trigger reflow
        weatherDisplay.style.animation = 'fadeInUp 0.6s ease-out';
    }

    // Utility method to get weather condition class for styling
    getWeatherConditionClass(condition) {
        const conditionLower = condition.toLowerCase();
        
        if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
            return 'sunny';
        } else if (conditionLower.includes('cloud')) {
            return 'cloudy';
        } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
            return 'rainy';
        } else if (conditionLower.includes('snow')) {
            return 'snowy';
        } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
            return 'stormy';
        }
        
        return 'default';
    }

    // Utility method to format temperature
    formatTemperature(temp, unit = 'C') {
        return `${Math.round(temp)}°${unit}`;
    }

    // Utility method to format wind information
    formatWind(speed, direction, unit = 'km/h') {
        return `${speed} ${unit} ${direction}`;
    }
}

// Temperature conversion utilities
const TemperatureConverter = {
    celsiusToFahrenheit: (celsius) => {
        return (celsius * 9/5) + 32;
    },
    
    fahrenheitToCelsius: (fahrenheit) => {
        return (fahrenheit - 32) * 5/9;
    },
    
    format: (temp, unit = 'C') => {
        return `${Math.round(temp)}°${unit}`;
    }
};

// Initialize the weather app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
    
    // Add some interactive features
    addInteractiveFeatures();
});

function addInteractiveFeatures() {
    // Add hover effects to weather cards
    const weatherCards = document.querySelectorAll('.weather-card');
    weatherCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effect to search button
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('mousedown', () => {
        searchBtn.style.transform = 'scale(0.98)';
    });
    
    searchBtn.addEventListener('mouseup', () => {
        searchBtn.style.transform = 'scale(1)';
    });
}

// Example of how to integrate with a real weather API
/*
class RealWeatherAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.weatherapi.com/v1/current.json';
    }

    async getCurrentWeather(location) {
        try {
            const response = await fetch(
                `${this.baseUrl}?key=${this.apiKey}&q=${encodeURIComponent(location)}&aqi=no`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}

// Usage:
// const weatherAPI = new RealWeatherAPI('YOUR_API_KEY_HERE');
// Replace the fetchWeatherData method in WeatherApp class with:
// return await weatherAPI.getCurrentWeather(location);
*/
