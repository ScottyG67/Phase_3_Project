class User < ApplicationRecord
  has_many :user_images
  has_many :images, through: :user_images

end
