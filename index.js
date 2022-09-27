const url = "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
const backupUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjQyOTE4MDQ&ixlib=rb-1.2.1&q=80"

const cryptoDiv = document.getElementById("bitcoin")
const bitcoinUrl = "https://api.coingecko.com/api/v3/coins/bitcoin"

const timeDiv = document.getElementById("time")
// const date = new Date().toLocaleTimeString("en-us", {timeStyle: "medium"})

// const authorName = document.getElementById("author")

fetch(url)
    .then(res => res.json())
    .then(data => {
        // console.log(data.urls.full)
        document.body.style.backgroundImage = `url(${data.urls.full})`
        document.getElementById("author").innerHTML = `<p>By: ${data.user.name}</p>`
    })
    .catch(err => document.body.style.backgroundImage = `url(${backupUrl})`)

// function getBitcoin(){
    fetch(bitcoinUrl)
        .then(res => {
            if(!res.ok) {
                throw Error("Something went wrong")
            } 
            return res.json()
        })
        .then(data => {
            console.log(data)
            cryptoDiv.innerHTML = `<img src="${data.image.small}" />`
            cryptoDiv.innerHTML += `<span>$${new Intl.NumberFormat().format(data.market_data.current_price.usd)}</span>`
        })
        .catch(err => console.error("error"))
    // }

    // setInterval(getBitcoin, 1000)

    setInterval(() => {
        const date = new Date().toLocaleTimeString("en-us", {timeStyle: "medium"})
        timeDiv.textContent = date
    }, 1000)


navigator.geolocation.getCurrentPosition(position => {
    console.log(position)
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    const units = "imperial"
    
    const weatherUrl = `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}`
    const weatherDiv = document.getElementById("weather")

    fetch(weatherUrl)
        .then(res => {
            if(!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            const weatherDescrip = data.weather[0].description
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            weatherDiv.innerHTML = 
                            `   
                                <img src="${iconUrl}" />
                                <p id="city">${data.name}</p>
                                <p id="temp">${Math.round(data.main.temp)}°</p>
                                
                            `

    })
    .catch(err => console.error(err))
})




