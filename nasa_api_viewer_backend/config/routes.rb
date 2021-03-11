Rails.application.routes.draw do
  resources :users
  resources :images
  resources :weathers

  get '/users/:id/images', to: 'users#show_images'

  delete '/userimages', to: 'users_images#destroy'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
