class AddImageLinksToImages < ActiveRecord::Migration[6.1]
  def change
    add_column :images, :thumb_href, :string
    add_column :images, :med_href, :string
    add_column :images, :orig_href, :string
  end
end
