console.log("java index loaded")
let SEARCH_TERM = `nebula`
const BASE_URL = "http://localhost:3000/"
const USERS_URL = `${BASE_URL}users/`
const NASA_API_KEY = "nOK6nJhZT8gEU6dAhgYrHVQfki9F76TqYM1PTuNN"

document.addEventListener("DOMContentLoaded", ()=>{
    console.log("DOM Loaded")
    // init()
    apodFetch()
    marsFetch()
    fetchNasaImages()
})

function init() {
    fetch(USERS_URL+"1").then(res => res.json()).then(console.log)
}

function apodFetch(){
    fetch("https://api.nasa.gov/planetary/apod?api_key="+NASA_API_KEY).then(res =>res.json()).then(img => renderApod(img))
}
function epicFetch(){
    fetch("https://api.nasa.gov/EPIC/api/natural/images?api_key="+NASA_API_KEY).then(res =>res.json()).then(epicData => renderEpic(epicData))
}
function marsFetch(){
    fetch("https://api.nasa.gov/insight_weather/?api_key="+NASA_API_KEY+"&feedtype=json&ver=1.0").then(res =>res.json()).then(marsData => renderMars(marsData))
    // https://api.nasa.gov/insight_weather/?api_key=nOK6nJhZT8gEU6dAhgYrHVQfki9F76TqYM1PTuNN&feedtype=json&ver=1.0
}
function fetchNasaImages(searchTerm="https://images-api.nasa.gov/search?q=nebula"){
    fetch(searchTerm).then(res => res.json()).then(stuff => stuff.collection.items.forEach(renderNasaImages))
                     // search term goes after q ^
}

function searchNasaApi(event) {
    document.querySelector('nasa-image-search').addEventListener('submit', fetchNasaImages)
        event.target.value

}


function renderNasaImages(nasaImages) {
    const nasaImageContainer = document.querySelector('.nasaImages')
    const nasaImg = document.createElement('img')
        // nasaImg.dataset.id = 
        nasaImg.src = nasaImages.links[0].href
    const nasaTitle = document.createElement('h5')
        nasaTitle.innerText = nasaImages.data[0].title
        // nasaLinks.dataset.id = 
    // console.log(nasaImages.links[0].href) //image.jpg
    // console.log(nasaImages.data[0].title) //title
    // console.log(nasaImages.links[0])
    nasaImageContainer.append(nasaImg, nasaTitle)
}

function renderApod(img){
    const apodContainer = document.querySelector('.apod')
    const apodImage = document.createElement('img')
    apodImage.src = img.url
    apodContainer.append(apodImage)
}
function renderEpic(epicData){
    const epicContainer = document.querySelector('.epic')
    const epicImage = document.createElement('img')
    // epicImage.src = epicData[0].image+'.png'
    // console.log(epicData)
    // console.log(epicData[0].image+'.png')
    epicContainer.append(epicImage)
}
function renderMars(marsData){
    const marsContainer = document.querySelector('.mars')
    // marsData.forEach(sol => console.log(sol))
}