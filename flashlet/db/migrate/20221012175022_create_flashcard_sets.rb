class CreateFlashcardSets < ActiveRecord::Migration[7.0]
  def change
    create_table :flashcard_sets do |t|
      t.string :title, null: false
      t.references :author, foreign_key: {to_table: :users} 
      t.timestamps
    end
  end
end
