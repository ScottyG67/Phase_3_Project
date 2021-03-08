console.log("java index loaded")
const NASA_URL = 'https://images-api.nasa.gov/search?q='
const BASE_URL = "http://localhost:3000/"
const USERS_URL = `${BASE_URL}users/`
const NASA_API_KEY = "nOK6nJhZT8gEU6dAhgYrHVQfki9F76TqYM1PTuNN"

document.addEventListener("DOMContentLoaded", ()=>{
    // document.getElementById('nasa-image-search').addEventListener('submit', searchNasaApi)
    // console.log("DOM Loaded")
    // init()
    // apodFetch()
    // marsFetch()
    fetchNasaImages()
    
})

function init() {
    fetch(USERS_URL+"1").then(res => res.json()).then(console.log)
}
function apodFetch(){
    fetch("https://api.nasa.gov/planetary/apod?api_key="+NASA_API_KEY).then(res =>res.json()).then(img => renderApod(img))
}
function marsFetch(){
    fetch("https://api.nasa.gov/insight_weather/?api_key="+NASA_API_KEY+"&feedtype=json&ver=1.0").then(res =>res.json()).then(marsData => renderMars(marsData))
    // https://api.nasa.gov/insight_weather/?api_key=nOK6nJhZT8gEU6dAhgYrHVQfki9F76TqYM1PTuNN&feedtype=json&ver=1.0
}
function fetchNasaImages(searchTerm="nebula"){
    fetch(NASA_URL+searchTerm).then(res => res.json()).then(stuff => stuff.collection.items.forEach(renderNasaImages))
}
// doesn't work :(
// function searchNasaApi(event) {
//     event.preventDefault()
//     let search = {
//         text: event.target.text.value
//     }
//     const reqObj = {
//     headers: {'Content-Type': 'application/json'},
//     method: 'POST',
//     body: JSON.stringify(search)
//     }
//     // console.log(reqObj)
//     fetch(NASA_URL, reqObj)
//     .then(r => r.json())
//     .then(console.log)
      
// }

function renderNasaImages(nasaImages) {
    const nasaImageContainer = document.querySelector('.nasa-images')
    const card = document.createElement('div')
    card.className = 'image-card'
    
    const nasaImg = document.createElement('img')
        nasaImg.className = 'space-pic'
        nasaImg.src = nasaImages.links[0].href
    
    const nasaTitle = document.createElement('span')
        nasaTitle.className = 'space-pic-caption'
        nasaTitle.innerText = nasaImages.data[0].title

    nasaImageContainer.append(card)
    card.append(nasaImg, nasaTitle)
}

function renderApod(img){
    const apodContainer = document.querySelector('.apod')
    const apodImage = document.createElement('img')
    apodImage.src = img.url
    apodContainer.append(apodImage)
}

// function renderMars(marsData){
//     const marsContainer = document.querySelector('.mars')
//     marsData.forEach(sol => console.log(sol))
// }