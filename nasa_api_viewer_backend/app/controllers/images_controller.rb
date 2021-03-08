class ImagesController < ApplicationController

    def index
        images = Image.all
        render json: images
    end

    def show
        image = Image.find_by(id: params[:id])
        render_json(image)
    end

    def create
        #make new_image instance
        new_image = Image.new
        new_image.title = params["title"]#
        new_image.thumb_href = params["thumb_href"]#
        new_image.date_created= params["date_created"]#
        new_image.center= params["center"]#
        new_image.secondary_creator = params["secondary_creator"]
        new_image.media_type = params["media_type"]#
        new_image.nasa_id = params["nasa_id"]#
        new_image.keywords = params["keywords"]#
        new_image.description = params["description"]#
        new_image.href = params["href"]
        
        # new_image.med_href = 
        # new_image.orig_href = 
        
        #check if image already exists
        if Image.find_by(nasa_id: new_image.nasa_id)
            render_json(Image.find_by(nasa_id: new_image.nasa_id))
        else
            if new_image.save
                UserImage.create(user_id: params["user_id"], image_id: new_image.id)
                render_json(new_image)
            end
        end
            
    end

    private

    def render_json(new_image)
        #render jason format to match NASA API format
        render json: {data: [{
                            center:new_image.center,
                            date_created:new_image.date_created,
                            description:new_image.description,
                            keywords: new_image.keywords,
                            media_type: new_image.media_type,
                            nasa_id: new_image.nasa_id,
                            title: new_image.title
                            }],
                        links: [{
                            href:new_image.thumb_href,
                            rel:"preview",
                            render:"image"
                            }],
                        href: new_image.href
                    } 
    end


end