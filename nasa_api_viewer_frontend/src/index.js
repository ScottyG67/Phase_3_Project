const NASA_URL = 'https://images-api.nasa.gov/search?q='
const BASE_URL = "http://localhost:3000/"
const USERS_URL = `${BASE_URL}users/`
const IMAGES_URL = `${BASE_URL}images/`
const WEATHER_URL = `${BASE_URL}weathers/`
const NASA_API_KEY = "nOK6nJhZT8gEU6dAhgYrHVQfki9F76TqYM1PTuNN"


document.addEventListener("DOMContentLoaded", ()=>{
    // add event listener to nav bar to toggle APIs
    const apodNav = document.getElementById('apod-nav')
    apodNav.addEventListener('click', apiToggle)
    const marsNav = document.getElementById('mars-nav')
    marsNav.addEventListener('click', apiToggle)
    const nasaNav = document.getElementById('nasa-nav')
    nasaNav.addEventListener('click', apiToggle)
    document.getElementById('nasa-image-search').addEventListener('submit', searchNasaApi)
    // build groups list and enable login
    fetchUserList()    
})
function fetchUserList() {
    fetch(USERS_URL).then(res => res.json()).then(users => users.forEach(renderUsersList))
}
// User / Interest group functions
function renderUsersList(user){
    const userList = document.querySelector('.dropdown_content')
    const userItem = document.createElement('li')
         userItem.innerText = user.username
         userItem.dataset.userId = user.id
         userItem.dataset.apod = user.apod
         userItem.dataset.weather = user.weather
         userItem.dataset.nasaImage = user.nasaimage
         userItem.addEventListener('click',userLogin)
     userList.append(userItem)
 }
 
 function userLogin(event) {
    //  setSessionStorage(event)
    sessionStorage.setItem("id",this.dataset.userId)
    sessionStorage.setItem("apod",this.dataset.apod)
    sessionStorage.setItem("weather",this.dataset.weather)
    sessionStorage.setItem('nasaimage',this.dataset.nasaImage)
     clearScreen()
     if(sessionStorage.getItem("apod") === 'true'){
         apodFetch()
     }
     if(sessionStorage.getItem('nasaimage') === 'true'){
         document.querySelector('.nasa-images-section').style.display= 'block'
         fetchNasaImages(this.innerText)
     }
     if(sessionStorage.getItem("weather") === 'true'){
         fetchWeekWeather()
     }
     if(sessionStorage.getItem("userimage") === 'true'){
        fetchUserImages()
     }
    //  debugger
     
 }
//  function setSessionStorage(event) {
//      debugger
//     sessionStorage.setItem("id",this.dataset.userId)
//     sessionStorage.setItem("apod",this.dataset.apod)
//     sessionStorage.setItem("weather",this.dataset.weather)
//     sessionStorage.setItem('nasaimage',this.dataset.nasaImage)
//  }
 
 function clearScreen(){
     document.querySelector('#nasa-images').innerHTML =''
     document.querySelector('.nasa-images-section').style.display= 'none'
     document.querySelector('.apod').innerHTML=''
     document.querySelector('.mars_grid_container').innerHTML=''
     document.querySelector('.user_images_container').innerHTML=''
     document.querySelector('.user-images-section').style.display = "none"
 }



function apiToggle(event){
    const userId = sessionStorage.getItem("id")
    let bool = sessionStorage.getItem(event.target.dataset.api)
    
    console.log(bool)
    if(bool == 'true'){
        bool = false
    }else{
        bool = true
    }
    console.log(bool)

    let updatedView = {
    }
    updatedView.id = +userId
    updatedView[event.target.dataset.api] =  bool
   
    let reqObj = {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify(updatedView)
    }
    debugger
    fetch(USERS_URL+userId, reqObj)
    .then(res => res.json())
    .then(updatedUser => {
        fetchUserList()
        sessionStorage.setItem("id",updatedUser.id)
        sessionStorage.setItem("apod",updatedUser.apod)
        sessionStorage.setItem("weather",updatedUser.weather)
        sessionStorage.setItem('nasaimage',updatedUser.nasaImage)

    })
    
}

// Mars Weather

