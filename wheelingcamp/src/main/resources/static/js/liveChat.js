// console.log("연결");

const userMain = document.getElementById("userMain");

const username = memberName;
const userNo = memberNo;
const chattingRoom = document.getElementById("chattingRoom");

const sendButton = document.getElementById("button-send");

// 관리자
const viewChat = document.getElementById("chattingRoom");
const sendBtn = document.getElementById("sendBtn");

// 채팅방 목록을 조회하는 함수
function selectRoomList() {
  fetch("/chat/roomList")
    .then((resp) => resp.json())
    .then((result) => {
      if (userMain != null) {
        userMain.innerHTML = "";
        result.forEach((rest) => {
          mainHtml = `
            <div class="messageChat">
                <button
                  value="${rest.targetNo}"
                  onclick="chatRoom(${rest.chattingNo}, ${rest.targetNo})"
                >
                  입장
                </button>
                <!-- 안 읽은 카톡 개수 -->
                <div `;

          if (rest.notReadCount > 0) {
            mainHtml += `class="notReadCount"`;
          } else {
            mainHtml += `class="readCount"`;
          }
          mainHtml += `>
                  <span class="notRead"`;

          mainHtml += `>${rest.notReadCount}</span>
                </div>
                <div>
                  <!-- 이름 -->
                  <div class="targetName">
                    ${rest.targetNickName}
                  </div>
                  <!-- 마지막 메세지 -->
                  <div class="chatInfo">
                    <!-- 마지막 메세지 -->
                    <div class="message">
                      <span class="lastMessage">
                        ${rest.lastMessage}
                      </span>
                      <span class="sendTime">
                        ${rest.sendTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>`;

          userMain.innerHTML += mainHtml;
        });
      }
    });
}

let mainChattingNo;
if (memberNo == 1) {
  mainChattingNo = -1;
} else {
  mainChattingNo = document.getElementById("button-send").value;
}

let msg = document.getElementById("msg");
let usermsg = document.getElementById("usermsg");

// 메세지 전송하는 함수
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

let targetNo = -1;

function send(chattingNo) {
  let message;

  if (memberNo == 1) {
    message = msg;
  } else {
    message = usermsg;
  }

  if (mainChattingNo == -1) {
    alert("채팅방을 입장해주세요");
    return;
  }

  if (message.value == "") {
    return;
  }

  const obj = {
    message: message.value,
    senderNo: userNo,
    senderName: memberName,
    chattingNo: chattingNo,
    targetNo: memberNo == 1 ? targetNo : 1,
  };

  console.log(obj);
  // 관리자가 보내는 거라면
  if (chattingNo == 0) {
    obj.chattingNo = mainChattingNo;
  }

  message.value = "";

  insertMessage(obj);
  websocket.send(JSON.stringify(obj));

  selectRoomList();
}

const websocket = new WebSocket("ws://localhost:8080/webSock");

websocket.onmessage = onMessage;

if (sendButton != null) {
  sendButton.addEventListener("click", (e) => {
    send(e.target.value);

    usermsg.focus();
  });
}

function onMessage(msg) {
  var data = JSON.parse(msg.data);
  console.log("메세지 옴");

  console.log(data.targetNo);
  console.log(data.senderNo);
  console.log(userNo);
  if (data.targetNo != userNo && data.senderNo != userNo) {
    return;
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

  nameSpan.innerText = data.senderName;
  answer.innerText = data.message;

  if (nameSpan.innerText == memberName) {
    answerDiv.classList.add("myChat");
    chatDiv.classList.add("myChatDiv");
  } else {
    answerDiv.classList.add("yourChat");
    chatDiv.classList.add("yourChatDiv");
  }

  chatDiv.appendChild(nameSpan);
  answerDiv.appendChild(answer);
  chatDiv.appendChild(answerDiv);

  chattingRoom.appendChild(chatDiv);

  chattingRoom.scrollTop = chattingRoom.scrollHeight;

  selectRoomList();
}

function readCountZero(senderNo, chattingNo) {
  fetch("/chat/readTalk", {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    body: JSON.stringify({
      senderNo: senderNo,
      chattingNo: chattingNo,
    }),
  })
    .then((resp) => resp.text())
    .then((result) => {
      console.log(result);
    });

  selectRoomList();
}

// 기존에 있는 채팅방을 비운 뒤 클릭한 채팅방의 정보를 불러와서 채우기
function chatRoom(chattingNo, tarNo) {
  document.getElementById("viewChat").style.display = "block";

  targetNo = tarNo;
  mainChattingNo = chattingNo;

  // 읽음으로 처리
  readCountZero(targetNo, mainChattingNo);

  if (mainChattingNo != -1) {
    msg.disabled = false;
    chattingRoom.innerHtml = "";
  } else {
    return;
  }

  fetch("/chat/chatRoom", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ chattingNo: chattingNo }),
  })
    .then((resp) => resp.json())
    .then((result) => {
      // 보여지는 화면을 비움
      viewChat.innerHTML = "";

      result.forEach((res) => {
        // 내가 보낸 거라면
        if (res.senderNo == memberNo) {
          viewHtml = `<div class="chatDiv myChatDiv">`;
        } else {
          // 아니라면
          viewHtml = `<div class="chatDiv yourChatDiv">`;
        }

        viewHtml += `
    <span class="nameSpan">${res.senderName}</span>
        
`;
        if (res.senderNo == memberNo) {
          viewHtml += `<div class="answerDiv myChat">`;
        } else {
          // 아니라면
          viewHtml += `<div class="answerDiv yourChat">`;
        }

        viewHtml += `
    <span class="answer">${res.messageContent}</span>
    </div>
  </div>
`;

        viewChat.innerHTML += viewHtml;
      });
    });

  chattingRoom.scrollTop = chattingRoom.scrollHeight;
}

if (usermsg != null) {
  usermsg.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
      send(mainChattingNo);
      usermsg.value = "";
    }
  });
}

if (msg != null) {
  msg.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
      send(mainChattingNo);
      msg.value = "";
    }
  });
}
