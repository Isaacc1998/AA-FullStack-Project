# == Schema Information
#
# Table name: flashcards
#
#  id         :bigint           not null, primary key
#  front      :text             not null
#  back       :text             not null
#  set_id     :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Flashcard < ApplicationRecord


    belongs_to :flashcard_set,
        foreign_key: :set_id,
        class_name: :FlashcardSet
end
