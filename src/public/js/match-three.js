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
  let rankArr = [];
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    let rank = 1;
    const point = data[i].eastuserpoint;
    let arr = [
      data[i].eastuserpoint,
      data[i].southuserpoint,
      data[i].westuserpoint,
    ];
    let sortArr = arr.sort((a, b) => {
      return b - a;
    });
    if (sortArr.indexOf(point) == 0) {
      rank = 1;
    } else if (sortArr.indexOf(point) == 1) {
      rank = 2;
    } else {
      rank = 3;
    }
    rankArr.push(rank);
    total += data[i].eastuserpoint;
  }

  let gradeArr = [];
  for (let i = 1; i <= 3; i++) {
    gradeArr.push(
      rankArr.filter((rank) => {
        return rank == i;
      }).length
    );
  }

  let rankHtml =
    "<tr><td>" +
    gradeArr[0] +
    "</td><td>" +
    gradeArr[1] +
    "</td><td>" +
    gradeArr[2] +
    "</td></tr>";

  $("#rank tbody").append(rankHtml);

  const goodRate = (gradeArr[0] * 100) / data.length; //トップ率
  const addGrade =
    (gradeArr[0] * 1 + gradeArr[1] * 2 + gradeArr[2] * 3) / data.length; //平均着順
  const avoidForthRankRate = ((gradeArr[0] + gradeArr[1]) * 100) / data.length; // 3着回避率

  let gradeHtml =
    "<tr><td>" +
    goodRate.toFixed(2) +
    "%</td><td>" +
    addGrade.toFixed(2) +
    "</td><td>" +
    avoidForthRankRate.toFixed(2) +
    "%</td><td>" +
    total +
    "</td></tr>";

  $("#grade tbody").append(gradeHtml);
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

  user.forEach((user) => {
    if (user.id == userData[0].value) east.innerHTML = user.username;
    if (user.id == userData[1].value) south.innerHTML = user.username;
    if (user.id == userData[2].value) west.innerHTML = user.username;
  });
  return false;
});

$("#match").submit(function() {
  // useridを取得
  const eastUser = { id: document.getElementById("eastUserSelect").value };
  const southUser = { id: document.getElementById("southUserSelect").value };
  const westUser = { id: document.getElementById("westUserSelect").value };

  let matchData = $("#match").serializeArray();
  matchData = parseJson(matchData);
  matchData["eastuser"] = eastUser;
  matchData["southuser"] = southUser;
  matchData["westuser"] = westUser;
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
    user = data;
  });
}
