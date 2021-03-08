class Weather < ApplicationRecord

    def self.getRandomWeek
        first_id = self.all.sample.id
        weather_array = []
        5.times do
            weather_array.push(Weather.find_by(id: first_id))
            first_id -=1
        end
        weather_array
    end
end
