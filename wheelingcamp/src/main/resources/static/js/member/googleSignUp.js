// 필수 유효성 검사를 위한 객체
const checkObj = {
  memberNickName: false, // 닉네임
  memberPhoneNo: false, // 휴대폰 번호
  memberBirth: false, // 생년월일
};

// 입력받은 회원 정보 (input) 객체
const inputObj = {
  memberNickName: document.getElementById("memberNickName"), // 입력 닉네임
  memberAddress: document.getElementById("memberAddress"), // 입력 주소
  memberPhoneNo: document.getElementById("memberPhoneNo"), // 입력 휴대폰 번호
  memberBirth: document.getElementById("memberBirth"), // 입력 생년월일
};

// 메시지 출력용 span
const messageObj = {
  memberNickName: document.getElementById("memberNickNameMessage"), // 닉네임 유효성 검사 메시지
  memberAddress: document.getElementById("memberAddressMessage"), // 주소 유효성 검사 메시지
  memberPhoneNo: document.getElementById("memberPhoneNoMessage"), // 휴대폰 번호 유효성 검사 메시지
  memberBirth: document.getElementById("memberBirthMessage"), // 생년월일 유효성 검사 메시지
};

// 유효성 검사용 정규식
const reqObj = {
  memberNickName: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/, // 닉네임 유효성 검사
  memberPhoneNo: /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/, // 전화번호 유효성 검사
  memberBirth:
    /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/, // 생년월일 유효성 검사
};

for (const key in inputObj) {
  inputObj[key].addEventListener("input", (e) => {
    // 주소를 입력했을때
    if (e.target == memberAddress) {
      return;
    }

    // 빈칸 입력시 공백 제거
    if (e.target.value.trim().length === 0) {
      messageObj[key].innerText = "";
      e.target.value = "";
      return;
    }

    // 유효성 검사 실행
    if (!reqObj[key].test(e.target.value)) {
      // 유효하지 않을 때
      messageObj[key].innerText = "유효한 형식이 아닙니다.";
      checkObj[key] = false;
      return;
    }

    // 유효성 검사 성공 메시지를 띄움
    messageObj[key].innerText = "유효한 형식입니다.";

    // 유효성 검사 객체의 값을 변경
    checkObj[key] = true;
  });
}

// 회원가입 데이터 form 요소
document.getElementById("signUpForm").addEventListener("submit", (e) => {
  // 유효성 검사 객체의 요소들이 모두 true 인지 검사
  for (const key in checkObj) {
    // 1개라도 유효성 검사 실패 시 submit 막기
    if (checkObj[key] == false) {
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

      alert(str + " 확인해 주세요");
      inputObj[key].focus();
      e.preventDefault();

      return;
    }
  }
});
