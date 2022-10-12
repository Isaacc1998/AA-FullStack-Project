class CreateFlashcards < ActiveRecord::Migration[7.0]
  def change
    create_table :flashcards do |t|
      t.text :front, null: false
      t.text :back, null: false 
      t.references :set, index: true, foreign_key: {to_table: :flashcard_sets}
      t.timestamps  
    end
  end
end
