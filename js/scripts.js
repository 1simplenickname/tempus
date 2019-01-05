let currentTemperature = "";

let gradingSetting = localStorage.getItem("gradingSetting");
let currentIcon = "";

let body = document.body;
let WorkSans = document.getElementsByClassName("WorkSans");
let aboutOpen = document.getElementById("aboutOpen");
let aboutClose = document.getElementById("aboutClose");
let temperature = document.getElementById("temperature");
let footer = document.getElementById("footer");
let darkSky = document.getElementsByClassName("darkSky");

function toggleVisibility(target, state) {

    document.getElementById(target).style.visibility = state;

}

function toggleAbout() {

    if (aboutOpen.style.visibility !== "hidden") {

        toggleVisibility("aboutOpen", "hidden");
        toggleVisibility("aboutContent", "visible");
        toggleVisibility("aboutClose", "visible");
        
        if (currentIcon === "partly-cloudy-day" || currentIcon === "partly-cloudy-night") {
            document.getElementById(currentIcon).style.visibility = "hidden";
            toggleVisibility("cloudy", "hidden");            
        } else if (currentIcon === "") {
            toggleVisibility("locating", "hidden");
        } else {
            document.getElementById(currentIcon).style.visibility = "hidden";
        }

        toggleVisibility("temperature", "hidden");

    } else if (aboutClose.style.visibility !== "hidden") {

        toggleVisibility("aboutClose", "hidden");
        toggleVisibility("aboutContent", "hidden");
        toggleVisibility("aboutOpen", "visible");

        if (currentIcon === "partly-cloudy-day" || currentIcon === "partly-cloudy-night") {
            document.getElementById(currentIcon).style.visibility = "visible";
            toggleVisibility("cloudy", "visible");            
        } else if (currentIcon === "") {
            toggleVisibility("locating", "visible");
        } else {
            document.getElementById(currentIcon).style.visibility = "visible";
        }

        toggleVisibility("temperature", "visible");

    }

}

function tempus() {

    let apiKey = "7d4a8b76ab3a113b2bb79af067b79eeb";
    let url = "https://api.forecast.io/forecast/";

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

        navigator.geolocation.getCurrentPosition(callDarkSky);

    } else {

        // do nothing

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

            body.classList.add("fade-able");

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
        WorkSans[0].style.color = "gold";
        WorkSans[1].style.color = "gold";
        aboutOpen.style.color = "gold";
        aboutClose.style.color = "gold";

    } else if (weather === "clear-night") {

        toggleVisibility("clear-night", "visible");
        WorkSans[0].style.color = "slateblue";
        WorkSans[1].style.color = "slateblue";
        aboutOpen.style.color = "slateblue";
        aboutClose.style.color = "slateblue";

    } else if (weather === "rain") {

        toggleVisibility("rain", "visible");
        WorkSans[0].style.color = "dodgerblue";
        WorkSans[1].style.color = "dodgerblue";
        aboutOpen.style.color = "dodgerblue";
        aboutClose.style.color = "dodgerblue";

    } else if (weather === "snow" || weather === "sleet" || weather === "hail") {

        toggleVisibility("snow", "visible");
        WorkSans[0].style.color = "snow";
        WorkSans[1].style.color = "snow";
        aboutOpen.style.color = "snow";
        aboutClose.style.color = "snow";

    } else if (weather === "cloudy") {

        toggleVisibility("cloudy", "visible");
        WorkSans[0].style.color = "gainsboro";
        WorkSans[1].style.color = "gainsboro";
        aboutOpen.style.color = "gainsboro";
        aboutClose.style.color = "gainsboro";

    } else if (weather === "partly-cloudy-day") {

        toggleVisibility("cloudy", "visible");
        toggleVisibility("partly-cloudy-day", "visible");
        WorkSans[0].style.color = "gold";
        WorkSans[1].style.color = "gold";
        aboutOpen.style.color = "gold";
        aboutClose.style.color = "gold";

    } else if (weather === "partly-cloudy-night") {

        toggleVisibility("cloudy", "visible");
        toggleVisibility("partly-cloudy-night", "visible");
        WorkSans[0].style.color = "slateblue";
        WorkSans[1].style.color = "slateblue";
        aboutOpen.style.color = "slateblue";
        aboutClose.style.color = "slateblue";

    } else if (weather === "thunderstorm") {

        toggleVisibility("thunderstorm", "visible");
        WorkSans[0].style.color = "gold";
        WorkSans[1].style.color = "gold";
        aboutOpen.style.color = "gold";
        aboutClose.style.color = "gold";

    }

}


function pageHotness(temperature) {

    let time = new Date();
    let hours = time.getHours();

    if (hours >= 20 || hours <= 4) {

        body.style.backgroundColor = "indigo";
        footer.style.color = "white";
        darkSky[0].classList.add("darkSkyNight");
        darkSky[1].classList.add("darkSkyNight");
        darkSky[2].classList.add("darkSkyNight");

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

