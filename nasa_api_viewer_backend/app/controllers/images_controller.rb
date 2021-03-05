class ImagesController < ApplicationController

    def index
        images = Image.all
        render json: images
    end

    def show
        image = Image.find_by(id: params[:id])
        render json: image
    end

    def create

        new_image = Image.new
        new_image.title = params["title"]
        new_image.thumb_href = params["thumb_href"]

        new_image.date_created= params["date_created"]
        new_image.center= params["center"]
        new_image.secondary_creator = params["secondary_creator"]
        new_image.media_type = params["media_type"]
        new_image.nasa_id = params["nasa_id"]
        new_image.keywords = params["keywords"]
        new_image.description = params["description"]
        
        # new_image.med_href = 
        # new_image.orig_href = 
    
        if new_image.save
            render json: new_image
        end
            
    end


end