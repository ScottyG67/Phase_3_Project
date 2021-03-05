class RemoveUrlFromImages < ActiveRecord::Migration[6.1]
  def up
    remove_column :images, :url
  end

  def down
    add_column :images, :url, :string
  end
end
