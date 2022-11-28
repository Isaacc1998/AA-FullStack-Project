json.user do
  # json.extract! @user, :id, :email, :username, :created_at, :updated_at
  json.set! @user.id do 
    json.id @user.id
    json.email @user.email 
    json.username @user.username
    json.photoURL @user.photo.url
    json.created_at @user.created_at
    json.updated_at @user.updated_at
  end
end



