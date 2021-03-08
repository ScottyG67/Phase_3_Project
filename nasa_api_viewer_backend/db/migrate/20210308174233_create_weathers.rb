class CreateWeathers < ActiveRecord::Migration[6.1]
  def change
    create_table :weathers do |t|
      t.string :atmo_opacity
      t.string :foreign_id
      t.integer :ls
      t.integer :max_temp
      t.integer :min_temp
      t.integer :pressure
      t.string :season
      t.integer :sol
      t.string :terrestrial_date
      t.integer :wind_speed

      t.timestamps
    end
  end
end
