console.log("java index loaded")

const BASE_URL = "http://localhost:3000/"
const USERS_URL = `${BASE_URL}users/`
const NASA_API_KEY = "nOK6nJhZT8gEU6dAhgYrHVQfki9F76TqYM1PTuNN"

document.addEventListener("DOMContentLoaded", ()=>{
    console.log("DOM Loaded")
    init()
    apodFetch()
})

function init() {
    fetch(USERS_URL+"1").then(res => res.json()).then(console.log)
}

function apodFetch(){
    fetch("https://api.nasa.gov/planetary/apod?api_key="+NASA_API_KEY).then(res =>res.json()).then(img => renderApod(img))
}

function renderApod(img){
    const apodContainer = document.querySelector('.apod')
    const apodImage = document.createElement('img')
    apodImage.src = img.url
    apodContainer.append(apodImage)
}