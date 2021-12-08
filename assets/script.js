var searchCard = $(".searchCard");
var searchInput = $(".searchInput");
var key = 'fe371c9d6acb63e6b6c8e75cc5e50675'
var inputBox = $("#inputBox");

var userSearch = "";

function getWeather(event) {
    event.preventDefault()
    console.log("Hello")
    var city = inputBox.val()
    callAPI(city)


}

function callAPI(city) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key

    fetch(url)
        .then(function(res) {
            return res.json()
        }).then(function(data) {
            var link = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=minutely,hourly&units=imperial&appid=" + key
            console.log(data)
            displayWeather(link, data.name)
        })
}


function displayWeather(url, cityname) {
    console.log(cityname)
    fetch(url)
        .then(function(res) {
            return res.json()
        }).then(function(data) {
            updateLocalStorage(cityname)
            console.log(data)
            var userSearch = "cityname"
            $(".container").html(`
<h2>${cityname}</h2>
            `)
            var tempEl = $("<p>").text("Temp: " + data.current.temp + "*F")
            $(".container").append(tempEl)
            var tempEl = $("<p>").text("Humidity: " + data.current.humidity)
            $(".container").append(tempEl)
            var tempEl = $("<p>").text("Wind Speed: " + data.current.wind_speed)
            $(".container").append(tempEl)
            var tempEl = $("<p>").text("UV Index: " + data.current.uvi)
            $(".container").append(tempEl)
            $(".cardContainer").html("")
            for (let i = 0; i < 5; i++) {
                const day = data.daily[i];
                var cardDiv = $("<div>").attr("class", "card")
                var dayTemp = $("<p>").text("Temp: " + day.temp.day + "*F")
                $(cardDiv).append(dayTemp)
                var dayTemp = $("<p>").text("Humidity: " + day.humidity)
                $(cardDiv).append(dayTemp)
                var dayTemp = $("<p>").text("Wind Speed: " + day.wind_speed)
                $(cardDiv).append(dayTemp)
                var dayTemp = $("<p>").text("UV Index: " + day.uvi)
                $(cardDiv).append(dayTemp)
                $(".cardContainer").append(cardDiv)



            }

        })


}

const updateLocalStorage = searchInput => {
    // gets what ever is in Local storage and parses it
    let cityListLocalStorage = JSON.parse(localStorage.getItem("cityList")) || []

    if (cityListLocalStorage.includes(searchInput)) {
        return
    } else {
        cityListLocalStorage.unshift(searchInput);
        // Then resaves the the array to local storage
        localStorage.setItem("cityList", JSON.stringify(cityListLocalStorage))
        var searchResults = $("#searchResults")
        var button = $("<button>").text(searchInput)
        searchResults.append(button)
    }
}

function getLocalStorage() {
    let cityListLocalStorage = JSON.parse(localStorage.getItem("cityList")) || []
    for (let i = 0; i < cityListLocalStorage.length; i++) {
        const element = cityListLocalStorage[i];
        var searchResults = $("#searchResults")
        var button = $("<button>").text(element).on("click", function(event) {
            callAPI(event.target.textContent)
        })
        searchResults.append(button)
    }
}
getLocalStorage()


searchInput.on('submit', getWeather)