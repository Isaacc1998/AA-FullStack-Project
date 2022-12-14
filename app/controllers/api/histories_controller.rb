class Api::HistoriesController < ApplicationController

    def index 
        @histories = History.all;
        render "api/histories/index"
    end

    def show 
        @history = History.where("owner_id = ?", params[:id])
        render "api/histories/show"
    end 

    def create 
        @history = History.new()
        @history.owner_id = current_user.id 
        if @history.save
            render "api/histories/show"
        else  
            render json: {errors: ['Failed to create history']}
        end
    end 

    def update 
        @history = History.find(params[:id])
        if params[:history][:images].present?
            params[:activity][:images].each do |image|
                history.images.attach(image)
            end
        end
    end

    def destroy 
        @history = History.find(params[:id])
        if @history.owner_id == current_user.id
            @history.destroy 
        end
    end

    private

    def history_params 
        params.require(:history).permit(images: [])
    end
end