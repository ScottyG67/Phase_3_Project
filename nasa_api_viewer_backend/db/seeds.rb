# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
UserImage.destroy_all
User.destroy_all
Image.destroy_all


user1 = User.create(username: "Mars", email: "mars@spaceballs.com", password: "password", apod: true, weather: true, nasaimage: true, userimage: true)
user2 = User.create(username: "Nebula", email: "nebula@spaceballs.com", password: "password", apod: true, weather: false, nasaimage: true, userimage: true)
user3 = User.create(username: "Earth", email: "earth@spaceballs.com", password: "password", apod: true, weather: false, nasaimage: true, userimage: true)

# image1 = Image.create(url: "https://apod.nasa.gov/apod/image/1612/ngc6357_nasa_3600.jpg", date_created: '2011-08-10T21:00:09Z', center: 'JPL',)

image1 = Image.new
    image1.date_created= '2011-08-10T21:00:09Z'
    image1.center= 'JPL',
    image1.secondary_creator = 'NASA/JPL-Caltech/Harvard-Smithsonian CfA',
    image1.title = 'Weighing in on the Dumbbell Nebula',
    image1.media_type = 'image',
    image1.nasa_id = 'PIA14417',
    image1.keywords = ['Helix Nebula','Spitzer Space Telescope'],
    image1.description = 'The Dumbbell nebula, also known as Messier 27, pumps out infrared light in this image from NASA Spitzer Space Telescope. Planetary nebulae are now known to be the remains of stars that once looked a lot like our sun.',
    image1.thumb_href = 'https://images-assets.nasa.gov/image/PIA14417/PIA14417~thumb.jpg'
    image1.med_href = 'https://images-assets.nasa.gov/image/PIA14417/PIA14417~medium.jpg'
    image1.orig_href = 'https://images-assets.nasa.gov/image/PIA14417/PIA14417~medium.jpg'

image1.save


userimage1 = UserImage.create(user_id:user1.id, image_id:image1.id)

resp = RestClient.get 'https://pudding.cool/2017/12/mars-data/marsWeather.json'
weather_data = JSON.parse(resp.body)
weather_data.map do |day|
    Weather.create(
        atmo_opacity:day["atmo_opacity"],
        foreign_id: day["id"],
        ls: day["ls"],
        max_temp: day["max_temp"],
        min_temp: day["min_temp"],
        pressure: day["pressure"],
        season: day["season"],
        sol: day["sol"],
        terrestrial_date: day['terrestrial_date'],
        wind_speed: day["wind_speed"]
    )
end