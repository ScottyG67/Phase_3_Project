class WeathersController < ApplicationController
    def index
        weathers = Weather.all
        weathers_response = weathers.sample(7)
        render json: weathers_response
    end
    def show
        weather = Weather.find_by(id: params[:id])
        render json: weather
    end
end