const baseURL = "http://localhost:3000";
function getAllTeam() {
  $.ajax({
    url: baseURL + "/api/teams",
    dataType: "json",
  })
    .done((data) => {
      $("#getAllTeam").empty();
      $("#getAllTeam").append(JSON.stringify(data));
    })
    .fail(() => {
      alert("エラーが発生しました。");
    });
}

function getTeam() {
  $.ajax({
    url: baseURL + "/api/teams/1",
    dataType: "json",
  })
    .done((data) => {
      $("#getTeam").empty();
      $("#getTeam").append(JSON.stringify(data));
    })
    .fail(() => {
      alert("エラーが発生しました。");
    });
}

function addTeam() {
  $.ajax({
    url: baseURL + "/api/teams",
    type: "post",
    contentType: "application/json",
    scriptCharset: "utf-8",
    data: JSON.stringify({
      teamname: "test",
    }),
  })
    .done((data, status, xhr) => {
      $("#addTeam").empty();
      $("#addTeam").append("status:" + xhr.status);
    })
    .fail(() => {
      alert("エラーが発生しました。");
    });
}

function updateTeam() {
  $.ajax({
    url: baseURL + "/api/teams/4",
    type: "patch",
    data: {
      teamname: "test",
    },
  })
    .done((data, status, xhr) => {
      $("#updateTeam").empty();
      $("#updateTeam").append("status:" + xhr.status);
    })
    .fail(() => {
      alert("エラーが発生しました。");
    });
}
function deleteTeam() {
  $.ajax({
    url: baseURL + "/api/teams/2",
    type: "delete",
  }).done((data, status, xhr) => {
    $("#deleteTeam").empty();
    $("#deleteTeam").append("status:" + xhr.status);
  });
}
function getAllUser() {
  $.ajax({
    url: baseURL + "/api/users",
    dataType: "json",
  })
    .done((data) => {
      $("#getAllUser").empty();
      $("#getAllUser").append(JSON.stringify(data));
    })
    .fail(() => {
      alert("エラーが発生しました。");
    });
}

function getUser() {
  $.ajax({
    url: baseURL + "/api/users/10",
    dataType: "json",
  })
    .done((data) => {
      $("#getUser").empty();
      $("#getUser").append(JSON.stringify(data));
    })
    .fail(() => {
      alert("エラーが発生しました。");
    });
}

function getUserByTeam() {
  $.ajax({
    url: baseURL + "/api/users/team/1",
    dataType: "json",
  })
    .done((data) => {
      $("#getUserByTeam").empty();
      $("#getUserByTeam").append(JSON.stringify(data));
    })
    .fail(() => {
      alert("エラーが発生しました。");
    });
}

function addUser() {
  $.ajax({
    url: baseURL + "/api/users",
    type: "post",
    dataType: "json",
    contentType: "application/json",
    scriptCharset: "utf-8",
    data: JSON.stringify({
      username: "test",
      email: "test@test.com",
      password: "xxxxxx",
    }),
  })
    .done((data, status, xhr) => {
      $("#addUser").empty();
      $("#addUser").append("status:" + xhr.status);
    })
    .fail(() => {
      alert("エラーが発生しました。");
    });
}

function updateUser() {
  $.ajax({
    url: baseURL + "/api/users/4",
    type: "patch",
    data: {
      username: "test",
    },
  })
    .done((data, status, xhr) => {
      console.log(data);
      $("#updateUser").empty();
      $("#updateUser").append("status:" + xhr.status);
    })
    .fail(() => {
      alert("エラーが発生しました。");
    });
}
function deleteUser() {
  $.ajax({
    url: baseURL + "/api/users/2",
    type: "delete",
  }).done((data, status, xhr) => {
    $("#deleteUser").empty();
    $("#deleteUser").append("status:" + xhr.status);
  });
}

function getAllMatchLog() {
  $.ajax({
    url: baseURL + "/api/match-logs",
    dataType: "json",
  }).done((data) => {
    $("#getAllMatchLog").empty();
    $("#getAllMatchLog").append(JSON.stringify(data));
  });
}

function getMatchLog() {
  $.ajax({
    url: baseURL + "/api/users/10/match-logs",
    dataType: "json",
  }).done((data) => {
    $("#getMatchLog").empty();
    $("#getMatchLog").append(JSON.stringify(data));
  });
}

function getOneMatchLog() {
  $.ajax({
    url: baseURL + "/api/users/10/match-logs/8",
    dataType: "json",
  }).done((data) => {
    $("#getOneMatchLog").empty();
    $("#getOneMatchLog").append(JSON.stringify(data));
  });
}

function addMatchLog() {
  $.ajax({
    url: baseURL + "/api/match-logs",
    type: "post",
    dataType: "json",
    contentType: "application/json",
    scriptCharset: "utf-8",
    data: JSON.stringify({
      eastuser: {
        id: "1",
      },
      southuser: {
        id: "2",
      },
      westuser: {
        id: "3",
      },
      northuser: {
        id: "4",
      },
      eastuserpoint: 60,
      southuserpoint: 5,
      westuserpoint: -15,
      northuserpoint: -50,
      created: "2020-11-13",
    }),
  })
    .done((data, status, xhr) => {
      $("#addMatchLog").empty();
      $("#addMatchLog").append("status:" + xhr.status);
    })
    .fail(() => {
      alert("エラーが発生しました。");
    });
}

function updateMatchLog() {
  $.ajax({
    url: baseURL + "/api/match-logs/2",
    type: "patch",
    data: {
      eastuserpoint: 50,
      southuserpoint: 5,
      westuserpoint: -5,
      northuserpoint: -50,
    },
  })
    .done((data, status, xhr) => {
      $("#updateMatchLog").empty();
      $("#updateMatchLog").append("status:" + xhr.status);
    })
    .fail(() => {
      alert("エラーが発生しました。");
    });
}
function deleteMatchLog() {
  $.ajax({
    url: baseURL + "/api/match-logs/3",
    type: "delete",
  }).done((data, status, xhr) => {
    $("#deleteMatchLog").empty();
    $("#deleteMatchLog").append("status:" + xhr.status);
  });
}
