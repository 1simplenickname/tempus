function weather() {

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

        location.innerHTML = "Latitude is " + latitude + "°" + " " +
							 "longitude is " + longitude + "°";

        function generateURL() {
            generated_url = url + apiKey + "/" +
                            latitude + "," + longitude + "?callback=?";
            return generated_url;
        }
        generateURL();
        console.log(generated_url);

        $.getJSON(generated_url, function(data) {
        	$("#temperature").html(data.currently.temperature + "° F");
        	$("#minutely").html(data.minutely.summary);
        });

    }
}

window.onload = function() {
	
    weather();
	
};
