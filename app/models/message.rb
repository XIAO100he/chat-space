class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :content, presences: true, unless: :image?  
end
