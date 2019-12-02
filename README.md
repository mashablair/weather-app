# Local Weather App Plugin

Vanilla JS script that gets user's location and then displays local weather based on that location. 

Practicing Fetch, Promises, async JS, Weatherbit.io API, Ipapi API, sanitizing data, etc.

The plugin has default settings to display weather in Celsius. To use the plugin by default, the user needs to have get their own API key and pass it as a string to the settings object.  This API key is the only required parameter to call the app.  To get the API key, user needs to create a free account on https://www.weatherbit.io/ and get the secret key.  Also, by default, user needs to have a container div with the id of #weather_app in the HTML.  

To call the default version of the app:
weatherApp({api_key: "user_secret_api_key_string"});

If user wants to use a different container, they can pass their container's id or class like this:
weatherApp({ container: ".app" });
or 
weatherApp({ container: "#some_other_name" });
Where ".app" or "#some_other_name" is the string of either a class or id name that their container div has.  

To display weather in Fahrenheit, user needs to call the plugin like this:
weatherApp({ fahrenheit: false });


Project 8 of [Vanilla JS Academy](https://vanillajsacademy.com/)

[View Demo](https://mashablair.github.io/weather-app/)
