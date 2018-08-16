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

    toggleVisibility("sunny", "hidden");
    toggleVisibility("moony", "hidden");
    toggleVisibility("cloudy", "hidden");
    toggleVisibility("cloudyDay", "hidden");
    toggleVisibility("cloudyNight", "hidden");
    toggleVisibility("rainy", "hidden");
    toggleVisibility("stormy", "hidden");
    toggleVisibility("snowy", "hidden");

    temperature.classList.remove("fahrenheit");
    temperature.classList.remove("celsius");
    temperature.classList.remove("kelvin");

    toggleVisibility("locating", "visible");
    temperature.innerHTML = "Locating...";

    let gradingSetting = localStorage.getItem("gradingSetting");

    navigator.geolocation.watchPosition(showPosition);

    function showPosition(position) {

        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        function generateURL() {

            generated_url = url + apiKey + "/" + latitude + "," + longitude + "?exclude=minutely,hourly,daily,alerts,flags&callback=?";
            return generated_url;

        }
        generateURL();

        $.getJSON(generated_url, function(data) {

            determineWeatherIcon(data.currently.icon);

            currentTemperature = data.currently.temperature;
            
            if (gradingSetting === "C") {
                temperature.classList.add("celsius");
                temperature.innerHTML = Math.round((currentTemperature - 32) / 1.8 * 100) / 100 + "° " + gradingSetting;
            } else if (gradingSetting === "K") {
                temperature.classList.add("kelvin");
                temperature.innerHTML = Math.round(((currentTemperature - 32)  / 1.8) + 273.15 * 100) / 100 + "° " + gradingSetting;
            } else {
                temperature.classList.add("fahrenheit");
                temperature.innerHTML = currentTemperature + "° F";
            }

            toggleVisibility("locating", "hidden");

        });

    }

    return currentTemperature;
	
}

function temperatureToggle() {

	if (temperature.classList.contains("fahrenheit")) {

		temperature.innerHTML = Math.round((currentTemperature - 32) / 1.8 * 100) / 100 + "° C";
		temperature.classList.remove("fahrenheit");
		temperature.classList.add("celsius");

        localStorage.setItem("gradingSetting", "C");

	} else if (temperature.classList.contains("celsius")) {

		temperature.innerHTML = Math.round(((currentTemperature - 32)  / 1.8) + 273.15 * 100) / 100 + "° K";
		temperature.classList.remove("celsius");
		temperature.classList.add("kelvin");

        localStorage.setItem("gradingSetting", "K");

	} else if (temperature.classList.contains("kelvin")) {

		temperature.innerHTML = currentTemperature + "° F";
		temperature.classList.remove("kelvin");
		temperature.classList.add("fahrenheit");

        localStorage.setItem("gradingSetting", "F");

	}

}

function determineWeatherIcon(weather) {

    let text = document.getElementsByClassName("text");

    if (weather === "clear-day") {

        toggleVisibility("sunny", "visible");
        text[0].style.color = "gold"; 

    } else if (weather === "clear-night") {

        toggleVisibility("moony", "visible");
        text[0].style.color = "slateblue"; 

    } else if (weather === "rain") {

        toggleVisibility("rainy", "visible");
        text[0].style.color = "dodgerblue";

    } else if (weather === "snow" || weather === "sleet" || weather === "hail") {

        toggleVisibility("snowy", "visible");
        text[0].style.color = "snow";

    } else if (weather === "cloudy") {

        toggleVisibility("cloudy", "visible");
        text[0].style.color = "gainsboro";

    } else if (weather === "partly-cloudy-day") {

        toggleVisibility("cloudy", "visible");
        toggleVisibility("cloudyDay", "visible");
        text[0].style.color = "gold";

    } else if (weather === "partly-cloudy-night") {

        toggleVisibility("cloudy", "visible");
        toggleVisibility("cloudyNight", "visible");
        text[0].style.color = "slateblue";        

    } else if (weather === "thunderstorm") {

        toggleVisibility("stormy", "visible");
        text[0].style.color = "gold";        

    }

}
