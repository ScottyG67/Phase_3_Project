class AddHrefToImages < ActiveRecord::Migration[6.1]
  def change
    add_column :images, :href, :string
  end
end
