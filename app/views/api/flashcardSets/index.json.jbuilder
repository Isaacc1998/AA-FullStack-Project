# json.sets @sets do |flashcardSet|
#     json.id flashcardSet.id 
#     json.title flashcardSet.title 
#     json.author_id flashcardSet.author_id
# end

@sets.each do |set|
    json.set! set.id do
        # json.extract! set, :id, :title, :author_id, :created_at, :updated_at
        json.id set.id 
        json.title set.title 
        json.author_id set.author_id 
        json.created_at set.created_at 
        json.updated_at set.updated_at
        json.name (User.select(:username).where("id = ?", set.author_id))[0].username
        json.length set.flashcards.length
    end
end

