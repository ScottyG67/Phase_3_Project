console.log("java index loaded")

const BASE_URL = "http://localhost:3000/"
const USERS_URL = `${BASE_URL}users/`
const IMAGES_URL = `${BASE_URL}images/`
const NASA_API_KEY = "nOK6nJhZT8gEU6dAhgYrHVQfki9F76TqYM1PTuNN"

document.addEventListener("DOMContentLoaded", ()=>{
    console.log("DOM Loaded")
    init()
    apodFetch()
    fetchNasaImages()

})

function init() {
    fetch(USERS_URL+"6").then(res => res.json()).then(console.log)
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

function fetchNasaImages(){
    fetch('https://images-api.nasa.gov/search?q=nebula').then(res => res.json()).then(images => {
        for(let i=0; i<10; i++){
            saveImage(images.collection.items[i])
        }
    })
}

function saveImage(img){
    
    image = {
        "title": img.data[0].title,
        "thumb_href": img.href,
        "date_created": img.data[0].date_created,
        "center": img.data[0].center,
        "secondary_creator ": img.data[0].secondary_creator,
        "media_type ": img.data[0].media_type,
        "nasa_id ": img.data[0].nasa_id,
        "keywords": img.data[0].keywords,
        "description": img.data[0].description
        // "med_href ":
        // "orig_href ":
    }
    const reqObj = {
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(image)
    }

    fetch(IMAGES_URL, reqObj).then(res => res.json()).then(console.log)

}