console.log("Hello");
import geolib from 'geolib';

console.log("ready");
var oldLat = "";
var oldLong = "";
var unit = "M";
var latitude = "";
var longitude = "";

function locationSet() {
    console.log("Setting location now")
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        var accuracy = position.coords.accuracy;
        var capa = document.getElementById("capa");
        console.log("Latitude: " + latitude + " | Longitude: " + longitude);
    },
        function error(msg) { alert('Please enable your GPS position feature.'); },
        { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true });

    } else {
    alert("Geolocation API is not supported in your browser.");
    }

}
locationSet();
setInterval(function () {
    locationSet();
}, 120 * 1000);