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
    def updated
        user = User.find_by(id: params[:id])
        user.apod = params[:apod]
        
        t.boolean "apod"
        t.boolean "weather"
        t.boolean "nasaimage"

    end
end