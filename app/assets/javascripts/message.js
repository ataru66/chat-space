$(function() {

  // 関数定義
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
});