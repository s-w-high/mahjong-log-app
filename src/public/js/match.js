const baseURL = "http://localhost:3000";
let user = {};

function getData() {
  $.ajax({
    url: baseURL + "/api/match-logs",
    dataType: "json",
  }).done((data) => {
    drawTable(data);
    viewGrade(data);
  });
}

function viewGrade(data) {
  // デモ用にsakaiがeastuserだとして計算する
  const matchLog = data.map((matchData) => {
    return matchData["eastuserpoint"];
  });
  let gradeArr = [];
  for (let i = 0; i < data.length; i++) {
    let rank = 1;
    const point = data[i].eastuserpoint;
    let arr = [
      data[i].eastuserpoint,
      data[i].southuserpoint,
      data[i].westuserpoint,
      data[i].northuserpoint,
    ];
    let sortArr = arr.sort((a, b) => {
      return b - a;
    });
    if (sortArr.indexOf(point) == 0) {
      rank = 1;
    } else if (sortArr.indexOf(point) == 1) {
      rank = 2;
    } else if (sortArr.indexOf(point) == 2) {
      rank = 3;
    } else {
      rank = 4;
    }
    gradeArr.push(rank);
  }
  let html =
    "<tr><td>" +
    gradeArr.filter((grade) => {
      return grade == 1;
    }).length +
    "</td><td>" +
    gradeArr.filter((grade) => {
      return grade == 2;
    }).length +
    "</td><td>" +
    gradeArr.filter((grade) => {
      return grade == 3;
    }).length +
    "</td><td>" +
    gradeArr.filter((grade) => {
      return grade == 4;
    }).length +
    "</td></tr>";

  $("#grade tbody").append(html);
}

function drawTable(data) {
  $(".table tbody").empty();
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html +=
      "<tr><td></td><td>" +
      data[i].eastuserpoint +
      "</td><td>" +
      data[i].southuserpoint +
      "</td><td>" +
      data[i].westuserpoint +
      "</td><td>" +
      data[i].northuserpoint +
      '</td><td><img src="./img/edit.png" style="width:20px; height:20px"></td><td><img src="./img/delete.png" style="width:20px; height:20px"></td></tr>';
  }
  $("#match tbody").append(html);
}

$(document).ready(function() {
  getUserData();
});

$("form").submit(function() {
  const userData = $("form").serializeArray();

  const east = document.getElementById("eastUser");
  const south = document.getElementById("southUser");
  const west = document.getElementById("westUser");
  const north = document.getElementById("northUser");

  user.forEach((user) => {
    if (user.id == userData[0].value) east.innerHTML = user.username;
    if (user.id == userData[1].value) south.innerHTML = user.username;
    if (user.id == userData[2].value) west.innerHTML = user.username;
    if (user.id == userData[3].value) north.innerHTML = user.username;
  });
  return false;
});

$("#match").submit(function() {
  // useridを取得
  const eastUser = { id: document.getElementById("eastUserSelect").value };
  const southUser = { id: document.getElementById("southUserSelect").value };
  const westUser = { id: document.getElementById("westUserSelect").value };
  const northUser = { id: document.getElementById("northUserSelect").value };

  let matchData = $("#match").serializeArray();
  matchData = parseJson(matchData);
  matchData["eastuser"] = eastUser;
  matchData["southuser"] = southUser;
  matchData["westuser"] = westUser;
  matchData["northuser"] = northUser;
  matchData["created"] = new Date();

  $.ajax({
    url: baseURL + "/api/match-logs",
    type: "post",
    contentType: "application/json",
    scriptCharset: "utf-8",
    data: JSON.stringify(matchData),
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

function getUserData() {
  $.ajax({
    url: baseURL + "/api/users",
    dataType: "json",
  }).done((data) => {
    let html = "";
    for (let i = 0; i < data.length; i++) {
      html +=
        '<option value="' + data[i].id + '"> ' + data[i].username + "</option>";
    }
    $("#eastUserSelect").append(html);
    $("#southUserSelect").append(html);
    $("#westUserSelect").append(html);
    $("#northUserSelect").append(html);
    user = data;
  });
}
