const NASA_URL = 'https://images-api.nasa.gov/search?q='
const BASE_URL = "http://localhost:3000/"
const USERS_URL = `${BASE_URL}users/`
const IMAGES_URL = `${BASE_URL}images/`
const WEATHER_URL = `${BASE_URL}weathers/`
const NASA_API_KEY = "nOK6nJhZT8gEU6dAhgYrHVQfki9F76TqYM1PTuNN"


document.addEventListener("DOMContentLoaded", ()=>{
    
    initializeNavigation()
    fetchUserList()
    document.getElementById('nasa-image-search').addEventListener('submit', searchNasaApi) 
    document.getElementById('walkthrough_btn').addEventListener('click',walkThrough) 
})

function initializeNavigation(){
    document.getElementById('apod-nav').addEventListener('click', apiToggle)
    document.getElementById('mars-nav').addEventListener('click', apiToggle)
    document.getElementById('nasa-nav').addEventListener('click', apiToggle)
    document.getElementById('lib-nav').addEventListener('click',apiToggle)
    document.querySelector('.new_group_form').addEventListener('submit',newGroup)
}

function fetchUserList() {
    const userList = document.querySelector('.dropdown_content')
    fetch(USERS_URL).then(res => res.json()).then(users => {userList.innerHTML=""
     users.forEach(renderUsersList)})
}

// User / Interest group functions
function renderUsersList(user){
    const userList = document.querySelector('.dropdown_content')
    const userItem = document.createElement('li')
         userItem.innerText = user.username
         userItem.dataset.id = user.id
         userItem.dataset.username = user.username
         userItem.dataset.apod = user.apod
         userItem.dataset.weather = user.weather
         userItem.dataset.nasaimage = user.nasaimage
         userItem.dataset.userimage = user.userimage
         userItem.addEventListener('click',userLogin)
     userList.append(userItem)
 }
 
 function userLogin(event) {
     let user_info
     if(event.target){
       user_info = this.dataset
     } else {
         user_info = event.dataset
     }
     
     setSessionStorage(user_info)
     clearScreen()
     document.querySelector('nav ul').style.display = 'flex'
     const logoutBtn = document.querySelector('.logout')
        logoutBtn.style.display = 'block'
        logoutBtn.addEventListener('click',logout)
     selectivelyRenderApi()
 }

 function logout(event){
     clearScreen()
     document.querySelector('nav ul').style.display = 'none'
     document.querySelector('.logout').style.display = 'none'
     document.querySelector('form').style.display="block"
    document.querySelector('.home_screen').style.display ="block"
    sessionStorage.clear()
    // alert("you have been logged out")
 }

 function setSessionStorage(item) {
    sessionStorage.setItem("id",item.id)
    sessionStorage.setItem("imgsearch",item.username)
    sessionStorage.setItem("apod",item.apod)
    sessionStorage.setItem("weather",item.weather)
    sessionStorage.setItem('nasaimage',item.nasaimage)
    sessionStorage.setItem('userimage',item.userimage)
 }

 function clearScreen(){
    document.querySelector('form').style.display="none"
    document.querySelector('.home_screen').style.display ="none"

    document.querySelector('.nasa-images-section').style.display= 'none'
    document.querySelector('#nasa-images').innerHTML =''
     
    document.querySelector(".picture-of-the-day-section").style.display = "none"
    document.querySelector('.apod').innerHTML=''

    document.querySelector('.mars-section').style.display = 'none'
    document.querySelector('.mars_grid_container').innerHTML=''

    document.querySelector('.user-images-section').style.display = "none"
    document.querySelector('.user_images_container').innerHTML='' 
 }


 function selectivelyRenderApi(){
     
    if(sessionStorage.getItem("apod") === 'true'){
        document.querySelector(".picture-of-the-day-section").style.display = "block"
        document.querySelector('.apod').innerHTML=''
        apodFetch()
    } else(
        document.querySelector(".picture-of-the-day-section").style.display = "none"
    )
    if(sessionStorage.getItem('nasaimage') === 'true'){
        document.querySelector('.nasa-images-section').style.display= 'block'
        document.querySelector('#nasa-images').innerHTML =''
        fetchNasaImages(sessionStorage.getItem('imgsearch'))
    } else(
        document.querySelector('.nasa-images-section').style.display = 'none'
        )
    if(sessionStorage.getItem("weather") === 'true'){
        document.querySelector('.mars-section').style.display = 'block'
        document.querySelector('.mars_grid_container').innerHTML=''
        fetchWeekWeather()
    } else(
        document.querySelector('.mars-section').style.display = 'none'
        )
    if(sessionStorage.getItem("userimage") === 'true'){
        document.querySelector('.user-images-section').style.display = "block"
        document.querySelector('.user_images_container').innerHTML='' 
       fetchUserImages()
    } else (
        document.querySelector('.user-images-section').style.display = 'none'
        )
 }


