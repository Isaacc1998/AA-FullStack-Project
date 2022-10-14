# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do 
    puts "Destroying tables..."
    User.destroy_all
  
    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."

    User.create!(
      username: 'Demo', 
      email: 'demo@user.io', 
      password: 'password'
    )
    
    User.create!(
      username: 'Joe', 
      email: 'Joe@gmail.com', 
      password: 'password'
    )

    User.create!(
      username: 'Bob', 
      email: 'Bob@gmail.com', 
      password: 'bobiscool'
    )

    FlashcardSet.create!(
      title: 'Maths',
      author_id: 1
    )

    FlashcardSet.create!(
      title: 'Chineese',
      author_id: 1
    )

    FlashcardSet.create!(
      title: 'English',
      author_id: 2
    )
    
  
    puts "Done!"
  end