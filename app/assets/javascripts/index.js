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

   function appendUserToView(user_id, name){
    var html = `<div class="chat-group-user clearfix" data-user-id=${ user_id }>
                  <input name="group[user_ids][]" type="hidden" value=${ user_id }>
                  <p class="chat-group-user__name">${name}</p>
                  <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id=${ user_id } data-user-name=${ name }> 削除 </div>
               </div>`
    adduser_list.append(html);
   }

  //ユーザー検索
  $('#user-search-field').on("keyup", function(){
    var preWord = "";
    var input = $('#user-search-field').val();
    if (input !== preWord && input.length !== 0){
      $.ajax({
        type: 'GET',
        url: '/users/',
        data: {keyword: input},
        dataType: 'json'
      })
      .done(function(users){
        if (users.length !== 0 ) {
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
    }
    preWord = input;
    $('#user-search-result').empty();
  });

  //ユーザーの追加
  $('#user-search-result').on('click', '.user-search-add', function(){
    var user_id = $(this).attr("data-user-id");
    var user_name = $(this).attr("data-user-name");
    appendUserToView(user_id, user_name);
    $(this).parent().remove();
  })

  //ユーザーの削除
  $('#chat-group-users').on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  })
})
