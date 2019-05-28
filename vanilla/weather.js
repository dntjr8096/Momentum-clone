const weather = document.querySelector(".js-weather");

const API_KEY = "6209c26a297b91f5d13d29fbde22582e";
const COORDS = "coords";

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            return response.json()
        }).then(function (json) {
            const temp = json.main.temp;
            const city = json.name
            weather.innerText = `${temp}℃  #City : ${city}`;
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleSucGeo(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}
function handleErrGeo() {
    console.log("cant access geo location");
}

function askGeoCoords() {
    navigator.geolocation.getCurrentPosition(handleSucGeo, handleErrGeo);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askGeoCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();
