console.log("연결");

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
  memberAddress: document.getElementById("memberAddressMessage"), // 주소 유효성 검사 메시지
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
  inputObjKaKao[key].addEventListener("input", (e) => {
    // 빈칸 입력시 공백 제거
    if (e.target.value.trim().length === 0) {
      messageObjKakao[key].innerText = "";
      e.target.value = "";
      checkObjKaKao[key] = false;
      return;
    }

    // 유효성 검사 실행
    if (!reqObj[key].test(e.target.value)) {
      // 유효하지 않을 때
      messageObjKakao[key].innerText = "유효한 형식이 아닙니다.";
      checkObjKaKao[key] = false;
      return;
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

      alert(str + " 확인해 주세요");
      inputObjKaKao[key].focus();
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
    alert("새로고침키를 사용할 수 없습니다.");
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
