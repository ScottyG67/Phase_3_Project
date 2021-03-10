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
    def update
        user = User.find_by(id: params[:id])
        if !params[:apod].nil?
            user.apod = params[:apod]
        end
        if !params[:weather].nil?
            user.weather = params[:weather]
        end
        if !params[:nasaimage].nil?
            user.nasaimage = params[:nasaimage]
        end
        if user.save
            render json: user
        end

    end 
end