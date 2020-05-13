$(function() {

  // メッセージ送信時の処理
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var url = $(this).attr('action');
    var formData = new FormData(this);
  })
});