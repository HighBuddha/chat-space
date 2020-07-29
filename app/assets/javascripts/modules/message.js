$(function() {
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      let html = 
      `<div class="message-list__messages" data-message-id=${message.id}>
        <div class="message-list__messageDetail">
          <div class="message-list__userName">
            ${message.user_name}
          </div>
          <div class="message-list__messageDate">
            ${message.created_at}
          </div>
        </div>
        <div class="message-list__message">
          <p class="Message__body">
            ${message.body}
          </p>
          <img class="Message__image" src="${message.image}">
        </div>
      </div>`//メッセージに画像が含まれる場合のHTMLを作る
      return html;
    } else {
      let html = 
      `<div class="message-list__messages" data-message-id=${message.id}>
        <div class="message-list__messageDetail">
          <div class="message-list__userName">
            ${message.user_name}
          </div>
          <div class="message-list__messageDate">
            ${message.created_at}
          </div>
        </div>
        <div class="message-list__message">
          <p class="Message__body">
            ${message.body}
          </p>
        </div>
      </div>`//メッセージに画像が含まれない場合のHTMLを作る
      return html;
    };
  }

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.message-list').append(html);
      $('form')[0].reset();
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.Form__submit').prop("disabled", false);
    });
  });
});