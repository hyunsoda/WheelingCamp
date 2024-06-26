const postcode = document.getElementById("postcode");
const detailAddress = document.getElementById("detailAddress");

// 필수 유효성 검사를 위한 객체
const checkObjKaKao = {
  memberEmail: false, // 이메일
  memberName: false, // 실명
  memberPhoneNo: false, // 휴대폰 번호
  memberBirth: false, // 생년월일
};

// 입력받은 회원 정보 (input) 객체
const inputObjKaKao = {
  memberEmail: document.getElementById("memberEmail"), // 입력 이메일
  memberName: document.getElementById("memberName"), // 입력 실명
  memberPhoneNo: document.getElementById("memberPhoneNo"), // 입력 휴대폰 번호
  memberBirth: document.getElementById("memberBirth"), // 입력 생년월일
};

// 메시지 출력용 span
const messageObjKakao = {
  memberEmail: document.getElementById("memberEmailMessage"), // 이메일 유효성 검사 메시지
  memberName: document.getElementById("memberNameMessage"), // 실명 유효성 검사 메시지
  memberPhoneNo: document.getElementById("memberPhoneNoMessage"), // 휴대폰 번호 유효성 검사 메시지
  memberBirth: document.getElementById("memberBirthMessage"), // 생년월일 유효성 검사 메시지
};

// 유효성 검사용 정규식
const reqObj = {
  memberEmail:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
  memberName: /^[가-힣]{2,6}$/, // 이름 유효성 검사
  memberPhoneNo: /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/, // 전화번호 유효성 검사
  memberBirth:
    /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/, // 생년월일 유효성 검사
};

for (const key in inputObjKaKao) {
  inputObjKaKao[key].addEventListener("change", (e) => {
    // 빈칸 입력시 공백 제거
    if (e.target.value.trim().length === 0) {
      messageObjKakao[key].innerText = "";
      e.target.value = "";
      checkObjKaKao[key] = false;
      return;
    }

    if (reqObj[key] != null) {
      // 유효성 검사를 해야하는 요소일 때
      // 유효성 검사 실행

      if (!reqObj[key].test(e.target.value)) {
        messageObjKakao[key].innerText = "x";
        messageObjKakao[key].style.color = "red";

        checkObjKaKao[key] = false;
        return;
      } else if (inputObjKaKao[key].id == "memberEmail") {
        fetch("/member/emailCheck", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ memberEmail: inputObjKaKao[key].value }),
        })
          .then((resp) => resp.text())
          .then((result) => {
            if (result > 0) {
              messageObjKakao[key].innerText = "이메일 중복";
              messageObjKakao[key].style.color = "red";
              checkObjKaKao.memberEmail = false;
            } else {
              messageObjKakao[key].innerText = "사용가능";
              messageObjKakao[key].style.color = "blue";
              checkObjKaKao.memberEmail = true;
            }
          });

        // 전화번호 유효성 검사
      } else if (inputObjKaKao[key].id == "memberPhoneNo") {
        fetch("/member/phoneNoCheck", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ memberPhoneNo: inputObjKaKao[key].value }),
        })
          .then((resp) => resp.text())
          .then((result) => {
            if (result > 0) {
              messageObjKakao[key].innerText = "전화번호 중복";
              messageObjKakao[key].style.color = "red";
              checkObjKaKao.memberPhoneNo = false;
            } else {
              messageObjKakao[key].innerText = "사용가능";
              messageObjKakao[key].style.color = "blue";
              checkObjKaKao.memberPhoneNo = true;
            }
          });
      } else {
        // 유효성 검사 성공 메시지를 띄움
        messageObjKakao[key].innerText = "o";
        messageObjKakao[key].style.color = "blue";

        // 유효성 검사 객체의 값을 변경
        checkObjKaKao[key] = true;
      }
    }

    // 유효성 검사 성공시 메세지 지움
    messageObjKakao[key].innerText = "";

    // 유효성 검사 객체의 값을 변경
    checkObjKaKao[key] = true;
  });
}

