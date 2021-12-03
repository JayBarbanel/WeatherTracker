var searchCard = $(".searchCard");
var searchInput = $(".searchInput");
var container = $(".container");
var card = $(".card");
var key = 'fe371c9d6acb63e6b6c8e75cc5e50675'

function getWeather(event) {
    event.preventDefault()
    console.log("Hello")
    var url = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=" + key
    var link = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=" + key
}

searchInput.on('submit', getWeather)