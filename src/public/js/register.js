$(function() {
  $("form").submit(function() {
    var data = $("form").serializeArray();
    data = parseJson(data);

    $.ajax({
      url: this.action,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      scriptCharset: "utf-8",
      data: JSON.stringify(data),
    })
      .done(() => {
        alert("登録完了しました！");
      })
      .fail(() => {
        alert("登録失敗しました。。。");
      });

    return false;
  });

  parseJson = function(data) {
    var returnJson = {};
    for (let i = 0; i < data.length; i++) {
      returnJson[data[i].name] = data[i].value;
    }
    return returnJson;
  };
});
