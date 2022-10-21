# == Schema Information
#
# Table name: flashcard_sets
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  author_id  :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class FlashcardSet < ApplicationRecord
    
    belongs_to :user,
        foreign_key: :author_id,
        class_name: :User

    has_many :flashcards, 
        foreign_key: :set_id,
        class_name: :Flashcard,
        dependent: :destroy
end
