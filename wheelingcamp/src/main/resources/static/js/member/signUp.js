// 필수 유효성 검사를 위한 객체
const checkObjSi = {
  memberId: false, // 아이디
  memberPw: false, // 비밀번호
  memberPwConfirm: false, // 비밀번호 확인
  memberEmail: false, // 이메일
  memberNickName: false, // 닉네임
  memberName: false, // 실명
  memberPhoneNo: false, // 휴대폰 번호
  memberBirth: false, // 생년월일
};

// 입력받은 회원 정보 (input) 객체
const inputObjSi = {
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
const messageObjSi = {
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

for (const key in inputObjSi) {
  inputObjSi[key].addEventListener("input", (e) => {
    // 빈칸 입력시 공백 제거
    if (e.target.value.trim().length === 0) {
      if (messageObjSi[key] != null) {
        messageObjSi[key].innerText = "";
      }

      e.target.value = "";

      return;
    }

    if (reqObj[key] != null) {
      // 유효성 검사를 해야하는 요소일 때
      // 유효성 검사 실행
      if (!reqObj[key].test(e.target.value)) {
        // 유효하지 않을 때
        messageObjSi[key].innerText = "x";
        messageObjSi[key].style.color = "red";
        checkObjSi[key] = false;
        return;
      }

      // 유효성 검사 성공 메시지를 띄움
      messageObjSi[key].innerText = "o";
      messageObjSi[key].style.color = "blue";

      // 유효성 검사 객체의 값을 변경
      checkObjSi[key] = true;
    } else {
      // 유효성 검사를 하지 않는 요소일 때(비밀번호 확인)

      // 비밀번호 일치 검사
      if (inputObjSi.memberPwConfirm.value != inputObjSi.memberPw.value) {
        messageObjSi.memberPwConfirmMessage.innerText = "x";
        messageObjSi.memberPwConfirmMessage.style.color = "red";
        checkObjSi[key] = false;
        return;
      } else {
        // 비밀번호 일치시
        messageObjSi.memberPwConfirmMessage.innerText = "o";
        messageObjSi.memberPwConfirmMessage.style.color = "blue";
        checkObjSi[key] = true;
      }
    }
  });
}

// 회원가입 데이터 form 요소
document.getElementById("signUpForm").addEventListener("submit", (e) => {
  // 유효성 검사 객체의 요소들이 모두 true 인지 검사
  for (const key in checkObjSi) {
    // 1개라도 유효성 검사 실패 시 submit 막기
    if (checkObjSi[key] == false) {
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
      inputObjSi[key].focus();
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
