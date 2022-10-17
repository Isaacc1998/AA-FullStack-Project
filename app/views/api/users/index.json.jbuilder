@sets.each do |set|
    json.set! set.id do
        json.extract! set, :id, :title, :author_id, :created_at, :updated_at
    end
end