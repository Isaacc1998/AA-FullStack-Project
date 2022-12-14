class History < ApplicationRecord
    has_many_attached :images

    belongs_to :user,
    foreign_key: :owner_id,
    class_name: :User
end
