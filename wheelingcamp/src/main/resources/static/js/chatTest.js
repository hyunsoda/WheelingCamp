// console.log("연결");

const username = memberName;
const userNo = memberNo;
const chattingRoom = document.getElementById("chattingRoom");
const sendButton = document.getElementById("button-send");

let msg = document.getElementById("msg");

function insertMessage(obj) {
  fetch("/chat/insertMessage", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(obj),
  })
    .then((resp) => resp.text())
    .then((result) => {
      if (result > 0) {
        console.log("전송 성공");
      } else {
        console.log("전송 실패");
      }
    });
}

function send(chattingNo) {
  //   console.log(username + ":" + msg.value);
  websocket.send(username + ":" + msg.value);

  const obj = {
    message: msg.value,
    senderNo: userNo,
    chattingNo: chattingNo,
  };
  msg.value = "";
  console.log(obj);

  insertMessage(obj);
}

const websocket = new WebSocket("ws://localhost:8080/webSock");

websocket.onmessage = onMessage;
websocket.onopen = onOpen;
websocket.onclose = onClose;

if (sendButton != null) {
  sendButton.addEventListener("click", (e) => {
    send(e.target.value);
    msg.focus();
  });
}

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

  const chatDiv = document.createElement("div");
  const nameSpan = document.createElement("span");
  const answerDiv = document.createElement("div");
  const answer = document.createElement("span");
  // const br = document.createElement("br");

  chatDiv.classList.add("chatDiv");
  answer.classList.add("answer");
  answerDiv.classList.add("answerDiv");
  nameSpan.classList.add("nameSpan");

  nameSpan.innerText = arr[0];
  answer.innerText = arr[1];

  if (nameSpan.innerText == memberName) {
    answerDiv.classList.add("myChat");
    chatDiv.classList.add("myChatDiv");
  } else {
    answerDiv.classList.add("yourChat");
    chatDiv.classList.add("yourChatDiv");
  }

  chatDiv.appendChild(nameSpan);
  // chatDiv.appendChild(br);
  answerDiv.appendChild(answer);
  chatDiv.appendChild(answerDiv);

  chattingRoom.appendChild(chatDiv);

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