function apiToggle(event){
    const userId = sessionStorage.getItem("id")
    let bool = sessionStorage.getItem(event.target.dataset.api)
    

    if(bool == 'true'){
        bool = false
    }else{
        bool = true
    }

    let updatedView = {
    }
    updatedView.id = +userId
    updatedView[event.target.dataset.api] =  bool
   
    let reqObj = {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify(updatedView)
    }
    fetch(USERS_URL+userId, reqObj)
    .then(res => res.json())
    .then(updatedUser => {
        fetchUserList()
        setSessionStorage(updatedUser)
        selectivelyRenderApi()
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
        user.images.forEach(image => nasaIdArray.push(image.nasa_id))

        fetch(NASA_URL+searchTerm).then(res => res.json())
        .then(nasaImages => nasaImages.collection.items.forEach(nasaImage => renderNasaImages(nasaImage, nasaIdArray)))
    })
    
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
  
    // check if image has already been saved
    const saveButton = document.createElement("button")
        saveButton.innerText = "Save Image"
        saveButton.addEventListener("click",()=>{saveImage(nasaImage)})

    
        if(nasaIdArray.includes(card.id)){
            saveButton.style.display = "none"
        }

    nasaImageContainer.append(card)
    card.append(nasaImg, nasaTitle,saveButton)

}

function makeUnsaveButton (button, image) {
    button.innerText = "Unsave"
    button.addEventListener("click",()=>{unsaveImage(image)})
}

function makeSaveButton (button, image){
    button.innerText = "Save Image"
    button.addEventListener("click",()=>{saveImage(image)})
    card.append(button)
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
        button.style.display ="none"
        // alert("Image Saved")
        })
}

function unsaveImage(img){
    image = {
        "image_id": img.rails_id,
        "user_id":sessionStorage.getItem("id"),
        "nasa_id":img.data[0].nasa_id
    }
    const reqObj = {
        method:"DELETE",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(image)
    }

    
    fetch("http://localhost:3000/userimages", reqObj)
    .then().then(_=>{
        
        const nasaImageCard = document.getElementById(image.nasa_id)
        nasaImageCard.querySelector('button').style.display = "block"
        const userImageCard = document.getElementById(sessionStorage.id+"_"+image.nasa_id)
        plusSlides(0)
        userImageCard.remove()    
    })
    // .then()
        // event.target.innerText = "Save Image"
        // event.target.addEventListener("click",()=>{saveImage(img)})
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
        // document.querySelector('.user-images-section').style.display = "block"
        images.forEach(renderUserImages)
        showSlides()
    })
}

function renderUserImages(image){     
    const userImageContainer = document.querySelector(".user_images_container")
    const card = document.createElement('div')
    const userId = sessionStorage.getItem('id')
    card.id = userId +"_"+image.data[0].nasa_id


    card.classList = 'user-image-card', 'fade'
    
    const nasaImg = document.createElement('img')
        nasaImg.className = 'space-pic'
        nasaImg.src = image.links[0].href
    
    const nasaTitle = document.createElement('div')
        nasaTitle.className = 'user-image-title'
        nasaTitle.innerText = image.data[0].title
    const unsaveButton =document.createElement('button')
        makeUnsaveButton(unsaveButton,image)

    const prev = document.createElement('a')
        prev.innerText = "❮"
        prev.className = "prev"
        prev.addEventListener('click',()=> {plusSlides(-2)})
    const next = document.createElement('a')
        next.innerText = "❯"
        next.className = "next"
        next.addEventListener('click',()=> {plusSlides(0)})
        
    card.append(nasaImg,nasaTitle,unsaveButton,prev,next)

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
    if (slides.length > 0){
        slides.forEach(slide => slide.style.display ="none")
        if (slideIndex > slides.length) {slideIndex = 1}
        if (slideIndex < 1 ){slideIndex = slides.length}
        slides[slideIndex-1].style.display = "block";
        slideIndex++
        slideChangeTimeout = setTimeout(showSlides,5000)
    } else {
        document.querySelector('.user-images-section').style.display = "none"
    }
  }


  // New Group

  function newGroup (event) {
      event.preventDefault()

      if(event.target.username.value !==""){

      const newUser ={
          username: event.target.username.value
      }
      const reqObj = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newUser)
        }
    fetch(USERS_URL,reqObj).then(res => res.json())
    .then(async (group) => {
            const result = await fetchUserList()
            const userList = document.querySelector('.dropdown_content')
            userLogin(userList.lastChild)
        }
        )
    } else {
        alert("Group name cannot be blank")
    }
  }

