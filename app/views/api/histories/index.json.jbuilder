@histories.each do |history|
    json.set! history.id do 
        json.id history.id 
        json.owner_id history.owner_id
        json.images history.images
        json.created_at history.created_at 
        json.updated_at history.updated_at
    end
end