// 회원가입 데이터 form 요소
document.getElementById("signUpForm").addEventListener("submit", (e) => {
  // 유효성 검사 객체의 요소들이 모두 true 인지 검사
  for (const key in checkObjKaKao) {
    // 1개라도 유효성 검사 실패 시 submit 막기
    if (checkObjKaKao[key] == false) {
      let str;
      switch (key) {
        case "memberEmail":
          str = "이메일을";
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

      // alert(str + " 확인해 주세요");
      sdsdfwshowa44bd(str);
      inputObjKaKao[key].focus();
      e.preventDefault();

      return;
    }

    for (const key in AuthObj) {
      if (AuthObj[key] == false) {
        let str;
        switch (key) {
          case "authBtn":
            str = "인증번호를 발급받아주세요";
            break;
          case "authKey":
            str = "인증번호를 인증해주세요";
            break;
        }

        alert(str);
        e.preventDefault();

        return;
      }
    }
  }

  // 주소찾기를 입력했을때 상세주소 입력 해야함
  if (postcode.value != "") {
    if (detailAddress.value == "") {
      showMyCustomAlert6xczxc5();
      e.preventDefault();
      return;
    }
  }
});

function notReload(event) {
  if (
    (event.ctrlKey && (event.keyCode === 78 || event.keyCode === 82)) ||
    event.keyCode === 116
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
}
document.onkeydown = notReload;

function sample6_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ""; // 주소 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("postcode").value = data.zonecode;
      document.getElementById("address").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("detailAddress").focus();
    },
  }).open();
}

const AuthObj = {
  authBtn: false, // 인증번호 발급을 눌렀는지 확인
  authKey: false, // 인증이 되었는지 확인
  authTime: true, // 인증 시간
};

// 이메일 인증번호 발급
const memberEmail = document.getElementById("memberEmail");
const memberEmailAuthBtn = document.getElementById("memberEmailAuthBtn");

// 이메일 인증 input
const emailAuthInput = document.getElementById("memberEmailAuthKey");
const emailAuthMessage = document.getElementById("memberEmailAuthMessage");
const emailAuthButton = document.getElementById("memberEmailAuthCheckBtn");

// 이메일 인증번호 발급 클릭 이벤트
memberEmailAuthBtn.addEventListener("click", () => {
  if (!checkObjKaKao.memberEmail) {
    ffbvxbvbbdfdfbd();
    return;
  }

  if (!checkObjKaKao.memberEmail) {
    ffbvxbvbbdfdfbd();
    return;
  }

  emailAuthInput.value = "";
  emailAuthMessage.style.color = "black";
  emailAuthInput.disabled = false;

  // 클릭 시 타이머 숫자 초기화
  console.log(min);
  min = initMin;
  sec = initSec;

  // 이전 동작중인 인터벌 클리어
  clearInterval(authTimer);

  AuthObj.authBtn = true;

  fdsfsbbb();

  emailAuthMessage.innerText = initTime; // 05:00 세팅

  // 인증 시간 출력(1초 마다 동작)
  authTimer = setInterval(() => {
    emailAuthMessage.innerText = `${addZero(min)}:${addZero(sec)}`;

    // 0분 0초인 경우 ("00:00" 출력 후)
    if (min == 0 && sec == 0) {
      AuthObj.authTime = false; // 인증 못함
      clearInterval(authTimer); // interval 멈춤
      return;
    }

    // 0초인 경우(0초를 출력한 후)
    if (sec == 0) {
      sec = 60;
      min--;
    }

    sec--; // 1초 감소
  }, 1000); // 1초 지연시간

  AuthObj.authKey = false;

  fetch("/auth/sendEmail", {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: memberEmail.value,
  })
    .then((resp) => resp.text())
    .then((result) => {
      if (result > 0) {
        console.log("전송 성공");
        AuthObj.authBtn = true;
      } else {
        console.log("전송 실패.. " + result);
      }
    });
});

// 이메일 인증 버튼 클릭 이벤트
emailAuthButton.addEventListener("click", () => {
  const emailInfo = {
    memberEmail: memberEmail.value,
    authNum: emailAuthInput.value,
  };

  if ((memberEmail.innerText = "")) {
    fwshowa44bd();
    return;
  }

  if (!AuthObj.authBtn) {
    fdsfsdfbvcbvcdsfdsdsfdsfdsfds();
    return;
  }

  if (!AuthObj.authTime) {
    fdb1();
    return;
  }

  fetch("/auth/findMemberInfo", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(emailInfo),
  })
    .then((resp) => resp.text())
    .then((result) => {
      if (result > 0) {
        fdb2();
        emailAuthMessage.innerText = "o";
        emailAuthMessage.style.color = "blue";
        emailAuthInput.disabled = true;
        AuthObj.authKey = true;
        clearInterval(authTimer);
      } else {
        fdb3();
      }
    });
});

// 이메일 입력을 할 때 true로 바꿔놨던 조건들을 전부 초기화(다시 입력할 수 있음)
memberEmail.addEventListener("keyup", () => {
  emailAuthMessage.innerText = "";
  emailAuthInput.disabled = false;
  AuthObj.authBtn = false;
  AuthObj.authKey = false;
  emailAuthInput.value = "";
  emailAuthMessage.style.color = "black";
});
