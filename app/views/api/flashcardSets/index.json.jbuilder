# json.sets @sets do |flashcardSet|
#     json.id flashcardSet.id 
#     json.title flashcardSet.title 
#     json.author_id flashcardSet.author_id
# end

@sets.each do |set|
    json.set! set.id do
        json.extract! set, :id, :title, :author_id, :created_at, :updated_at
    end
end

# (@sets.map{|set| set.id})