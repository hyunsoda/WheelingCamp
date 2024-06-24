// console.log("연결");

const websocket = new WebSocket("ws://localhost:80/webSock");

websocket.onmessage = onMessage;

// 입장한 방 번호
let roomNo = 0;
// 보낸 사람의 번호를 저장할 변수
let userSenderNo = 0;
// 채팅방 번호저장할 변수
let mainChattingNo = 0;

const userMain = document.getElementById("userMain");
const roomList = document.getElementById("roomList");

const username = memberName;
const userNo = memberNo;
const chattingRoom = document.getElementById("chattingRoom");

const sendButton = document.getElementById("button-send");

// 관리자
const viewChat = document.getElementById("chattingRoom");
const sendBtn = document.getElementById("sendBtn");

// 관리자 전용
// 채팅방 목록을 조회하는 함수
function selectRoomList() {
  fetch("/chat/roomList")
    .then((resp) => resp.json())
    .then((result) => {
      if (userMain != null) {
        roomList.innerHTML = "";

        result.forEach((rest) => {
          mainHtml = `
            <div class="messageChat">
                <button
                  class="inBtn"
                  value="${rest.targetNo}"
                  onclick="chatRoom(${rest.chattingNo}, ${rest.targetNo})"
                >
                <!-- 입장버튼 -->
                `;
          if (targetNo == rest.targetNo) {
            mainHtml += `<i class="fa-solid fa-comment"></i>`;
          } else {
            mainHtml += `<i class="fa-regular fa-comment"></i>`;
          }

          mainHtml += `
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
                      <span class="lastMessage">`;

          if (rest.lastMessage != null) {
            mainHtml += `${rest.lastMessage}`;
          } else {
            mainHtml += "채팅 시작하기";
          }
          mainHtml += `</span>
                      <span class="sendTime">`;

          if (rest.lastMessage != null) {
            mainHtml += `${rest.sendTime}`;
          } else {
            mainHtml += "대화기록없음";
          }

          mainHtml += `</span>
                    </div>
                  </div>
                </div>
              </div>`;

          roomList.innerHTML += mainHtml;
        });
      }
    });
}

// 유저의 채팅방을 새로고침
function userChatList() {
  fetch("/chat/userChatRoom", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ chattingNo: chattingRoomNo }),
  })
    .then((resp) => resp.json())
    .then((result) => {
      const chatContainer = document.getElementById("chattingRoom");
      chatContainer.innerHTML = ""; // 기존 내용 지우기

      result.forEach((chat) => {
        const chatDiv = document.createElement("div");
        chatDiv.className =
          chat.senderNo !== userNo ? "yourChatDiv" : "myChatDiv";

        const nameSpan = document.createElement("span");
        nameSpan.className = "nameSpan";
        nameSpan.textContent = chat.senderName;

        const answerDiv = document.createElement("div");
        answerDiv.className = chat.senderNo !== userNo ? "yourChat" : "myChat";
        answerDiv.classList.add("answerDiv");
        answerDiv.textContent = chat.messageContent;

        const sendTimeSpan = document.createElement("span");
        sendTimeSpan.className = "sendTimeChar";
        sendTimeSpan.textContent = chat.sendTimeChar;

        chatDiv.appendChild(nameSpan);
        chatDiv.appendChild(answerDiv);
        chatDiv.appendChild(sendTimeSpan);

        chatContainer.appendChild(chatDiv);
      });
    });
}

if (userNo != null) {
  if (userNo == 1) {
    mainChattingNo = -1;
  } else {
    mainChattingNo = document.getElementById("button-send").value;
  }
}

let msg = document.getElementById("msg");
let usermsg = document.getElementById("usermsg");

