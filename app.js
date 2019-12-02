var weatherApp = function(options) {
  // Default Settings
  var settings = {
    api_key: null, // the only required field
    container: "#weather_app",
    fahrenheit: false
  };

  // Merge any user options into the defaults
  var settings = Object.assign(settings, options);

  // get container
  var app = document.querySelector(settings.container);

  // Don't run if no API key was provided
  if (!settings.api_key) {
    console.warn("Please provide an API key");
    return;
  }

  // Call the location API
  fetch("https://ipapi.co/json")
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function(data) {
      displayLocation(data);

      // Fetch another API
      return fetch("https://api.weatherbit.io/v2.0/current?lat=" + data.latitude + "&lon=" + data.longitude + "&key=" + settings.api_key);
    })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function(weather) {
      console.log(weather);
      displayWeather(weather.data[0]);
    })
    .catch(function(error) {
      console.warn(error);
      displayError();
    });

  function displayError() {
    app.innerHTML = "<p>Sorry, unable to get weather at this time. Please try again later.</p>";
  }

  function displayLocation(data) {
    if (!data.city || !data.region_code) {
      displayError();
      return;
    }

    app.innerHTML = `<h2>Today in ${data.city}, ${data.region_code}:</h2>`;
  }

  function displayWeather(data) {
    var temperature;
    if (settings.fahrenheit) {
      temperature = fToC(sanitizeHTML(data.app_temp)) + " degrees Fahrenheit";
    } else {
      temperature = sanitizeHTML(data.app_temp) + " degrees Celcius";
    }
    app.innerHTML += `
        <p><img src="https://www.weatherbit.io/static/img/icons/${sanitizeHTML(data.weather.icon)}.png"></p>
        <p>It is currently ${temperature} and ${sanitizeHTML(data.weather.description).toLowerCase()}.</p>`;
  }

  /**
   * Sanitize and encode all HTML in a user-submitted string
   * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
   * @param  {String} str  The user-submitted string
   * @return {String} str  The sanitized string
   */
  var sanitizeHTML = function(str) {
    var temp = document.createElement("div");
    temp.textContent = str;
    return temp.innerHTML;
  };

  /**
   * Convert fahrenheit to celcius
   * @param  {String} temp The temperature in celcius
   * @return {Number}      The temperature in fahrenheit
   */
  var fToC = function(temp) {
    return (parseFloat(temp) * 9) / 5 + 32;
  };
};

// Initializing the app w/ default settings
weatherApp({ api_key: "ee99bb35b27c489fa8f5c68553c56aef" });
// weatherApp();
