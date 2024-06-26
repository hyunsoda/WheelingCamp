// 필수 유효성 검사를 위한 객체
const checkObjSignUp = {
  memberId: false, // 아이디
  memberPw: false, // 비밀번호
  memberPwConfirm: false, // 비밀번호 확인
  memberEmail: false, // 이메일
  memberNickName: false, // 닉네임
  memberName: false, // 실명
  memberPhoneNo: false, // 휴대폰 번호
  memberBirth: false, // 생년월일
};

const emailAuth = {
  email: false, // 번호를 발급 받았는지 확인
  auth: false, // 인증번호가 맞는지 확인
};

// 입력받은 회원 정보 (input) 객체
const inputObjSignUp = {
  memberId: document.getElementById("memberId"), // 입력 아이디
  memberPw: document.getElementById("memberPw"), // 입력 비밀번호
  memberPwConfirm: document.getElementById("memberPwConfirm"), // 입력 비밀번호 확인
  memberEmail: document.getElementById("memberEmail"), // 입력 이메일
  memberNickName: document.getElementById("memberNickName"), // 입력 닉네임
  memberName: document.getElementById("memberName"), // 입력 실명
  memberPhoneNo: document.getElementById("memberPhoneNo"), // 입력 휴대폰 번호
  memberBirth: document.getElementById("memberBirth"), // 입력 생년월일
};

// 메시지 출력용 span
const messageObjSignUp = {
  memberId: document.getElementById("memberIdMessage"), // 아이디 유효성 검사 메시지
  memberPw: document.getElementById("memberPwMessage"), // 비밀번호 유효성 검사 메시지
  memberPwConfirmMessage: document.getElementById("memberPwConfirmMessage"), // 비밀번호 확인  검사 메시지
  memberEmail: document.getElementById("memberEmailMessage"), // 이메일 유효성 검사 메시지
  memberNickName: document.getElementById("memberNickNameMessage"), // 닉네임 유효성 검사 메시지
  memberName: document.getElementById("memberNameMessage"), // 실명 유효성 검사 메시지
  memberPhoneNo: document.getElementById("memberPhoneNoMessage"), // 휴대폰 번호 유효성 검사 메시지
  memberBirth: document.getElementById("memberBirthMessage"), // 생년월일 유효성 검사 메시지
};

// 유효성 검사용 정규식
const reqObj = {
  memberId: /^[a-z0-9]{5,10}$/, // 아이디 유효성 검사
  memberPw: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{6,16}$/, // 비밀번호 유효성 검사
  memberEmail:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
  memberNickName: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/, // 닉네임 유효성 검사
  memberName: /^[가-힣]{2,6}$/, // 이름 유효성 검사
  memberPhoneNo: /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/, // 전화번호 유효성 검사
  memberBirth:
    /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/, // 생년월일 유효성 검사
};

