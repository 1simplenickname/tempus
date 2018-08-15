let currentTemperature = "";

window.onload = function() {

    weatherette();

};

function toggleVisibility(target, state) {
    document.getElementById(target).style.visibility = state;
}

function weatherette() {

    let apiKey = "7d4a8b76ab3a113b2bb79af067b79eeb";
    let url = "https://api.forecast.io/forecast/";
	let generated_url = "";

    let temperature = document.getElementById("temperature");
    let minutely = document.getElementById("minutely");
    let location = document.getElementById("location");

    location.innerHTML = "Locating...";

    navigator.geolocation.getCurrentPosition(showPosition);

    function showPosition(position) {

        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        function generateURL() {

            generated_url = url + apiKey + "/" +
                            latitude + "," + longitude +
                            "?exclude=minutely,hourly,daily,alerts,flags";
            return generated_url;

        }
        generateURL();

        $.getJSON(generated_url, function(data) {

            	determineWeatherIcon(data.currently.icon);
		currentTemperature = data.currently.temperature;
        	temperature.innerHTML = currentTemperature + "° F";

        });

    }
	
    location.innerHTML = "";
    return currentTemperature;
}

function temperatureToggle() {

	if (temperature.classList.contains("fahrenheit")) {

		temperature.innerHTML = Math.round((currentTemperature - 32) / 1.8 * 100) / 100 + "° C";
		temperature.classList.remove("fahrenheit");
		temperature.classList.add("celsius");

	} else if (temperature.classList.contains("celsius")) {

		temperature.innerHTML = Math.round(((currentTemperature - 32)  / 1.8) + 273.15 * 100) / 100 + "° K";
		temperature.classList.remove("celsius");
		temperature.classList.add("kelvin");

	} else if (temperature.classList.contains("kelvin")) {

		temperature.innerHTML = currentTemperature + "° F";
		temperature.classList.remove("kelvin");
		temperature.classList.add("fahrenheit");

	}

}

function determineWeatherIcon(weather) {

    let text = document.getElementsByClassName("text");

    if (weather === "clear-day") {

        toggleVisibility("sunny", "visible");
        text[0].style.color = "gold"; 
        text[1].style.color = "gold";

    } else if (weather === "clear-night") {

        toggleVisibility("moony", "visible");
        text[0].style.color = "slateblue"; 
        text[1].style.color = "slateblue"; 

    } else if (weather === "rain") {

        toggleVisibility("rainy", "visible");
        text[0].style.color = "dodgerblue";
        text[1].style.color = "dodgerblue";

    } else if (weather === "snow" || weather === "sleet" || weather === "hail") {

        toggleVisibility("snowy", "visible");
        text[0].style.color = "snow";
        text[1].style.color = "snow";

    } else if (weather === "cloudy") {

        toggleVisibility("cloudy", "visible");
        text[0].style.color = "gainsboro";
        text[1].style.color = "gainsboro";

    } else if (weather === "partly-cloudy-day") {

        toggleVisibility("cloudy", "visible");
        toggleVisibility("cloudyDay", "visible");
        text[0].style.color = "gold";
        text.style.color = "gold";

    } else if (weather === "partly-cloudy-night") {

        toggleVisibility("cloudy", "visible");
        toggleVisibility("cloudyNight", "visible");
        text[0].style.color = "slateblue";        
        text[1].style.color = "slateblue"; 

    } else if (weather === "thunderstorm") {

        toggleVisibility("stormy", "visible");
        text[0].style.color = "gold";        
        text[1].style.color = "gold"; 

    }

}
