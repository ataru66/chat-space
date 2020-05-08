class MessagesController < ApplicationController
  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end
end
