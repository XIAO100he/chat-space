$(function(){
  var user_list = $("#user-search-result");
  var adduser_list = $('#chat-group-users');

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix chat-user-list">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}"> 追加 </div>
               </div>`
    user_list.append(html);
  }
 
   function appendErrMsgToHTML(msg){
    var html = `<div class="chat-group-user clearfix chat-user-list">
                  ${msg}
                </div>`
    user_list.append(html);
   }

   function appendUserToView(user_name){
    var html = `<div class="chat-group-user clearfix chat-user-list">
                  <p class="chat-group-user__name">${user_name}</p>
                  <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove"> 削除 </div>
               </div>`
    adduser_list.append(html);
   }

  //ユーザー検索
  $('#user-search-field').on("keyup", function(){
    var input = $('#user-search-field').val();

    $.ajax({
      type: 'GET',
      url: '/users/',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  })

  //ユーザーの追加
  $('#user-search-result').on('click', '.user-search-add', function(){
    var a_user = $(this).parent().find('.chat-group-user__name').text();
    appendUserToView(a_user);
  })

  //ユーザーの削除
  $('#chat-group-users').on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  })
})


  