// 메세지 전송하는 함수
function insertMessage(obj) {
  fetch("/chat/insertMessage", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(obj),
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

  // console.log(obj);
  // 관리자가 보내는 거라면
  if (chattingNo == 0) {
    obj.chattingNo = mainChattingNo;
  }

  message.value = "";

  insertMessage(obj);
  websocket.send(JSON.stringify(obj));

  selectRoomList();
}

if (sendButton != null) {
  sendButton.addEventListener("click", (e) => {
    send(e.target.value);

    usermsg.focus();
  });
}

function onMessage(msg) {
  var data = JSON.parse(msg.data);
  // console.log("메세지 옴");

  // console.log(data.chattingNo);
  // console.log(data.targetNo);
  // console.log(data.senderNo);
  // console.log(userNo);

  userSenderNo = data.senderNo;

  if (data.targetNo != userNo && data.senderNo != userNo) {
    return;
  }

  // 관리자면
  if (userNo == 1 && roomNo != data.chattingNo && roomNo != 0) {
    selectRoomList();
    return;
  }

  if (data.chattingNo == roomNo) {
    readCountZero(data.senderNo, data.chattingNo);
  }

  // console.log("roomNo : " + roomNo);

  const chatDiv = document.createElement("div");
  const nameSpan = document.createElement("span");
  const answerDiv = document.createElement("div");
  const answer = document.createElement("span");
  const sendTime = document.createElement("span");

  chatDiv.classList.add("chatDiv");
  answer.classList.add("answer");
  answerDiv.classList.add("answerDiv");
  nameSpan.classList.add("nameSpan");
  sendTime.classList.add("sendTimeChar");

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

  selectRoomList();

  scrollUnder(chattingRoom);
}

function scrollUnder(chattingRoom) {
  chattingRoom.scrollTop = chattingRoom.scrollHeight;
}

function readCountZero(senderNo, chattingNo) {
  // console.log("읽음 처리");
  fetch("/chat/readTalk", {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    body: JSON.stringify({
      senderNo: senderNo,
      chattingNo: chattingNo,
    }),
  });

  selectRoomList();
}

////////////////////////////////////// 공통 ////////////////////////////////////////////
// 기존에 있는 채팅방을 비운 뒤 클릭한 채팅방의 정보를 불러와서 채우기

function chatRoom(chattingNo, tarNo) {
  // senderName.innerText = nickName;
  roomNo = chattingNo;

  targetNo = tarNo; // 전역변수에 있는 targetNo에 저장

  document.getElementById("viewChat").style.display = "block";

  mainChattingNo = chattingNo;

  const chattingRoom = document.getElementById("chattingRoom");

  // 읽음으로 처리

  readCountZero(tarNo, mainChattingNo);

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
      chattingRoom.innerHTML = "";

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
    <span class="sendTimeChar">${res.sendTimeChar}</span>
  </div>
`;

        chattingRoom.innerHTML += viewHtml;
      });
    });

  // 화면 맨 밑으로 내리는 함수
  scrollUnder(chattingRoom);
  // chattingRoom.scrollTop = chattingRoom.scrollHeight;

  if (userNo == 1) {
    // 채팅 목록 새로고침 함수
    selectRoomList();
  }

  const viewChat = document.getElementById("viewChat");
  viewChat.style.display = "block";
}

/////////////////////////////////////////////////////////////////////////////////////////

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

const chatTool = document.querySelector(".chatTool");

function showElement() {
  chatTool.style.display = "block"; // display: block으로 설정하여 보이도록 함
  setTimeout(() => {
    chatTool.classList.remove("hidden");
    chatTool.classList.add("visible"); // opacity를 1로 설정하여 천천히 나타나게 함
  }, 10); // 약간의 지연을 두어 display 설정 후 transition이 적용되도록 함
}

function hideElement() {
  targetNo = -1;
  chatTool.classList.remove("visible");
  chatTool.classList.add("hidden"); // opacity를 0으로 설정하여 천천히 사라지게 함
  setTimeout(() => {
    chatTool.style.display = "none"; // 애니메이션이 완료된 후 display: none 설정
  }, 200); // 0.2초 후에 실행 (transition 시간과 일치)
}

function hideChatRoom() {
  const chattingRoom = document.querySelector(".chattingRoom");
  const viewChat = document.getElementById("viewChat");
  viewChat.style.display = "none";
  chattingRoom.innerHTML = "";

  roomNo = 0;
  targetNo = -1;

  selectRoomList();
}

if (userNo != null) {
  document.addEventListener("DOMContentLoaded", () => {
    if (userNo == 1) {
      selectRoomList();
    } else {
      userChatList();
    }

    const chatView = document.getElementById("chattingRoom");

    chatView.scrollTop = chatView.scrollHeight;
  });
}