function fetchWeekWeather() {
    fetch(WEATHER_URL).then(res=>res.json()).then(weekWeather => {
        const weatherGrid = document.querySelector('.mars_grid_container')
        const title = document.createElement('h2')
        title.innerText = "Weather Conditions on Mars"
        title.className = 'mars_weather_title'
        weatherGrid.appendChild(title)
        weekWeather.forEach(renderWeather)})
}

function renderWeather(dayWeather) {
    document.querySelector('.mars-section').style.display ='block'
    const weatherGrid = document.querySelector('.mars_grid_container')
    const weatherCard = document.createElement('div')
        weatherCard.innerText = dayWeather.terrestrial_date
        weatherCard.className = "mars_weather_card"
    const weatherDay = document.createElement('ul')
        weatherDay.dataset.dayId = dayWeather.id
        weatherDay.className="mars_ul"
    const maxTemp = document.createElement('li')
        maxTemp.innerText = "High: " + dayWeather.max_temp + " C"
    const minTemp = document.createElement('li')
        minTemp.innerText = "Low: " + dayWeather.min_temp + " C"
    const conditions = document.createElement('li')
        conditions.innerText = "Visibility: " + dayWeather.atmo_opacity

        weatherDay.append(maxTemp,minTemp,conditions)
        weatherCard.appendChild(weatherDay)
        weatherGrid.appendChild(weatherCard)
}

// APOD

function apodFetch(){
    fetch("https://api.nasa.gov/planetary/apod?api_key="+NASA_API_KEY).then(res =>res.json()).then(img => renderApod(img))
}

function renderApod(img){
    const apodContainer = document.querySelector('.apod')
    const apodImage = document.createElement('img')
    apodImage.className = ('apod-img')
    apodImage.src = img.url
    apodContainer.append(apodImage)
}


// NASA Image Library

function fetchNasaImages(searchTerm="nebula"){
    fetch(NASA_URL+searchTerm).then(res => res.json()).then(stuff => stuff.collection.items.forEach(renderNasaImages))
}

function renderNasaImages(nasaImage) {
    const nasaImageContainer = document.querySelector('#nasa-images')
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

function searchNasaApi(event) {
    event.preventDefault()
    const nasaImageContainer = document.querySelector('#nasa-images')
    nasaImageContainer.innerHTML = ''
    let search = event.target.text.value

    fetch(NASA_URL+search)
    .then(r => r.json())
    .then(stuff => stuff.collection.items.forEach(renderNasaImages))
}


// Display User Saved Images


function fetchUserImages() {
    const userId = sessionStorage.getItem("id")

    fetch(USERS_URL+userId).then(res => res.json()).then(user => {
        document.querySelector('.user-images-section').style.display = "block"
        user.images.forEach(renderUserImages)
        showSlides()
    })

}

function renderUserImages(image){
   
    const userImageContainer = document.querySelector(".user_images_container")
    const card = document.createElement('div')
    card.classList = 'user-image-card', 'fade'
    
    const nasaImg = document.createElement('img')
        nasaImg.className = 'space-pic'
        nasaImg.src = image.thumb_href
    
    const nasaTitle = document.createElement('div')
        nasaTitle.className = 'user-image-title'
        nasaTitle.innerText = image.title

    const prev = document.createElement('a')
        prev.innerText = "❮"
        prev.className = "prev"
        prev.addEventListener('click',()=> {plusSlides(-2)})
    const next = document.createElement('a')
        next.innerText = "❯"
        next.className = "next"
        next.addEventListener('click',()=> {plusSlides(1)})
        
    card.append(nasaImg,nasaTitle,prev,next)

    userImageContainer.appendChild(card)
}

// Slide Show Functionality //
let slideIndex = 1
let slideChangeTimeout

// Next/previous controls
function plusSlides(n) {
    clearTimeout(slideChangeTimeout)
    slideIndex += n
    console.log(slideIndex)
    showSlides();
}

// automatically rotate through
function showSlides() {  

    let slides = document.querySelectorAll(".user-image-card")

    slides.forEach(slide => slide.style.display ="none")
    if (slideIndex > slides.length) {slideIndex = 1}
    if (slideIndex < 1 ){slideIndex = slides.length}
    slides[slideIndex-1].style.display = "block";
    slideIndex++
    slideChangeTimeout = setTimeout(showSlides,5000)
  }
