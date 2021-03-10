const NASA_URL = 'https://images-api.nasa.gov/search?q='
const BASE_URL = "http://localhost:3000/"
const USERS_URL = `${BASE_URL}users/`
const IMAGES_URL = `${BASE_URL}images/`
const WEATHER_URL = `${BASE_URL}weathers/`
const NASA_API_KEY = "nOK6nJhZT8gEU6dAhgYrHVQfki9F76TqYM1PTuNN"


document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById('nasa-image-search').addEventListener('submit', searchNasaApi)
    // build groups list and enable login
    fetch(USERS_URL).then(res => res.json()).then(users => users.forEach(renderUsersList))
    
})

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
     const userId = this.dataset.userId
     sessionStorage.setItem("id",userId)
     clearScreen()
     if(this.dataset.apod === 'true'){
         apodFetch()
     }
     if(this.dataset.nasaImage === 'true'){
         document.querySelector('.nasa-images-section').style.display= 'block'
         fetchNasaImages(this.innerText)
     }
     if(this.dataset.weather === 'true'){
         fetchWeekWeather()
     }
     
     fetchUserImages()
 }
 
 function clearScreen(){
     document.querySelector('#nasa-images').innerHTML =''
     document.querySelector('.nasa-images-section').style.display= 'none'
     document.querySelector('.apod').innerHTML=''
     document.querySelector('.mars_grid_container').innerHTML=''
     document.querySelector('.user_images_container').innerHTML=''
     document.querySelector('.user-images-section').style.display = "none"
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
    let nasaIdArray = []
    //get array of currently saved image ids for logged in user
    fetch(USERS_URL+sessionStorage.getItem("id")).then(res => res.json()).then(user => {
        user.images.forEach(image => nasaIdArray.push(image.nasa_id))})
    fetch(NASA_URL+searchTerm).then(res => res.json())
    .then(nasaImages => nasaImages.collection.items.forEach(nasaImage => renderNasaImages(nasaImage, nasaIdArray)))
}


function renderNasaImages(nasaImage,nasaIdArray) {
    const nasaImageContainer = document.querySelector('#nasa-images')
    const card = document.createElement('div')
    card.className = 'image-card'
    card.id = nasaImage.data[0].nasa_id
    
    const nasaImg = document.createElement('img')
        nasaImg.className = 'space-pic'
        nasaImg.src = nasaImage.links[0].href
    
    const nasaTitle = document.createElement('span')
        nasaTitle.className = 'space-pic-caption'
        nasaTitle.innerText = nasaImage.data[0].title
        
    const saveButton = document.createElement("button")
    // check if image has already been saved
    
        if(nasaIdArray.includes(card.id)){
            console.log ('exists')
            makeUnsaveButton (saveButton, nasaImage)
            // saveButton.innerText = "Unsave"
            // saveButton.addEventListener("click",()=>{unsaveImage(nasaImage)})
        } else {
            console.log(card.id)
            console.log(nasaIdArray)
            console.log('new')
            makeSaveButton (saveButton, nasaImage)
        }

    nasaImageContainer.append(card)
    card.append(nasaImg, nasaTitle, saveButton)
}

function makeUnsaveButton (button, image) {
    button.innerText = "Unsave"
    button.addEventListener("click",()=>{unsaveImage(image)})
}

function makeSaveButton (button, image){
    button.innerText = "Save Image"
    button.addEventListener("click",()=>{saveImage(image)})
}

function unsaveImage(img){
    image = {
        "nasa_id": img.data[0].nasa_id,
        "user_id":sessionStorage.getItem("id")
        // "med_href ":
        // "orig_href ":
    }
    const reqObj = {
        method:"DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(image)
    }
    
    fetch("http://localhost:3000/userimages", reqObj).then(res => res.json()).then(() => {
        debugger
        event.target.innerText = "Save Image"
        event.target.addEventListener("click",()=>{saveImage(img)})
        })
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
    
    fetch(IMAGES_URL, reqObj).then(res => res.json()).then(savedImage => {renderUserImages(savedImage)
        const card = document.getElementById(`${savedImage.data[0].nasa_id}`)
        const button = card.querySelector('button')
        makeUnsaveButton (button, savedImage)
        })
}


function searchNasaApi(event) {
    event.preventDefault()
    const nasaImageContainer = document.querySelector('#nasa-images')
    nasaImageContainer.innerHTML = ''
    let search = event.target.text.value
    fetchNasaImages(search)
}


// Display User Saved Images


function fetchUserImages() {
    const userId = sessionStorage.getItem("id")

    fetch(USERS_URL+userId+"/images").then(res => res.json()).then(images => {
        document.querySelector('.user-images-section').style.display = "block"
        images.forEach(renderUserImages)
        showSlides()
    })
}

function renderUserImages(image){
    console.log('rendering user image')
       
    const userImageContainer = document.querySelector(".user_images_container")
    const card = document.createElement('div')
    card.classList = 'user-image-card', 'fade'
    
    const nasaImg = document.createElement('img')
        nasaImg.className = 'space-pic'
        nasaImg.src = image.links[0].href
    
    const nasaTitle = document.createElement('div')
        nasaTitle.className = 'user-image-title'
        nasaTitle.innerText = image.data[0].title

    const prev = document.createElement('a')
        prev.innerText = "❮"
        prev.className = "prev"
        prev.addEventListener('click',()=> {plusSlides(-2)})
    const next = document.createElement('a')
        next.innerText = "❯"
        next.className = "next"
        next.addEventListener('click',()=> {plusSlides(0)})
        
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
