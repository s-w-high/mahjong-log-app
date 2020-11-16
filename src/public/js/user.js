const baseURL = "http://localhost:3000";
let team = {};

$("form").submit(function() {
  var data = $("form").serializeArray();
  data = parseJson(data);

  $.ajax({
    url: baseURL + "/api/users",
    type: "post",
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
  getTeamData();
});

function getData() {
  $.ajax({
    url: baseURL + "/api/users",
    dataType: "json",
  }).done((data) => {
    console.log(data);
    drawTable(data);
  });
}

function getTeamData() {
  $.ajax({
    url: baseURL + "/api/teams",
    dataType: "json",
  }).done((data) => {
    let html = "";
    for (let i = 0; i < data.length; i++) {
      html +=
        '<option value="' + data[i].id + '"> ' + data[i].teamname + "</option>";
    }
    $("#teamId").append(html);
    team = data;
  });
}

$("#searchUser").click(function() {
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

$("#searchTeam").click(function() {
  $(".table tbody").append("");

  const teamId = document.getElementById("teamId").value;
  $.ajax({
    url: baseURL + "/api/users/team/" + teamId,
    dataType: "json",
  })
    .done((data) => {
      drawTable(data);
    })
    .fail(() => {
      alert("エラーが発生しました。");
    });
});

function drawTable(data) {
  $(".table tbody").empty();

  let html = "";
  for (let i = 0; i < data.length; i++) {
    let team = "";
    if (data[i].team) {
      team = data[i].team.teamname;
    }
    html +=
      "<tr><td>" +
      data[i].id +
      "</td><td>" +
      data[i].username +
      "</td><td>" +
      team +
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
  $.ajax({
    url: baseURL + "/api/users/" + userId,
    type: "patch",
    data: patchData,
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
