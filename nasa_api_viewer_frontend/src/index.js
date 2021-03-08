const NASA_URL = 'https://images-api.nasa.gov/search?q='
const BASE_URL = "http://localhost:3000/"
const USERS_URL = `${BASE_URL}users/`
const IMAGES_URL = `${BASE_URL}images/`
const NASA_API_KEY = "nOK6nJhZT8gEU6dAhgYrHVQfki9F76TqYM1PTuNN"

document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById('nasa-image-search').addEventListener('submit', searchNasaApi)
    // console.log("DOM Loaded")
    // init()
    apodFetch()
    // marsFetch()
    fetchNasaImages()
    
})

function init() {
    fetch(USERS_URL).then(res => res.json()).then(users => users.forEach(renderUsersList))
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

function searchNasaApi(event) {
    event.preventDefault()
    const nasaImageContainer = document.querySelector('.nasa-images')
    nasaImageContainer.innerHTML = ''
    let search = event.target.text.value

    fetch(NASA_URL+search)
    .then(r => r.json())
    .then(stuff => stuff.collection.items.forEach(renderNasaImages))
}

function renderUsersList(user){
   const userList = document.getElementById('user_list')
   const userItem = document.createElement('li')
        userItem.innerText = user.username
        userItem.dataset.userId = user.id
        userItem.addEventListener('click',userLogin)
    userList.append(userItem)
}

function userLogin(event) {
    
    const userId = event.target.dataset.userId
    sessionStorage.setItem("id",userId)
    apodFetch()
    fetchNasaImages()
    
}

function renderNasaImages(nasaImage) {
    const nasaImageContainer = document.querySelector('.nasa-images')
    const card = document.createElement('div')
    card.className = 'image-card'
    
    const nasaImg = document.createElement('img')
        nasaImg.className = 'space-pic'
        nasaImg.src = nasaImage.links[0].href
    
    const nasaTitle = document.createElement('span')
        nasaTitle.className = 'space-pic-caption'
        nasaTitle.innerText = nasaImage.data[0].title
        
    const saveButton = document.createElement("button")
        saveButton.innerText = "Save Image"
        saveButton.addEventListener("click",()=>{saveImage(nasaImage)})

    nasaImageContainer.append(card)
    card.append(nasaImg, nasaTitle, saveButton)
}

function renderApod(img){
    const apodContainer = document.querySelector('.apod')
    const apodImage = document.createElement('img')
    apodImage.className = ('apod-img')
    apodImage.src = img.url
    apodContainer.append(apodImage)
}

// function renderMars(marsData){
//     const marsContainer = document.querySelector('.mars')
//     marsData.forEach(sol => console.log(sol))
// }


function saveImage(img){
    
    image = {
        "title": img.data[0].title,
        "thumb_href": img.links[0].href,
        "href": img.href,
        "date_created": img.data[0].date_created,
        "center": img.data[0].center,
        "secondary_creator ": img.data[0].secondary_creator,
        "media_type ": img.data[0].media_type,
        "nasa_id": img.data[0].nasa_id,
        "keywords": img.data[0].keywords,
        "description": img.data[0].description,
        "user_id":sessionStorage.getItem("id")
        // "med_href ":
        // "orig_href ":
    }
    const reqObj = {
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(image)
    }
    
    fetch(IMAGES_URL, reqObj).then(res => res.json()).then(event.target.innerText="Image Saved")
}

