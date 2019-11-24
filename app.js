(function() {
  var weather_api_key = "ee99bb35b27c489fa8f5c68553c56aef";
  var current_location_json;
  var app = document.querySelector("#app");

  // Call the API
  fetch("https://ipapi.co/json")
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function(data) {
      // Store the post data to a variable
      current_location_json = data;

      displayLocation(data);

      // Fetch another API
      return fetch(
        "https://api.weatherbit.io/v2.0/current?city=" + data.city + "," + data.region_code + "&key=" + weather_api_key
      );
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
      displayWeather(weather);
    })
    .catch(function(error) {
      console.warn(error);
      displayError();
    });

    function displayError() {
        app.innerHTML = "<p>Sorry, something went wrong. Please try again later.</p>";
    }

    function displayLocation(data) {

        if (!data.city || !data.region_code) {
            displayError();
            return;
        }

        app.innerHTML = `<h2>Today in ${data.city}, ${data.region_code}:</h2>`
    }

    function displayWeather(data) {

        var weather_data = data.data[0];

        app.innerHTML += `<div>The air temperature: ${weather_data.app_temp} Celcius</div>`;
    }
})();
