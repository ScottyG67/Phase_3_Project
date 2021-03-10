class UsersImagesController < ApplicationController
    def show
        byebug
    end
    def destroy
        image = Image.find_by(nasa_id: params[:nasa_id])

        @record = UserImage.where(:image_id => image.id, :user_id => params[:user_id])
        byebug
        @record[0].destroy
        head :no_content
    end

end