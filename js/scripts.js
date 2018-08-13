function weather() {

    let location = document.getElementById("location");
    let apiKey = "7d4a8b76ab3a113b2bb79af067b79eeb";
    let url = "https://api.forecast.io/forecast/";

    let generated_url = "";

    let temperature = document.getElementById("temperature");
    let minutely = document.getElementById("minutely");

    navigator.geolocation.getCurrentPosition(showPosition);

    function showPosition(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        location.innerHTML = "Latitude is " + latitude + "°" + " " +
							 "longitude is " + longitude + "°";

        function generateURL() {
            generated_url = url + apiKey
                + "" +
                latitude + "," + longitude
                + "?callback=?";
            return generated_url;
        }
        generateURL();
        console.log(generated_url);

        let request = new XMLHttpRequest();
        request.open('GET', generated_url, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                let data = JSON.parse(request.responseText);
                temperature.innerHTML = data.currently.temperature + "° F";
                minutely.innerHTML = data.minutely.summary;
            } else {
                error();
            }
        };

        request.onerror = function() {
            error();
        };

        request.send();

        function error() {
            location.innerHTML = "Unable to retrieve your location";
        }

        location.innerHTML = "Locating...";

    }
}

weather();