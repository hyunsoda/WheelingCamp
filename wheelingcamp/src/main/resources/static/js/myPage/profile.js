// 필수 유효성 검사를 위한 객체
const updateObj = {
  memberEmail: false, // 이메일
  memberNickName: false, // 닉네임
  memberName: false, // 실명
  memberPhoneNo: false, // 휴대폰 번호
  memberBirth: false, // 생년월일
};

// 입력받은 회원 정보 (input) 객체
const inputUpdateObj = {
  memberEmail: document.getElementById("memberEmail"), // 입력 이메일
  memberNickName: document.getElementById("memberNickName"), // 입력 닉네임
  memberName: document.getElementById("memberName"), // 입력 실명
  memberPhoneNo: document.getElementById("memberPhoneNo"), // 입력 휴대폰 번호
  memberBirth: document.getElementById("memberBirth"), // 입력 생년월일
};

// 메시지 출력용 span
const messageObj = {
  memberEmail: document.getElementById("emailMessage"), // 이메일 유효성 검사 메시지
  memberNickName: document.getElementById("nickNameMessage"), // 닉네임 유효성 검사 메시지
  memberName: document.getElementById("nameMessage"), // 실명 유효성 검사 메시지
  memberPhoneNo: document.getElementById("phoneNoMessage"), // 휴대폰 번호 유효성 검사 메시지
  memberBirth: document.getElementById("birthMessage"), // 생년월일 유효성 검사 메시지
};

// 유효성 검사용 정규식
const updateReqObj = {
  memberEmail:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
  memberNickName: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/, // 닉네임 유효성 검사
  memberName: /^[가-힣]{2,6}$/, // 이름 유효성 검사
  memberPhoneNo: /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/, // 전화번호 유효성 검사
  memberBirth:
    /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/, // 생년월일 유효성 검사
};

// 이메일 변경클릭시 인증번호 요청 나오게 하기
emailBtn.addEventListener("click", (e) => {
  emailDiv.setAttribute("style", "pointer-events:auto");
  authKeyBtn.setAttribute("style", "display:block");
  emailBtn.setAttribute("style", "display : none");
});

for (const key in inputUpdateObj) {
  if (inputUpdateObj[key].value != null) {
    inputUpdateObj[key].addEventListener("input", (e) => {
      // 빈칸 입력시 공백 제거
      console.log("inputUpdateObj");
      if (e.target.value.trim().length == 0) {
        if (messageObj[key] != null) {
          messageObj[key].innerText = "";
        }

        e.target.value = "";

        return;
      }

      if (updateReqObj[key] != null) {
        // 유효성 검사를 해야하는 요소일 때
        // 유효성 검사 실행
        if (!updateReqObj[key].test(e.target.value)) {
          // 유효하지 않을 때
          messageObj[key].innerText = "유효한 형식이 아닙니다.";
          updateObj[key] = false;
          return;
        }

        // 유효성 검사 성공 메시지를 띄움
        messageObj[key].innerText = "유효한 형식입니다.";

        // 유효성 검사 객체의 값을 변경
        updateObj[key] = true;
      }
    });
  }
}

// 내 정보 수정 데이터 form 요소
document.getElementById("profileForm").addEventListener("submit", (e) => {
  // 유효성 검사 객체의 요소들이 모두 true 인지 검사
  for (const key in updateObj) {
    // 1개라도 유효성 검사 실패 시 submit 막기
    if (updateObj[key] == false) {
      let str;
      switch (key) {
        case "memberEmail":
          str = "이메일을";
          break;
        case "memberNickName":
          str = "닉네임을";
          break;
        case "memberName":
          str = "이름을";
          break;
        case "memberPhoneNo":
          str = "전화번호를";
          break;
        case "memberBirth":
          str = "생년월일을";
          break;
      }

      alert(str + " 확인해 주세요");
      inputUpdateObj[key].focus();
      e.preventDefault();

      return;
    }
  }
});

//====================================================================
//비밀번호 변경 (성공)
const newPw = document.querySelector("#newPw");
const newPwConfirm = document.querySelector("#newPwConfirm");
const newPwMessage = document.querySelector("#newPwMessage");
const currentPw = document.querySelector("#currentPw");

// 비밀번호 변경 정규식, 유효성 검사
const checkNewPw = () => {
  if (newPw.value.trim().length == 0 || newPwConfirm.value.trim().length == 0) {
    newPwMessage.innerText = "변경 비밀번호를 모두 입력해주세요";
    return;
  }

  if (newPw.value != newPwConfirm.value) {
    newPwMessage.innerText = "비밀번호가 불일치 합니다";
    return;
  }

  const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{6,16}$/;
  if (!regExp.test(newPw.value) || !regExp.test(newPwConfirm.value)) {
    newPwMessage.innerText = "변경 비밀번호가 유효하지 않습니다. ";
    return;
  }

  newPwMessage.innerText = "비밀번호가 일치합니다.";
};

newPw.addEventListener("input", (e) => {
  if (newPw.value.length !== 0) {
    checkNewPw();
    return;
  }
});
newPwConfirm.addEventListener("input", (e) => {
  if (newPwConfirm.value.length !== 0) {
    checkNewPw();
    return;
  }
});

// 비밀번호 변경 ajax
const changePwForm = document.querySelector("#changePwForm");

changePwForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (currentPw.value.trim() == 0) {
    alert("현재 비밀번호를 입력해 주세요.");
    currentPw.focus();
    e.preventDefault();
    return;
  }

  if (newPw.value.trim() == 0) {
    alert("변경 비밀번호를 입력해주세요.");
    newPw.focus();
    e.preventDefault();
    return;
  }

  if (newPwConfirm.value.trim() == 0) {
    alert("변경 비밀번호 확인을 입력해주세요.");
    newPwConfirm.focus();
    e.preventDefault();
    return;
  }

  if (newPw.value != newPwConfirm.value) {
    alert("변경 비밀번호가 불일치 합니다");
    newPw.innerText = "";
    newPwConfirm.innerText = "";
    newPw.focus();
    e.preventDefault();
    return;
  }

  const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{6,16}$/;
  if (!regExp.test(newPw.value) || !regExp.test(newPwConfirm.value)) {
    alert("변경 비밀번호가 유효하지 않습니다");
    newPw.innerText = "";
    newPwConfirm.innerText = "";
    newPw.focus();
    e.preventDefault();
    return;
  }

  fetch("/myPage/changePw", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      currentPw: currentPw.value,
      newPw: newPw.value,
    }),
  })
    .then((resp) => resp.json())
    .then((result) => {
      if (result == 0) {
        alert("현재 비밀번호가 일치하지 않습니다.");
        currentPw.innerText = "";
        currentPw.focus();
        e.preventDefault();
        return;
      }
      if (result == 2) {
        alert("현재 비밀번호와 변경된 비밀번호가 일치합니다.");
        newPw.innerText = "";
        newPwConfirm.innerText = "";
        newPw.focus();
        e.preventDefault();
        return;
      }
      if (result == 1) {
        alert("비밀번호가 변경되었습니다.");
        window.location.href = "/myPage/info";
      }
    });
});
