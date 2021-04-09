let apiKey = "d90e9570355188094b55bc4c9b6ea3e9";
let count = 1;

window.onload = async function () {
    window.localStorage.setItem("apiKey", "d90e9570355188094b55bc4c9b6ea3e9");
    //кнопка "обновить геолокацию"
    buttonWidth();
    //текущие координаты
    navigator.geolocation.getCurrentPosition(showLocation, notReceived, {timeout: 10000});
    //остальные города
    printLoader();
    let urls = [];
    for (let i = 1; i < window.localStorage.length; i++) {
        let city = window.localStorage.getItem(i);
        urls.push(urlCity(city));
    }
    try {
        let requests = await urls.map(url => fetch(url, {
            "method": "GET",
        }));
        let responces = await Promise.all(requests);
        responces = await Promise.all(responces.map(r => r.json()));
        responces.forEach(responce => printListCities(responce, count++));
    } catch (e) {
        alert(e)
    }
}




//Запрос погоды по геолокации
function showLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    fetchLatLonCurrentWeather(lat,lon);
}

//Запрос погоды дефолтного города
function notReceived() {
    alert("Your location error, so we take the default city")

    let city = "Москва"
    fetchCityCurrentWeather(city)
}


//Обновить геолокацию
function updateCurrentWeather() {
    loaderIcon()
    navigator.geolocation.getCurrentPosition(showLocation, notReceived, {timeout: 10000});
}


function urlLatLon(lat, long) {
    return `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&lang=ru&units=metric&lat=${lat}&lon=${long}`
}


function urlCity(city){
   return `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`
}

function loaderIcon (){
    document.querySelector("#current_location_icon").src = "image/14285.png";
    document.querySelector("#current_location").textContent = "";
    document.querySelector("#current_grad").textContent = "";
    document.querySelector("#contain").innerHTML = "";
}