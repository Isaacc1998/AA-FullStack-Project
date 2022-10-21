@sets.each do |set|
    json.set! set.id do
        # json.extract! set, :id, :title, :author_id, :created_at, :updated_at
        json.id set.id 
        json.title set.title 
        json.author_id set.author_id 
        json.created_at set.created_at 
        json.updated_at set.updated_at
        json.length set.flashcards.length
    end
end