function walkThrough () {
    const left = document.getElementById("overlay_left")
    const bottom = document.getElementById("overlay_bottom")
    const right = document.getElementById("overlay_right")
    const top = document.getElementById("overlay_top")
    const text = document.querySelector(".overlay_text")
    text.style.display = "block"
    intro()
    // navBar()

    function intro(){
        
        text.innerText = "Welcome to the NASA API Viewer. Let us show you around"
    
        left.style.display = "block"
        left.style.width = "100%"
        left.style.height = "100%"
        left.style.top = "0%"
        left.style.left = "0%"

        bottom.style.display = "none"
        right.style.display = "none"
        top.style.display = "none"
        setTimeout(groupSection,4000)
    }
    

    // stop One //
    function groupSection(){

        text.innerText = "You can select interest groups here"
        text.style.top = "10%"
        text.style.left = "0%"

        left.style.display = "block"
        left.style.width = "7%"
        left.style.height = "100%"
        left.style.top = "0%"
        left.style.left = "0%"

        bottom.style.display = "block"
        bottom.style.width = "93%"
        bottom.style.height = "95%"
        bottom.style.top = "5%"
        bottom.style.left = "7%"

        right.style.display = "block"
        right.style.width = "87%"
        right.style.height = "5%"
        right.style.top = "0%"
        right.style.left = "13%"

        top.style.display = "none"
        
        setTimeout(newGroupSection,3000)
    }

    function newGroupSection(){
        text.innerText = "And make a new group over here"
        text.style.top = "10%"
        text.style.left = "60%"

        left.style.display = "block"
        left.style.width = "85%"
        left.style.height = "100%"
        left.style.top = "0%"
        left.style.left = "0%"
    
        bottom.style.display = "block"
        bottom.style.width = "15%"
        bottom.style.height = "95%"
        bottom.style.top = "5%"
        bottom.style.left = "85%"
    
        right.style.display = "block"
        right.style.width = "5%"
        right.style.height = "5%"
        right.style.top = "0%"
        right.style.left = "95%"
    
        top.style.display = "none"
        setTimeout(tourLogin,3000)
    }

    function tourLogin(){
        text.style.display = "none"

        left.style.width = "100%"
        left.style.height = "100%"
        left.style.top = "0%"
        left.style.left = "0%"
        bottom.style.display = "none"
        right.style.display = "none"
        top.style.display = "none"
        const userList = document.querySelector('.dropdown_content')
        userLogin(userList.firstChild)
        setTimeout(navBar,1000)
    }
    
    function navBar(){
        text.innerText = "Click on these buttons to fetch and display cool information."
        text.style.display ="Block"
        text.style.top = "15%"
        text.style.left = "15%"

        left.style.display = "block"
        left.style.width = "25%"
        left.style.height = "100%"
        left.style.top = "0%"
        left.style.left = "0%"
    
        bottom.style.display = "block"
        bottom.style.width = "50%"
        bottom.style.height = "92%"
        bottom.style.top = "8%"
        bottom.style.left = "25%"
    
        right.style.display = "block"
        right.style.width = "25%"
        right.style.height = "100%"
        right.style.top = "0%"
        right.style.left = "75%"
    
        top.style.display = "none"
        setTimeout(navBar2,4000)
    }
    function navBar2(){
        text.innerText = "Your selections will be saved so next time you log in you will be shown the same information."

        setTimeout(logOutShow,4000)
    }

    function logOutShow(){
        text.innerText = "You can log out at any time over here."
        text.style.top = "10%"
        text.style.left = "60%"

        left.style.display = "block"
        left.style.width = "80%"
        left.style.height = "95%"
        left.style.top = "5%"
        left.style.left = "0%"
    
        bottom.style.display = "block"
        bottom.style.width = "20%"
        bottom.style.height = "90%"
        bottom.style.top = "10%"
        bottom.style.left = "80%"
    
        right.style.display = "none"
        right.style.width = "5%"
        right.style.height = "5%"
        right.style.top = "0%"
        right.style.left = "95%"
    
        top.style.display = "block"
        top.style.width = "100%"
        top.style.height = "5%"
        top.style.top = "0%"
        top.style.left = "0%"
        setTimeout(logOutTour,3000)
    }

    function logOutTour(){
        logout()
        goodbye()
    }
    function goodbye(){
        text.innerText = "This concludes our tour. Enjoy!"
        text.style.top = "20%"
        text.style.left = "30%"
        left.style.display = "block"
        left.style.width = "100%"
        left.style.height = "100%"
        left.style.top = "0%"
        left.style.left = "0%"

        bottom.style.display = "none"
        right.style.display = "none"
        top.style.display = "none"
        setTimeout(endTour,3000)
    }

    function endTour(){
        text.style.display = "none"
        left.style.display = "none"
        bottom.style.display = "none"
        right.style.display = "none"
        top.style.display = "none"
    }
}

//   jquery
$( function() {
    $( "#nasa-images" ).sortable();
    $( "#nasa-images" ).disableSelection();
  } );

$( function() {
    $("#logged_in").sortable();
    $("#logged_in").disableSelection();
})
