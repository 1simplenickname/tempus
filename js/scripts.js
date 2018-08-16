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

    let body = document.body;
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
            pageHotness(currentTemperature);
            
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

            body.classList.add("fadeable");

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


function pageHotness(temperature) {

    let body = document.body;

    let time = new Date();
    let hours = time.getHours();

    let footer = document.getElementById("footer");
    let darkSkyLogo = document.getElementsByClassName("darkSky");

    if (hours >= 20 || hours <= 4) {

        body.style.backgroundColor = "indigo";
        footer.style.color = "white";
        darkSkyLogo[0].classList.add("darkSkyNight");
        darkSkyLogo[1].classList.add("darkSkyNight");
        darkSkyLogo[2].classList.add("darkSkyNight");

    } else {

        if (temperature >= 100) {

            body.style.backgroundColor = "#DC143C";

        } else if (temperature >= 85) {

            body.style.backgroundColor = "#E54F3A";

        } else if (temperature >= 70) {

            body.style.backgroundColor = "#EE8A38";

        } else if (temperature >= 60) {

            body.style.backgroundColor = "#F6C435";

        } else if (temperature >= 45) {

            body.style.backgroundColor = "#FFFF33";

        } else if (temperature >= 30) {

            body.style.backgroundColor = "#6495ED";

        } else if (temperature >= 14) {

            body.style.backgroundColor = "#4BA0F2";

        } else if (temperature >= 0) {

            body.style.backgroundColor = "#32AAF6";

        } else if (temperature <= -4) {

            body.style.backgroundColor = "#19B5FB";

        } else if (temperature <= -22) {

            body.style.backgroundColor = "#00BFFF";

        }

    }

}

