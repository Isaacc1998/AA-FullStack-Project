@flashcards.each do |flashcard|
  json.set! flashcard.id do
      json.id flashcard.id 
      json.front flashcard.front 
      json.back flashcard.back 
      json.set_id flashcard.set_id
      json.created_at flashcard.created_at 
      json.updated_at flashcard.updated_at
  end
end