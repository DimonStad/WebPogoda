function printLoader () {
    let template = document.getElementById("loader");
    for(let i = 1; i < window.localStorage.length; i++){
        let section = document.createElement("section");
        section.setAttribute("id", "city" + i);
        let clone;
        clone = document.importNode(template.content, true);
        section.appendChild(clone);
        document.getElementById("other_cities").appendChild(section);
    }
}


function printCurrentWeather(res) {
    let section = document.querySelector("#this_weather");
    section.querySelector("#current_location").textContent = res.name;
    section.querySelector("#current_grad").textContent = Math.ceil((res.main.temp)) + "°C";
    section.querySelector("#current_location_icon").src = "image/day_"
        + res.weather[0].main.toLowerCase()
        + ".png"
    let ul = document.querySelector("#contain");
    addToList(ul, res);
}

//Работа с показателями ветра, давления, влажности и координат и добавление их в список
function addToList(ul, res) {
    ul.innerHTML = "";
    let template = document.querySelector("#template-contain");
    let parameters = template.content.querySelectorAll("p");
    parameters[1].textContent = res.wind.speed + " м/с";
    parameters[3].textContent = res.weather[0].description;
    parameters[5].textContent = res.main.pressure + " hpa";
    parameters[7].textContent = res.main.humidity + " %";
    parameters[9].textContent = "[ " + res.coord.lon + ", " + res.coord.lat + " ]";
    let clone
    clone = document.importNode(template.content, true);
    ul.appendChild(clone);
}


//Печать избранного города
function printListCities(res, count3) {
    let name = "city" + count3;

    //Определяем значения
    let template = document.querySelector("#template-othercity");
    template.content.querySelector(".gra_of_other_city").textContent
        = Math.ceil((res.main.temp)) + "°C"
    template.content.querySelector(".name_of_other_city").textContent = res.name;
    template.content.querySelector(".other_city_icon").src = "image/day_"
        + res.weather[0].main.toLowerCase()
        + ".png"

    let ul = template.content.querySelector(".details");
    addToList(ul, res);
    let section = document.getElementById(name);
    section.innerHTML = "";
    var clone = document.importNode(template.content, true);
    section.appendChild(clone);
}