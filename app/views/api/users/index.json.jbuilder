# @sets.each do |set|
#     json.set! set.id do
#         json.extract! set, :id, :title, :author_id, :created_at, :updated_at
#     end
# end

@users.each do |user|
    json.set! user.id do
        # json.extract! set, :id, :title, :author_id, :created_at, :updated_at
        json.id user.id 
        json.email user.email
        json.username user.username
        json.photoURL user.photo.url
        json.images user.Pastimages
        json.created_at user.created_at 
        json.updated_at user.updated_at
    end
end