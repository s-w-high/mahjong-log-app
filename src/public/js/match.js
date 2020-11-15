const baseURL = "http://localhost:3000";
let count = 0;

function getData() {
  $.ajax({
    url: baseURL + "/api/match-logs",
    dataType: "json",
  }).done((data) => {
    drawTable(data);
  });
}

function drawTable(data) {
  $(".table tbody").empty();
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html +=
      "<tr><td>" +
      count +
      "</td><td>" +
      data[i].eastpoint +
      "</td><td>" +
      data[i].southpoint +
      "</td><td>" +
      data[i].westpoint +
      "</td><td>" +
      data[i].northpoint +
      "</td></tr>";
  }
  $(".table tbody").append(html);
}

$("form").submit(function() {
  const userData = $("form").serializeArray();

  let east = document.getElementById("eastUser");
  east.innerHTML = userData[0].value;
  let south = document.getElementById("southUser");
  south.innerHTML = userData[1].value;
  let west = document.getElementById("westUser");
  west.innerHTML = userData[2].value;
  let north = document.getElementById("northUser");
  north.innerHTML = userData[3].value;

  return false;
});

$("#match").submit(function() {
  let matchData = $("#match").serializeArray();
  matchData = parseJson(matchData);

  $.ajax({
    url: baseURL + "/api/match-logs",
    type: "post",
    dataType: "json",
    contentType: "application/json",
    scriptCharset: "utf-8",
    data: JSON.stringify(matchData),
  })
    .done(() => {
      alert("登録完了しました！");
      count++;
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
  returnJson["created"] = Date.now();
  return returnJson;
};

//   eastuser: {
//     id: "1",
//   },
//   southuser: {
//     id: "4",
//   },
//   westuser: {
//     id: "2",
//   },
//   northuser: {
//     id: "6",
//   },
//   eastuserpoint: 60,
//   southuserpoint: 5,
//   westuserpoint: -15,
//   northuserpoint: -50,
//   created: "2020-11-13",
