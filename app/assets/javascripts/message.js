$(function() {

  // 関数定義
  function templateHTML(message){
    var template_html= `<div class="chat-main__message-list__message-box">
                          <div class="chat-main__message-list__message-box__info">
                            <div class="chat-main__message-list__message-box__info__member-name">
                              ${message.user_name}
                            </div>
                            <div class="chat-main__message-list__message-box__info__date-and-time">
                              ${message.created_at}
                            </div>
                          </div>`
    return (template_html);
  }

  function buildHTML(message){
    if (message.content && message.image) {
      var html = `${templateHTML(message)}
                    <div class="chat-main__message-list__message-box__messages">
                      <p class="chat-main__message-list__message-box__messages__content">
                        ${message.content}
                      </p>
                      <img class="chat-main__message-list__message-box__messages__image" src=${message.image}>
                    </div>
                  </div>`
    } else if (message.content) {
      var html = `${templateHTML(message)}
                    <div class="chat-main__message-list__message-box__messages">
                      <p class="chat-main__message-list__message-box__messages__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
    } else if (message.image) {
      var html = `${templateHTML(message)}
                    <div class="chat-main__message-list__message-box__messages">
                      <img class="chat-main__message-list__message-box__messages__image" src=${message.image}>
                    </div>
                  </div>`
    }
    return html;
  }

  function resetSubmit(){
    $('.chat-main__message-form__form-box__send-btn').prop('disabled', false);
  }

  // メッセージ送信時の処理
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var url = $(this).attr('action');
    var formData = new FormData(this);
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      var html = buildHTML(message);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({
        scrollTop: $('.chat-main__message-list')[0].scrollHeight
      });
      $('form')[0].reset();
      resetSubmit();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      resetSubmit();
    })
  })

  var reloadMessages = function() {
    var last_message_id = $('.chat-main__message-list__message-box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message);
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  }

  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }
});