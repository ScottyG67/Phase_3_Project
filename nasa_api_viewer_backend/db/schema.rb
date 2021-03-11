# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_03_10_181852) do

  create_table "images", force: :cascade do |t|
    t.string "title"
    t.string "alt_text"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "date_created"
    t.string "center"
    t.string "secondary_creator"
    t.string "media_type"
    t.string "nasa_id"
    t.string "keywords"
    t.text "description"
    t.string "thumb_href"
    t.string "med_href"
    t.string "orig_href"
    t.string "href"
  end

  create_table "user_images", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "image_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["image_id"], name: "index_user_images_on_image_id"
    t.index ["user_id"], name: "index_user_images_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "apod"
    t.boolean "weather"
    t.boolean "nasaimage"
    t.boolean "userimage"
  end

  create_table "weathers", force: :cascade do |t|
    t.string "atmo_opacity"
    t.string "foreign_id"
    t.integer "ls"
    t.integer "max_temp"
    t.integer "min_temp"
    t.integer "pressure"
    t.string "season"
    t.integer "sol"
    t.string "terrestrial_date"
    t.integer "wind_speed"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "user_images", "images"
  add_foreign_key "user_images", "users"
end
