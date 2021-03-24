async function getData(a) {
    if (typeof a === 'string') {
    var item = 
    await fetch("https://api.openweathermap.org/data/2.5/weather?appid=d90e9570355188094b55bc4c9b6ea3e9&lang=ru&units=metric&q=" + a)
    console.log(item.json())}
    else {
      var item =
       await fetch("https://api.openweathermap.org/data/2.5/weather?appid=d90e9570355188094b55bc4c9b6ea3e9&lang=ru&units=metric&lat=" + a[0] + "&lon=" + a[1] )
      console.log(item.json())
    }
}

getData([30,40])

async function getLocation() {
    navigator.geolocation.getCurrentPosition(async function (position) {
      await getData([position.coords.latitude, position.coords.longitude])},
  
      async function (){
        await getData("Moscow")
      })
}

getLocation()