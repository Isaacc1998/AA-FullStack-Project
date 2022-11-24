class Api::FlashcardsController < ApplicationController
    
    def index 
        @flashcards = Flashcard.where("set_id = ?", params[:flashcard_set_id])
        render "api/flashcards/index"   
    end 

    def show 
        @flashcard = Flashcard.find_by(id: params[:id])
        render "api/flashcards/show"
    end 

    def create 
        @flashcard = Flashcard.new(flashcard_params)
        # @flashcard.set_id = params[:set_id]
        if @flashcard.save 
            render "api/flashcards/show"
        else  
            render json: {errors: ['You need to fill out both the front and back of the flashcard!']}
        end
    end 

    def update 
        @flashcard = Flashcard.find_by(id: params[:id])
        # if @flashcard.set_id == params[:set_id]
            if @flashcard.update(flashcard_params)
                render "api/flashcards/show"
            else  
                render json: { errors: @user.errors.full_messages}, status: :unprocessable_entity
            end
        # else  
        #     render json: { errors: ['You can only update your own flashcards!']}
        # end
    end

    def destroy
        @flashcard = Flashcard.find_by(id: params[:id])
        @flashcard.destroy
    end

    private 

    def flashcard_params 
        params.require(:flashcard).permit(:front, :back, :set_id, :photo)
    end 
end