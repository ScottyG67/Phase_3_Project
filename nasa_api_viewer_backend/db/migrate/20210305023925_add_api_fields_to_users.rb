class AddApiFieldsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :apod, :boolean
    add_column :users, :weather, :boolean
    add_column :users, :nasaimage, :boolean
  end
end
