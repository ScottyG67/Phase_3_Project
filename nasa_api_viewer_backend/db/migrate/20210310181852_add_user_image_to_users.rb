class AddUserImageToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :userimage, :boolean
  end
end
