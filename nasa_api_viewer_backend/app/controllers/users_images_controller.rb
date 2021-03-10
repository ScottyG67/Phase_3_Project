class UsersImagesController < ApplicationController
    def show
        byebug
    end
    def destroy
        image = Image.find_by(nasa_id: params[:nasa_id])
        # UserImage.where(user_id: 23, image_id: 1)[0]
        
        record = UserImage.where(image_id: params[:image_id], user_id: params[:user_id])[0]
        
        record.destroy
        head :no_content
    end

end