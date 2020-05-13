$(function() {

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
    })
  })
});