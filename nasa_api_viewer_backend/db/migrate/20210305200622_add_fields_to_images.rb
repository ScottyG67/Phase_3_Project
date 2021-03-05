class AddFieldsToImages < ActiveRecord::Migration[6.1]
  def change
    add_column :images, :date_created, :string
    add_column :images, :center, :string
    add_column :images, :secondary_creator, :string
    add_column :images, :media_type, :string
    add_column :images, :nasa_id, :string
    add_column :images, :keywords, :string
    add_column :images, :description, :text
  end
end
