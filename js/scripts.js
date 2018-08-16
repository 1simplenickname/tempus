let currentTemperature = "";

let gradingSetting = localStorage.getItem("gradingSetting");
let currentIcon = localStorage.getItem("currentIcon");

window.onload = function() {

    weatherette();

};

function toggleVisibility(target, state) {

    document.getElementById(target).style.visibility = state;

}

function weatherette() {

    let apiKey = "7d4a8b76ab3a113b2bb79af067b79eeb";
    let url = "https://api.forecast.io/forecast/";

    let body = document.body;
    let temperature = document.getElementById("temperature");

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

    toggleVisibility("locating", "visible");
    temperature.innerHTML = "Locating...";

    if (aboutClose.style.visibility !== "visible") {

        navigator.geolocation.watchPosition(showPosition);

    } else {



    }

    function showPosition(position) {

        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        let generated_url = url + apiKey + "/" + latitude + "," + longitude + "?exclude=minutely,hourly,daily,alerts,flags&callback=?";

        $.getJSON(generated_url, function(data) {

            localStorage.setItem("currentIcon", data.currently.icon);

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

            body.classList.add("fade-able");

        });

    }

    return currentTemperature;

}

function toggleAbout() {

    let about = document.getElementById("about");
    let aboutClose = document.getElementById("aboutClose");

    if (about.style.visibility !== "hidden") {

        toggleVisibility("about", "hidden");
        toggleVisibility("aboutClose", "visible");
        document.getElementById(currentIcon).style.visibility = "hidden";
        toggleVisibility("temperature", "hidden");

    } else if (aboutClose.style.visibility !== "hidden") {

        toggleVisibility("aboutClose", "hidden");
        toggleVisibility("about", "visible");
        document.getElementById(currentIcon).style.visibility = "visible";
        toggleVisibility("temperature", "visible");

    }

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
    let about = document.getElementById("about");
    let aboutClose = document.getElementById("aboutClose");

    text[0].classList.remove("steelblue");
    text[0].classList.remove("gold");
    text[0].classList.remove("slateblue");
    text[0].classList.remove("dodgerblue");
    text[0].classList.remove("snow");
    text[0].classList.remove("gainsboro");

    about.classList.remove("steelblue");
    about.classList.remove("gold");
    about.classList.remove("slateblue");
    about.classList.remove("dodgerblue");
    about.classList.remove("snow");
    about.classList.remove("gainsboro");

    aboutClose.classList.remove("steelblue");
    aboutClose.classList.remove("gold");
    aboutClose.classList.remove("slateblue");
    aboutClose.classList.remove("dodgerblue");
    aboutClose.classList.remove("snow");
    aboutClose.classList.remove("gainsboro");

    if (weather === "clear-day") {

        toggleVisibility("clear-day", "visible");
        text[0].classList.add("gold");
        about.classList.add("gold");
        aboutClose.classList.add("gold");

    } else if (weather === "clear-night") {

        toggleVisibility("clear-night", "visible");
        text[0].classList.add("slateblue");
        about.classList.add("slateblue");
        aboutClose.classList.add("slateblue");

    } else if (weather === "rain") {

        toggleVisibility("rain", "visible");
        text[0].classList.add("dodgerblue");
        about.classList.add("dodgerblue");
        aboutClose.classList.add("dodgerblue");

    } else if (weather === "snow" || weather === "sleet" || weather === "hail") {

        toggleVisibility("snow", "visible");
        text[0].classList.add("snow");
        about.classList.add("snow");
        aboutClose.classList.add("snow");

    } else if (weather === "cloudy") {

        toggleVisibility("cloudy", "visible");
        text[0].classList.add("gainsboro");
        about.classList.add("gainsboro");
        aboutClose.classList.add("gainsboro");

    } else if (weather === "partly-cloudy-day") {

        toggleVisibility("cloudy", "visible");
        toggleVisibility("partly-cloudy-day", "visible");
        text[0].classList.add("gold");
        about.classList.add("gold");
        aboutClose.classList.add("gold");

    } else if (weather === "partly-cloudy-night") {

        toggleVisibility("cloudy", "visible");
        toggleVisibility("partly-cloudy-night", "visible");
        text[0].classList.add("slateblue");
        about.classList.add("slateblue");
        aboutClose.classList.add("slateblue");

    } else if (weather === "thunderstorm") {

        toggleVisibility("thunderstorm", "visible");
        text[0].classList.add("gold");
        about.classList.add("gold");
        aboutClose.classList.add("gold");

    }

}


function pageHotness(temperature) {

    let body = document.body;

    let time = new Date();
    let hours = time.getHours();

    let footer = document.getElementById("footer");
    let darkSky = document.getElementsByClassName("darkSky");

    if (hours >= 21 || hours <= 6) {

        body.style.backgroundColor = "indigo";
        footer.style.color = "white";
        darkSky[0].classList.add("darkSkyNight");
        darkSky[1].classList.add("darkSkyNight");
        darkSky[2].classList.add("darkSkyNight");

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

