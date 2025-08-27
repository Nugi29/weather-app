# Weather App

A responsive, animated weather application that lets users search for current weather conditions by city name. It leverages the public WeatherAPI service to display real‑time atmospheric data with a polished UI built using Bootstrap 5, custom CSS, and Font Awesome icons.

## Features

- City search with Enter key or button trigger
- Loading spinner and error handling states
- Current conditions: temperature, feels like, condition text & icon
- Key metrics: visibility, humidity, wind speed/direction, pressure
- Extra metrics: UV index, cloud cover, precipitation, dew point
- Animated UI elements (cards, stats, icons, transitions)
- Responsive design (desktop → mobile)
- Utility temperature/wind formatting helpers

## Tech Stack

- HTML5 semantic structure
- CSS3 (custom design system, gradients, animations, responsive breakpoints)
- JavaScript (ES6 classes & modular methods)
- Bootstrap 5 (layout & base components via CDN)
- Font Awesome 6 icons (CDN)
- WeatherAPI (<https://www.weatherapi.com/>) for live data

## Project Structure

```text
index.html   # Markup & layout
styles.css   # Custom theming, animations, responsive rules
script.js    # WeatherApp class, API fetch, DOM updates, utilities
README.md    # Project documentation
```

## How It Works (Flow)

1. User enters a city and clicks Search (or presses Enter).
2. `searchWeather()` validates input, shows loading UI.
3. `fetchWeatherData()` calls WeatherAPI Current endpoint.
4. On success, `displayWeatherData()` maps JSON to UI elements.
5. On failure, an error alert is shown.

## API Usage

Current implementation calls:

```http
GET https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=CITY&aqi=no
```

Replace `YOUR_API_KEY` with a valid WeatherAPI key (free tier available). The repository version currently hard‑codes a key in `script.js`; for security you should:

- Remove the committed key.
- Store it in an environment variable at build time OR
- Prompt the user to input it OR
- Load from a separate `config.js` that is `.gitignore`d.

## Quick Start

1. Clone or download the project folder.
2. Open `index.html` directly in a modern browser (no build step required).
3. Enter a city name (e.g., London, New York, Colombo) and press Search.

## Customization

- Styling: Adjust theme tokens in `:root` inside `styles.css`.
- Animation: Modify keyframes (`float`, `bounce`, `fadeInUp`, etc.).
- Metrics: Extend `displayWeatherData()` to include forecast endpoints.
- Units: Add a toggle (°C/°F) using the provided `TemperatureConverter` utility.

## Responsive Design

Breakpoints tuned for ≤768px and ≤576px with scaled typography, spacing, and icon sizing to preserve readability and interaction comfort.

## Browser Support

Designed for evergreen browsers (Chrome, Edge, Firefox, Safari). Legacy IE is not supported.

## Performance Notes

- CDN delivery for Bootstrap & Font Awesome reduces initial setup.
- Minimal JavaScript bundle (single `script.js`) for quick load.
- Consider adding `defer` to the script tag for non‑blocking parsing if you inline the JS file locally.

## Accessibility (Current State)

- Descriptive text for icons via alt attributes
- Clear focus states can be further improved (todo)
- Color contrast largely meets WCAG AA (verify with tooling)

## Disclaimer

Weather data accuracy depends on the upstream provider (WeatherAPI). Always verify critical decisions with multiple sources.

## 📝 License

This project is open source and available for educational purposes. Feel free to use, modify, and distribute as needed.


## Author

⭐️ From [Nugi29](https://github.com/Nugi29)
