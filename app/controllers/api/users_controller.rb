class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']
  '/api/users/index'

  def index 
    # @sets = FlashcardSet.where("author_id = ?", current_user.id);
    # render "api/flashcardSets/index"
    @users = User.all()
    render "api/users/index"
  end 

  def show 
    @user = User.find(params[:id])
    render "api/users/show"
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render "api/users/show" 
    else
      render json: { errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update 
    @user = current_user
    # @user.photo.attach(user_params[:photo])
    # hash = {}
    # hash[:username] = user_params[:username]
    # hash[:email] = user_params[:email]
    # hash[:password] = user_params[:password]
    # hash[:photo] = user_params[:photo]
    # temp = [];
    # @user.pastimages.each do |image| 
    #   temp << image;
    # end 
    # temp << user_params[:pastimages]
    # hash[:pastimages] = temp
    # p user_params[:username]
    # p user_params[:email]
    
    if @user.update(user_params)
      render "api/users/show"
    else
      render json: {user: nil}
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :photo, :pastimages => [])
  end
end


