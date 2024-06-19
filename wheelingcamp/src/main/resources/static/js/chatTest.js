// console.log("연결");

const username = memberName;
const chattingRoom = document.getElementById("chattingRoom");

let msg = document.getElementById("msg");

function send() {
  //   console.log(username + ":" + msg.value);
  websocket.send(username + ":" + msg.value);
  msg.value = "";
}

const websocket = new WebSocket("ws://localhost:8080/webSock");

websocket.onmessage = onMessage;
websocket.onopen = onOpen;
websocket.onclose = onClose;

document.getElementById("button-send").addEventListener("click", () => {
  send();

  msg.focus();
});

//채팅창에서 나갔을 때
function onClose(evt) {
  var str = username + ": 님이 방을 나가셨습니다.";
  websocket.send(str);
}

//채팅창에 들어왔을 때
function onOpen(evt) {
  var str = username + "님이 입장하셨습니다.";

  const answer = document.createElement("div");
  answer.innerText = str;

  chattingRoom.appendChild(answer);

  //   websocket.send(str);
}

function onMessage(msg) {
  var data = msg.data;
  var sessionId = null;
  //데이터를 보낸 사람
  var message = null;
  var arr = data.split(":");

  for (var i = 0; i < arr.length; i++) {
    console.log(arr[0] + " : " + arr[1]);
  }

  const answerDiv = document.createElement("div");
  const nameSpan = document.createElement("span");
  const answer = document.createElement("span");

  answerDiv.classList.add("answerDiv");
  answer.classList.add("answer");

  nameSpan.innerText = arr[0];
  answer.innerText = arr[1];

  answerDiv.appendChild(nameSpan);
  answerDiv.appendChild(answer);

  chattingRoom.appendChild(answerDiv);

  chattingRoom.scrollTop = chattingRoom.scrollHeight;

  var cur_session = username;

  //현재 세션에 로그인 한 사람
  //   console.log("cur_session : " + cur_session);
  //   sessionId = arr[0];
  //   message = arr[1];

  //   console.log("sessionID : " + sessionId);
  //   console.log("cur_session : " + cur_session);

  //   //로그인 한 클라이언트와 타 클라이언트를 분류하기 위함
  //   if (sessionId == cur_session) {
  //     var str = "<div class='col-6'>";
  //     str += "<div class='alert alert-secondary'>";
  //     str += "<b>" + sessionId + " : " + message + "</b>";
  //     str += "</div></div>";
  //     $("#msgArea").append(str);
  //   } else {
  //     var str = "<div class='col-6'>";
  //     str += "<div class='alert alert-warning'>";
  //     str += "<b>" + sessionId + " : " + message + "</b>";
  //     str += "</div></div>";
  //     $("#msgArea").append(str);
  //   }
}
