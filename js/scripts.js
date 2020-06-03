let currentTemperature = "";

let gradingSetting = localStorage.getItem("gradingSetting");
let currentIcon = "";

let body = document.body;
let WorkSans = document.getElementsByClassName("WorkSans");
let aboutOpen = document.getElementById("aboutOpen");
let twitter = document.getElementById("twitter");
let facebook = document.getElementById("facebook");
let loading = document.getElementById("loading");
let aboutClose = document.getElementById("aboutClose");
let temperature = document.getElementById("temperature");
let footer = document.getElementById("footer");
let darkSky = document.getElementsByClassName("darkSky");

let apiKey = "7d4a8b76ab3a113b2bb79af067b79eeb";
let url = "https://api.forecast.io/forecast/";

function toggleVisibility(target, state) {
    var element = document.getElementById(target);
    console.log('(%s) -> (%s)', target, state);
    if (state === 'visible') {
        element.classList.remove('hidden');
    } else if (state === 'hidden') {
        element.classList.add('hidden');
    }
}

function isVisible(target) {
    var element = target;
    if (typeof target === 'string') {
        element = document.getElementById(target);
    }
    return ! element.classList.contains('hidden');
}

function changeElementColors(color) {

  loading.style.color = color;
  WorkSans[0].style.color = color;
  WorkSans[1].style.color = color;
  aboutOpen.style.color = color;
  twitter.style.color = color;;
  facebook.style.color = color;
  aboutClose.style.color = color;

}

function toggleAbout() {

    if (isVisible('aboutOpen')) {
        toggleVisibility("aboutOpen", "hidden");
        toggleVisibility("aboutContent", "visible");
        toggleVisibility("aboutClose", "visible");

        if (currentIcon === "partly-cloudy-day" || currentIcon === "partly-cloudy-night") {

            toggleVisibility(currentIcon, "hidden");
            toggleVisibility("cloudy", "hidden");

        } else if (currentIcon === "") {

            toggleVisibility("locating", "hidden");

        } else {

            toggleVisibility(currentIcon, "hidden");

        }

        toggleVisibility("temperature", "hidden");

    } else if (isVisible(aboutClose)) {

        toggleVisibility("aboutClose", "hidden");
        toggleVisibility("aboutContent", "hidden");
        toggleVisibility("aboutOpen", "visible");

        if (currentIcon === "partly-cloudy-day" || currentIcon === "partly-cloudy-night") {

            toggleVisibility(currentIcon, 'visible');
            toggleVisibility("cloudy", "visible");

        } else if (currentIcon === "") {

            toggleVisibility("locating", "visible");

        } else {

            toggleVisibility(currentIcon, 'visible');

        }

        toggleVisibility("temperature", "visible");

    }

}

function twitterOpen() {
  window.open("https://twitter.com/1simplenickname");
}

function facebookOpen() {
  window.open("https://www.facebook.com/1simplenickname");
}

function darkSkyOpen() {
  window.open("https://darksky.net/poweredby");
}

function tempus() {

    toggleVisibility("loading", "visible");

    toggleVisibility("clear-day", "hidden");
    toggleVisibility("clear-night", "hidden");
    toggleVisibility("cloudy", "hidden");
    toggleVisibility("partly-cloudy-day", "hidden");
    toggleVisibility("partly-cloudy-night", "hidden");
    toggleVisibility("rain", "hidden");
    toggleVisibility("thunderstorm", "hidden");
    toggleVisibility("snow", "hidden");

    temperature.classList.remove("fahrenheit");
    temperature.classList.remove("celsius");
    temperature.classList.remove("kelvin");

    toggleVisibility("denied", "hidden");
    toggleVisibility("locating", "visible");
    temperature.innerHTML = "Locating...";

    if (aboutClose.style.visibility !== "visible") {

        navigator.geolocation.getCurrentPosition( callDarkSky, function(error) {

            currentIcon = "denied";

            toggleVisibility("locating", "hidden");
            toggleVisibility("loading", "hidden");
            toggleVisibility("denied", "visible");

            temperature.innerHTML = "No location";

        });

    }

    function callDarkSky(position) {

        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        let generated_url = url + apiKey + "/" + latitude + "," + longitude + "?exclude=minutely,hourly,daily,alerts,flags&callback=?";

        $.getJSON(generated_url, function(data) {

            currentIcon = data.currently.icon;
            determineWeatherIcon(currentIcon);

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

            setTimeout( function() {

              toggleVisibility("loading", "hidden");

            }, 1000);

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

    if (weather === "clear-day") {

        toggleVisibility("clear-day", "visible");
        changeElementColors("gold");

    } else if (weather === "clear-night") {

        toggleVisibility("clear-night", "visible");
        changeElementColors("slateblue");

    } else if (weather === "rain") {

        toggleVisibility("rain", "visible");
        changeElementColors("dodgerblue");

    } else if (weather === "snow" || weather === "sleet" || weather === "hail") {

        toggleVisibility("snow", "visible");
        changeElementColors("snow");

    } else if (weather === "cloudy") {

        toggleVisibility("cloudy", "visible");
        changeElementColors("gainsboro");

    } else if (weather === "partly-cloudy-day") {

        toggleVisibility("cloudy", "visible");
        toggleVisibility("partly-cloudy-day", "visible");
        changeElementColors("gold");

    } else if (weather === "partly-cloudy-night") {

        toggleVisibility("cloudy", "visible");
        toggleVisibility("partly-cloudy-night", "visible");
        changeElementColors("slateblue");

    } else if (weather === "thunderstorm") {

        toggleVisibility("thunderstorm", "visible");
        changeElementColors("gold");

    }

}


function pageHotness(temperature) {

    let time = new Date();
    let hours = time.getHours();

    if (hours >= 20 || hours <= 4) {

        body.style.backgroundColor = "indigo";
        footer.style.color = "white";
        darkSky[0].style.fill = "white";
        darkSky[1].style.fill = "white";
        darkSky[2].style.fill = "white";

    } else {

        if (temperature >= 100) {

            body.style.backgroundColor = "#DC143C";

        } else if (temperature >= 85) {

            body.style.backgroundColor = "#E5382D";

        } else if (temperature >= 70) {

            body.style.backgroundColor = "#EE5D1E";

        } else if (temperature >= 60) {

            body.style.backgroundColor = "#F6810F";

        } else if (temperature >= 45) {

            body.style.backgroundColor = "#FFA500";

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
