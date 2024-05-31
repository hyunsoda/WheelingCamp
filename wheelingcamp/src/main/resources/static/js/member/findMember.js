const addClickEventListener = () => {
  //// 인증번호 요청을 눌렀을때 input에 입력한 휴대폰/이메일 유효성 검사 하기
  let authTimer; // 타이머 역할을 할 setInterval을 저장할 변수

  const initMin = 4; // 타이머 초기값 (분)
  const initSec = 59; // 타이머 초기값 (초)
  const initTime = "05:00";

  // 실제 줄어드는 시간을 저장할 변수
  let min = initMin;
  let sec = initSec;

  const checkObj = {
    authBtn: false, // 인증번호를 발급 받았는지 확인
    authKey: false, // 인증번호가 맞는지 확인
    authTime: true,
  };

  const requestAuthNumber = (
    buttonElement,
    inputElement,
    checkAuth,
    find,
    count
  ) => {
    buttonElement.addEventListener("click", () => {
      // 재클릭시 처리
      checkObj.authKey = false;
      count.innerText = "";

      // 클릭 시 타이머 숫자 초기화
      min = initMin;
      sec = initSec;

      // 이전 동작중인 인터벌 클리어
      clearInterval(authTimer);

      checkObj.authBtn = true;

      let req = "";

      // checkAuth -> 인증 수단 1은 휴대폰, 2는 이메일
      if (checkAuth == 1) {
        req = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;
      } else {
        req =
          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
      }

      // 입력한 인증수단 input 유효성 검사를 통과 못했을 경우
      if (!req.test(inputElement.value)) {
        if (checkAuth == 1) {
          alert("휴대폰 번호를 확인해주세요.");
        } else {
          alert("이메일 형식을 확인해주세요.");
        }

        return;
      }

      alert("인증번호를 발송했습니다.");
      checkObj.authTime = true;

      count.innerText = initTime; // 05:00 세팅

      // 인증 시간 출력(1초 마다 동작)
      authTimer = setInterval(() => {
        count.innerText = `${addZero(min)}:${addZero(sec)}`;

        // 0분 0초인 경우 ("00:00" 출력 후)
        if (min == 0 && sec == 0) {
          checkObj.authTime = false; // 인증 못함
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

      // 휴대폰 번호 인증 함수
      if (checkAuth == 1) {
        find == 1 ? authEmail() : authEmail();
      } else {
        // 이메일 인증 함수
        find == 1
          ? authEmail(idMemberEmail.value)
          : authEmail(pwMemberEmail.value);
      }
    });
  };

  // 전달 받은 숫자가 10 미만인 경우(한자리) 앞에 0 붙여서 반환
  function addZero(number) {
    if (number < 10) return "0" + number;
    else return number;
  }

  // 이메일 인증하는 함수
  const authEmail = (email) => {
    fetch("/auth/sendEmail", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: email,
    })
      .then((resp) => resp.text())
      .then((result) => {
        if (result > 0) {
          console.log("이메일 전송 성공");
        } else {
          console.log("이메일 전송 실패");
        }
      });
  };

  // 찾기 버튼을 누르기 전에 모든게 true가 되면 진행, 하나라도 false면 진행 X
  const passObj = {
    userInfo: false,
    checkAuth: false,
    authKey: false,
  };

  // 인증 방법을 나타내는 변수
  // 1은 휴대폰, 2는 이메일
  let idAuth = 1;
  let pwAuth = 1;

  // 인증 방법 나타내는 변수 복제
  let cloneAuth = 0;
  let responseAuth = 0;
  //                     입력할 input,   다른 input,   인증수단, inputradio, 찾을 정보 1은 아이디 2는 비밀번호
  const radioDisabled = (
    inputElement,
    otherElement,
    checkAuth,
    radio,
    find,
    count
  ) => {
    radio.addEventListener("click", () => {
      clearInterval(authTimer); // 타이머 멈춤
      if (count != null) {
        count.innerText = "";
      }

      passObj.authKey = true;

      // 인증 방법을 변경 하면 인증 초기화
      idAuthNum.disabled = false;
      idAuthNum.value = "";
      pwAuthNum.disabled = false;
      pwAuthNum.value = "";
      idCount.innerText = "";
      pwCount.innerText = "";

      // 휴대폰/이메일 input 을 false, 인증도 false
      passObj.authKey = false;
      passObj.checkAuth = false;

      // 찾을 정보가 1 아이디라면 idAuth 변수 사용
      if (find == 1) {
        cloneAuth = idAuth;
        responseAuth = 1;

        // 찾을 정보가 1 아이디라면 pwAuth 변수 사용
      } else {
        cloneAuth = pwAuth;
        responseAuth = 2;
      }

      // 복제한 인증방법 변수와 클릭한 인증 수단을 비교해서 같지 않으면 인증수단 변경(휴대폰 <-> 이메일)
      if (checkAuth != cloneAuth) {
        otherElement.value = "";
        otherElement.disabled = true;
        inputElement.disabled = false;
        inputElement.focus();

        if (responseAuth == 1) {
          idAuth = checkAuth;
        } else {
          pwAuth = checkAuth;
        }
      }
    });
  };

  // 아이디 찾기/비밀번호 찾기 버튼을 눌렀을때 이름/아이디를 입력하고 인증번호를 입력했는지, 그 전에 인증번호를 요청했는지 확인
  //                  찾기버튼, 회원 정보, 인증번호input, 찾는 정보 1은 아이디, 2는 비밀번호
  const findUserInfo = (
    button, // 아이디 / 비밀번호 찾기 버튼
    userInfo, // 이름 / 아이디
    inputElement, // 인증번호
    checkAuth, // 아이디 / 비밀번호 둘중 어떤걸 찾을지 나타내는 변수
    radios, // 인증방식
    phoneNo, // 휴대폰 번호
    email // 이메일
  ) => {
    button.addEventListener("click", (e) => {
      // 들어온 회원 정보(아이디-이름/비밀번호-아이디)가 빈칸일 때
      if (userInfo.value == "") {
        if (checkAuth == 1) {
          alert("이름을 입력해주세요");
        } else {
          alert("아이디를 입력해주세요");
        }

        e.preventDefault();
        return;
      }

      // 인증번호 input이 빈칸일때
      if (inputElement.value == "") {
        alert("인증번호를 입력해주세요");

        e.preventDefault();
        return;
      }

      // 인증 번호를 요청 한 뒤에 휴대폰/이메일 입력 을 변경할 수 있으므로 다시 한번 유효성 검사
      let req = "";
      let methodAuth = 0; // 인증 수단

      if (radios[0].checked == true) {
        req = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;
        methodAuth = 1;
      } else {
        req =
          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
        methodAuth = 2;
      }

      if (methodAuth == 1) {
        if (!req.test(phoneNo.value)) {
          alert("휴대폰 번호를 확인해주세요.");
          e.preventDefault();
          return;
        }
      } else {
        if (!req.test(email.value)) {
          alert("이메일 형식을 확인해주세요.");
          e.preventDefault();
          return;
        }
      }

      if (checkAuth == 1) {
        const findObj = {
          memberName: userInfo.value,
          memberPhoneNo: phoneNo.value,
          memberEmail: email.value,
        };

        fetch("/member/findId", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(findObj),
        })
          .then((resp) => resp.text())
          .then((result) => {
            if (result == "") {
              alert("입력한 정보와 일치하는 아이디가 존재하지 않습니다.");
              return;
            }
            idAppend.innerText = "아이디: " + result;
          });
      } else {
        const findObj = {
          memberId: userInfo.value,
          memberPhoneNo: phoneNo.value,
          memberEmail: email.value,
        };

        fetch("/member/findPw", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(findObj),
        })
          .then((resp) => resp.text())
          .then((result) => {
            if (result == "") {
              alert("입력한 정보와 일치하는 비밀번호가 존재하지 않습니다.");
              return;
            }
            pwAppend.innerText = "비밀번호: " + result;
          });
      }
    });
  };

  //////////////////////////////////////////////////// 인증 버튼을 누를때 인증번호를 검사하는 이벤트

  const authButtonClickEventListener = (
    authButton,
    userInfo,
    inputElement,
    radios,
    find,
    count
  ) => {
    authButton.addEventListener("click", (e) => {
      const obj = {
        memberId: "",
        memberName: "",
        memberPhoneNo: "",
        memberEmail: "",
        authNum: inputElement.value,
      };

      // 인증번호를 입력하지 않았으면 경고알림 후 리턴
      if (inputElement.value == "") {
        alert("인증번호를 입력해주세요");
        e.preventDefault();
        return;
      }

      if (!checkObj.authTime) {
        alert("시간이 초과되었습니다.");
        return;
      }

      if (
        idMemberPhoneNo.value == "" &&
        pwMemberPhoneNo.value == "" &&
        idMemberEmail.value == "" &&
        pwMemberEmail.value == ""
      ) {
        // 휴대폰 인증, 아이디 찾기
        if (
          (radios[0].checked == true && find == 1) ||
          (radios[0].checked == true && find == 2)
        ) {
          alert("휴대폰 번호를 입력해주세요");
        } else {
          alert("이메일을 입력해주세요");
        }

        e.preventDefault();
        return;
      }

      const objUserInfo = {
        memberPhoneNo: "",
        memberEmail: "",
      };

      // 찾을 정보 1은 아이디, 2는 비밀번호
      if (find == 1) {
        obj.memberName = userInfo.value;
        objUserInfo.memberPhoneNo = idMemberPhoneNo.value;
        objUserInfo.memberEmail = idMemberEmail.value;
      } else {
        obj.memberId = userInfo.value;
        objUserInfo.memberPhoneNo = pwMemberPhoneNo.value;
        objUserInfo.memberEmail = pwMemberEmail.value;
      }

      // 인증 수단 true면 휴대폰 false면 이메일
      if (radios[0].checked == true) {
        obj.memberPhoneNo = objUserInfo.memberPhoneNo;
      } else {
        obj.memberEmail = objUserInfo.memberEmail;
      }

      //

      fetch("/auth/findMemberInfo", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(obj),
      })
        .then((resp) => resp.text())
        .then((result) => {
          if (result > 0) {
            alert("인증되었습니다.");
            clearInterval(authTimer); // 타이머 멈춤
            count.innerText = "인증 완료";
            inputElement.disabled = true;
            passObj.authKey = true;
          } else {
            alert("인증번호가 일치하지 않습니다.");
          }
        });
    });
  };

  ////////////////////////////////////////////////////////////////////////////////////////

  ///// 아이디 관련 요소들
  const idMemberPhoneNo = document.getElementById("idMemberPhoneNo");
  const idMemberEmail = document.getElementById("idMemberEmail");
  const idRadios = document.getElementsByName("idRadio");
  const idTelRequestAuth = document.getElementById("idTelRequestAuth");
  const idEmailRequestAuth = document.getElementById("idEmailRequestAuth");
  const memberName = document.querySelector("[name=memberName]");
  const findIdButton = document.getElementById("findIdButton");
  const idAuthNum = document.getElementById("idAuthNum");
  const idAuthBtn = document.getElementById("idAuthBtn");
  const idCount = document.getElementById("idCount");
  const idAppend = document.getElementById("idAppend");

  ///// 비밀번호 관련 요소들
  const pwMemberPhoneNo = document.getElementById("pwMemberPhoneNo");
  const pwMemberEmail = document.getElementById("pwMemberEmail");
  const pwRadios = document.getElementsByName("pwRadio");
  const pwTelRequestAuth = document.getElementById("pwTelRequestAuth");
  const pwEmailRequestAuth = document.getElementById("pwEmailRequestAuth");
  const memberId = document.querySelectorAll("[name=memberId]");
  const findPwButton = document.getElementById("findPwButton");
  const pwAuthNum = document.getElementById("pwAuthNum");
  const pwAuthBtn = document.getElementById("pwAuthBtn");
  const pwCount = document.getElementById("pwCount");
  const pwAppend = document.getElementById("pwAppend");

  ///// 아이디 관련 이벤트 리스너 추가
  radioDisabled(idMemberPhoneNo, idMemberEmail, 1, idRadios[0], 1);
  radioDisabled(idMemberEmail, idMemberPhoneNo, 2, idRadios[1], 1);
  requestAuthNumber(idEmailRequestAuth, idMemberEmail, 2, 1, idCount);
  findUserInfo(
    findIdButton,
    memberName,
    idAuthNum,
    1,
    idRadios,
    idMemberPhoneNo,
    idMemberEmail
  );
  authButtonClickEventListener(
    idAuthBtn,
    memberName,
    idAuthNum,
    idRadios,
    1,
    idCount
  );

  ///// 비밀번호 관련 이벤트 리스너 추가
  radioDisabled(pwMemberPhoneNo, pwMemberEmail, 1, pwRadios[0], 2);
  radioDisabled(pwMemberEmail, pwMemberPhoneNo, 2, pwRadios[1], 2);
  requestAuthNumber(pwEmailRequestAuth, pwMemberEmail, 2, 2, pwCount);
  findUserInfo(
    findPwButton,
    memberId[1],
    pwAuthNum,
    2,
    pwRadios,
    pwMemberPhoneNo,
    pwMemberEmail
  );
  authButtonClickEventListener(
    pwAuthBtn,
    memberId[1],
    pwAuthNum,
    pwRadios,
    2,
    pwCount
  );
};

// 이벤트 리스너 추가
// addClickEventListener(loginFindId);
// addClickEventListener(loginFindPw);
// addClickEventListener(findIdFindPw);
// addClickEventListener(findPwFindId);

const userBtn = document.getElementById("user-btn");

userBtn.removeEventListener("click", () => {
  addClickEventListener();
});
userBtn.addEventListener("click", () => {
  addClickEventListener();
});

console.log("ff");