for (const key in inputObjSignUp) {
  inputObjSignUp[key].addEventListener("change", (e) => {
    // 빈칸 입력시 공백 제거
    if (e.target.value.trim().length === 0) {
      if (messageObjSignUp[key] != null) {
        messageObjSignUp[key].innerText = "";
      }

      e.target.value = "";

      return;
    }

    if (reqObj[key] != null) {
      // 유효성 검사를 해야하는 요소일 때
      // 유효성 검사 실행

      if (!reqObj[key].test(e.target.value)) {
        // 비밀번호 유효성 검사일 때
        if (inputObjSignUp[key].id == "memberPw") {
          messageObjSignUp[key].innerText = "영어,숫자,특수문자6~17";
          messageObjSignUp[key].style.color = "red";
        } else {
          messageObjSignUp[key].innerText = "x";
          messageObjSignUp[key].style.color = "red";
        }

        checkObjSignUp[key] = false;
        return;
      }

      // 아이디 유효성 검사일 때
      else if (inputObjSignUp[key].id == "memberId") {
        fetch("/member/idCheck", {
          headers: { "Content-Type": "application/json" },
          method: "post",
          body: JSON.stringify({ memberId: inputObjSignUp[key].value }),
        })
          .then((resp) => resp.text())
          .then((result) => {
            if (result > 0) {
              messageObjSignUp[key].innerText = "아이디 중복";
              messageObjSignUp[key].style.color = "red";
              checkObjSignUp.memberId = false;
            } else {
              messageObjSignUp[key].innerText = "사용가능";
              messageObjSignUp[key].style.color = "blue";
              checkObjSignUp.memberId = true;
            }
          });

        // 이메일 유효성 검사일 때
      } else if (inputObjSignUp[key].id == "memberEmail") {
        fetch("/member/emailCheck", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ memberEmail: inputObjSignUp[key].value }),
        })
          .then((resp) => resp.text())
          .then((result) => {
            if (result > 0) {
              messageObjSignUp[key].innerText = "이메일 중복";
              messageObjSignUp[key].style.color = "red";
              checkObjSignUp.memberEmail = false;
            } else {
              messageObjSignUp[key].innerText = "사용가능";
              messageObjSignUp[key].style.color = "blue";
              checkObjSignUp.memberEmail = true;
            }
          });

        // 전화번호 유효성 검사
      } else if (inputObjSignUp[key].id == "memberPhoneNo") {
        fetch("/member/phoneNoCheck", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ memberPhoneNo: inputObjSignUp[key].value }),
        })
          .then((resp) => resp.text())
          .then((result) => {
            if (result > 0) {
              messageObjSignUp[key].innerText = "전화번호 중복";
              messageObjSignUp[key].style.color = "red";
              checkObjSignUp.memberPhoneNo = false;
            } else {
              messageObjSignUp[key].innerText = "사용가능";
              messageObjSignUp[key].style.color = "blue";
              checkObjSignUp.memberPhoneNo = true;
            }
          });
        // 닉네임 중복
      } else if (inputObjSignUp[key].id == "memberNickName") {
        fetch("/member/nickNameCheck", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ memberNickName: inputObjSignUp[key].value }),
        })
          .then((resp) => resp.text())
          .then((result) => {
            if (result > 0) {
              messageObjSignUp[key].innerText = "닉네임 중복";
              messageObjSignUp[key].style.color = "red";
              checkObjSignUp.memberNickName = false;
            } else {
              messageObjSignUp[key].innerText = "사용가능";
              messageObjSignUp[key].style.color = "blue";
              checkObjSignUp.memberNickName = true;
            }
          });
      } else {
        // 유효성 검사 성공 메시지를 띄움
        messageObjSignUp[key].innerText = "o";
        messageObjSignUp[key].style.color = "blue";

        // 유효성 검사 객체의 값을 변경
        checkObjSignUp[key] = true;
      }
    } else {
      // 유효성 검사를 하지 않는 요소일 때(비밀번호 확인)

      // 비밀번호 일치 검사
      if (
        inputObjSignUp.memberPwConfirm.value != inputObjSignUp.memberPw.value
      ) {
        messageObjSignUp.memberPwConfirmMessage.innerText = "불일치";
        messageObjSignUp.memberPwConfirmMessage.style.color = "red";
        checkObjSignUp[key] = false;
        return;
      } else {
        // 비밀번호 일치시
        messageObjSignUp.memberPwConfirmMessage.innerText = "o";
        messageObjSignUp.memberPwConfirmMessage.style.color = "blue";
        checkObjSignUp[key] = true;
      }
    }
  });
}

const AuthObj = {
  authBtn: false, // 인증번호 발급을 눌렀는지 확인
  authKey: false, // 인증이 되었는지 확인
  authTime: true, // 인증 시간
};

// 회원가입 데이터 form 요소
document.getElementById("signUpForm").addEventListener("submit", (e) => {
  // 유효성 검사 객체의 요소들이 모두 true 인지 검사
  for (const key in checkObjSignUp) {
    // 1개라도 유효성 검사 실패 시 submit 막기
    if (checkObjSignUp[key] == false) {
      let str;
      switch (key) {
        case "memberId":
          str = "아이디를";
          break;
        case "memberPw":
          str = "비밀번호를";
          break;
        case "memberPwConfirm":
          str = "비밀번호를";
          break;
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
      ffbvxbvcbvcfsdsdfwshowa44bdbcvbcvbcv(str);
      // alert(str + " 확인해 주세요");
      inputObjSignUp[key].focus();
      e.preventDefault();

      return;
    }
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

      ffbvxbvcvcbdgl(str);
      e.preventDefault();

      return;
    }
  }
});

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
      document.getElementById("postCode").value = data.zonecode;
      document.getElementById("address").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("detailAddress").focus();
    },
  }).open();
}

// 이메일 인증번호 발급
const memberEmail = document.getElementById("memberEmail");
const memberEmailAuthBtn = document.getElementById("memberEmailAuthBtn");

// 이메일 인증 input
const emailAuthInput = document.getElementById("memberEmailAuthKey");
const emailAuthMessage = document.getElementById("memberEmailAuthMessage");
const emailAuthButton = document.getElementById("memberEmailAuthCheckBtn");

// 이메일 인증번호 발급 클릭 이벤트
memberEmailAuthBtn.addEventListener("click", () => {
  if (!checkObjSignUp.memberEmail) {
    fdsfsdfdsfdsdsfdsfdsfds();
    return;
  }

  if (!checkObjSignUp.memberEmail) {
    fdsfsdfdsfdsdsfdsfdsfds();
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
  // alert("인증번호를 전송했습니다.");

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
    // alert("이메일 인증번호를 발급받아주세요.");
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
