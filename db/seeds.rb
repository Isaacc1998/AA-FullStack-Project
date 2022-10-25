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

    Flashcard.create!(
      front: "1 + 1 = ?",
      back: "2",
      set_id: 1
    )

    Flashcard.create!(
      front: "3 * 4 = ?",
      back: "12",
      set_id: 1
    )

    Flashcard.create!(
      front: "10 / 2 = ?",
      back: "5",
      set_id: 1
    )

    FlashcardSet.create!(
      title: 'Demo',
      author_id: 1
    )

    Flashcard.create!(
      front: "term",
      back: "definition",
      set_id: 2
    )

    FlashcardSet.create!(
      title: 'Study Set 1',
      author_id: 1
    )

    Flashcard.create!(
      front: "question",
      back: "answer",
      set_id: 3
    )

    FlashcardSet.create!(
      title: 'Study Set 2',
      author_id: 1
    )

    Flashcard.create!(
      front: "question",
      back: "answer",
      set_id: 4
    )

    FlashcardSet.create!(
      title: 'Study Set 3',
      author_id: 2
    )

    Flashcard.create!(
      front: "question",
      back: "answer",
      set_id: 5
    )

    FlashcardSet.create!(
      title: 'Study Set 4',
      author_id: 2
    )

    Flashcard.create!(
      front: "question",
      back: "answer",
      set_id: 6
    )

    FlashcardSet.create!(
      title: 'Study Set 5',
      author_id: 2
    )

    Flashcard.create!(
      front: "question",
      back: "answer",
      set_id: 7
    )

    FlashcardSet.create!(
      title: 'Study Set 6',
      author_id: 3
    )
  
    Flashcard.create!(
      front: "question",
      back: "answer",
      set_id: 8
    )

    FlashcardSet.create!(
      title: 'Study Set 6',
      author_id: 3
    )

    Flashcard.create!(
      front: "question",
      back: "answer",
      set_id: 9
    )
  
    FlashcardSet.create!(
      title: 'Study Set 7',
      author_id: 3
    )

    Flashcard.create!(
      front: "question",
      back: "answer",
      set_id: 10
    )
  
    FlashcardSet.create!(
      title: 'Study Set 8',
      author_id: 2
    )

    Flashcard.create!(
      front: "question",
      back: "answer",
      set_id: 11
    )

    FlashcardSet.create!(
      title: 'Study Set 9',
      author_id: 2
    )

    Flashcard.create!(
      front: "question",
      back: "answer",
      set_id: 12
    )

    FlashcardSet.create!(
      title: 'Study Set 10',
      author_id: 2
    )

    Flashcard.create!(
      front: "question",
      back: "answer",
      set_id: 13
    )
  
    puts "Done!"
  end