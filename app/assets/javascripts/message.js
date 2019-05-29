$(function(){

  function buildHTML(message){
    var img =  (message.image.url) !== null?  `<img src="${message.image.url}">` : "";

    var html = `<div class="message" data-id=${message.id}>
                  <div class="top-wrapper">
                    <div class="top-wrapper__user-name">${message.user_name} </div>
                    <div class="top-wrapper__date">${message.created_at}</div>
                  </div>
                  <div class="bottom-wrapper">
                    <p class="bottom-wrapper__content">
                    ${message.content}
                    ${img}
                    </p>
                  </div>
                </div>`
    return html
  }

  $('#new_message').on( 'submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.messages').animate({ scrollTop:$('.messages:last')[0].scrollHeight})
    })

    .fail(function(){
      alert('メッセージの送信に失敗しました。');
    })

    .always(function(){
      $("#form__submit").removeAttr("disabled");
    })
  });

  $(function(){
    setInterval(reloadMessages, 5000)
  });

  function reloadMessages() {
    last_message_id = $('.message').last().data('id')
    var api_url = window.location.pathname;

    $.ajax({
      url: api_url,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id},
      processData: false,
      contentType: false
    })
    .done(function(messages) {
      var insertHTML = buildHTML(message);
        messages.forEach(function(message){
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop:$('.messages:last')[0].scrollHeight})
        })
      })
    .fail(function() {
      alert('メッセージをうまく取得できませんでした');
    });
  };
})
