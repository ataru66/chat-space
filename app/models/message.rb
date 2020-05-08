class Message < ApplicationRecord

  validates :content, presence: true, unless: :image?

end