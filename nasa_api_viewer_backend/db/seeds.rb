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


user1 = User.create(username: "Lone Starr", email: "starr@spaceballs.com", password: "password", apod: true, weather: true, nasaimage: true)

image1 = Image.create(url: "https://apod.nasa.gov/apod/image/1612/ngc6357_nasa_3600.jpg")

userimage1 = UserImage.create(user_id:user1.id, image_id:image1.id)