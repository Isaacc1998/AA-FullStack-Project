class Api::FlashcardsController < ApplicationController
    
    def show 
        @flashcard = Flashcard.find(params[:id])
        render "api/flashcards/show"
    end 

    def create 
        @flashcard = Flashcard.new(flashcard_params)
        @flashcard[set_id] = params[:set_id]
        if @flashcard.save 
            render "api/flashcards/show"
        else  
            render json: {errors: ['You need to fill out both the front and back of the flashcard!']}
        end
    end 

    def update 
        @flashcard = Flashcard.find_by(id: params[:id])
        if @flashcard.set_id == params[:set_id]
            if @flashcard.update(flashcard_set_params)
                render "api/flashcards/show"
            else  
                render json: { errors: @user.errors.full_messages}, status: :unprocessable_entity
            end
        else  
            render json: { errors: ['You can only update your own flashcards!']}
        end
    end

    def destroy

    private 

    def flashcard_params 
        params.require(:flashcard).permit(:front, :back)
    end
end