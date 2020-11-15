const baseURL = "http://localhost:3000";

$("form").submit(function() {
  var data = $("form").serializeArray();
  data = parseJson(data);

  $.ajax({
    url: baseURL + "/api/users",
    type: "post",
    dataType: "json",
    contentType: "application/json",
    scriptCharset: "utf-8",
    data: JSON.stringify(data),
  })
    .done(() => {
      getData();
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

$(document).ready(function() {
  getData();
});

function getData() {
  $.ajax({
    url: baseURL + "/api/users",
    dataType: "json",
  }).done((data) => {
    drawTable(data);
  });
}

$("#search").click(function() {
  $(".table tbody").append("");

  const userId = document.getElementById("userId").value;
  $.ajax({
    url: baseURL + "/api/users/" + userId,
    dataType: "json",
  })
    .done((data) => {
      let dataArr = [];
      dataArr.push(data);
      drawTable(dataArr);
    })
    .fail(() => {
      alert("エラーが発生しました。");
    });
});

function drawTable(data) {
  $(".table tbody").empty();
  let html = "";
  for (let i = 0; i < data.length; i++) {
    //html += '<tr><td>' + data[i].id + '</td><td>' + data[i].username + '</td><td>' + data[i].email + '</td><td><button id="edit" class="btn btn-success">編集</button></td><td><button id="delete" class="btn btn-danger">削除</button></td></tr>';
    html +=
      "<tr><td>" +
      data[i].id +
      "</td><td>" +
      data[i].username +
      "</td><td>" +
      data[i].email +
      "</td></tr>";
  }
  $(".table tbody").append(html);
}

$("#edit").click(function() {
  const userId = document.getElementById("patchUserId").value;
  const patchUserName = document.getElementById("patchUserName").value;
  const patchUserEmail = document.getElementById("patchUserEmail").value;
  const patchData = {};
  if (patchUserName) {
    patchData["username"] = patchUserName;
  }
  if (patchUserEmail) {
    patchData["email"] = patchUserEmail;
  }
  console.log(patchData);
  $.ajax({
    url: baseURL + "/api/users/" + userId,
    type: "patch",
    data: JSON.stringify(patchData),
  })
    .done((data) => {
      alert("変更完了しました。");
      getData();
    })
    .fail(() => {
      alert("エラーが発生しました。");
    });
});

$("#delete").click(function() {
  const userId = document.getElementById("deleteUserId").value;
  $.ajax({
    url: baseURL + "/api/users/" + userId,
    type: "delete",
  })
    .done((data) => {
      alert("削除しました。");
      getData();
    })
    .fail(() => {
      alert("エラーが発生しました。");
    });
});
