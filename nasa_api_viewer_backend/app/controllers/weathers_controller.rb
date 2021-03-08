class WeathersController < ApplicationController
    def index
        weathers = Weather.getRandomWeek
        render json: weathers
    end
    def show
        weather = Weather.find_by(id: params[:id])
        render json: weather
    end
end