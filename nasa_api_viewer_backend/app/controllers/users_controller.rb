class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find_by(id: params[:id])
        render json: user.as_json(
            include:{
                images: {
                    except:  ["created_at", "updated_at"] 
                }
            },
            except:  ["created_at", "updated_at"]
        )
    end

    def show_images
        user = User.find_by(id: params[:id])
        images = user.images
        # render json: images
        build_image_structure(images)
    end


private
    def build_image_structure(images)
        formatted_images = images.map do |image| 
                {data: [{
                    center:image.center,
                    date_created:image.date_created,
                    description:image.description,
                    keywords: image.keywords,
                    media_type: image.media_type,
                    nasa_id: image.nasa_id,
                    title: image.title
                    }],
                links: [{
                    href:image.thumb_href,
                    rel:"preview",
                    render:"image"
                    }],
                href: image.href
                }
            end
        render json: formatted_images
    end
end