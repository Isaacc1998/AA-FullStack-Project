class Api::FlashcardSetsController < ApplicationController
    def index 
        @sets = FlashcardSet.all()
        render "api/flashcardSets/index"
    end

    def show 
        @set = FlashcardSet.find_by(id: params[:id])
        render "api/flashcardSets/show"
    end 

    def create 
        @set = FlashcardSet.new(flashcard_set_params)
        @set.author_id = current_user.id
        if @set.save
            render "api/flashcardSets/show"
        else  
            render json: {errors: ['YOU NEED TWO CARDS TO CREATE A SET']}
        end
    end 

    def update
        @set = FlashcardSet.find_by(id: params[:id])
        if @set.author_id == current_user.id
            if @set.update(flashcard_set_params)
                render "api/flashcardSets/show"
            else  
                render json: { errors: @user.errors.full_messages}, status: :unprocessable_entity
            end
        else  
            render json: { errors: ['You can only update your own flashcards!']}
        end
    end 

    def destroy 
        @set = FlashcardSet.find(params[:id])
        if @set.author_id == current_user.id
            @set.destroy 
        end
    end

    private 

    def flashcard_set_params
        params.require(:flashcard_set).permit(:title)
    end
end