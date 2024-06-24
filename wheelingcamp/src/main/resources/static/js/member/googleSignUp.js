// 필수 유효성 검사를 위한 객체
const checkObjGoogle = {
  memberNickName: false, // 닉네임
  memberPhoneNo: false, // 휴대폰 번호
  memberBirth: false, // 생년월일
};

// 입력받은 회원 정보 (input) 객체
const inputObjGoogle = {
  memberNickName: document.getElementById("memberNickName"), // 입력 닉네임
  memberPhoneNo: document.getElementById("memberPhoneNo"), // 입력 휴대폰 번호
  memberBirth: document.getElementById("memberBirth"), // 입력 생년월일
};

// 메시지 출력용 span
const messageObjGoogle = {
  memberNickName: document.getElementById("memberNickNameMessage"), // 닉네임 유효성 검사 메시지
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

for (const key in inputObjGoogle) {
  inputObjGoogle[key].addEventListener("input", (e) => {
    // 빈칸 입력시 공백 제거
    if (e.target.value.trim().length === 0) {
      messageObjGoogle[key].innerText = "";
      e.target.value = "";
      checkObjKaKao[key] = false;
      return;
    }

    // 유효성 검사 실행
    if (!reqObj[key].test(e.target.value)) {
      // 유효하지 않을 때
      messageObjGoogle[key].innerText = "유효한 형식이 아닙니다.";
      checkObjGoogle[key] = false;
      return;
    }

    // 유효성 검사 성공 메시지를 띄움
    messageObjGoogle[key].innerText = "";

    // 유효성 검사 객체의 값을 변경
    checkObjGoogle[key] = true;
  });
}

// 회원가입 데이터 form 요소
document.getElementById("signUpForm").addEventListener("submit", (e) => {
  // 유효성 검사 객체의 요소들이 모두 true 인지 검사
  for (const key in checkObjGoogle) {
    // 1개라도 유효성 검사 실패 시 submit 막기
    if (checkObjGoogle[key] == false) {
      let str;
      switch (key) {
        case "memberNickName":
          str = "닉네임을";
          break;
        case "memberPhoneNo":
          str = "전화번호를";
          break;
        case "memberBirth":
          str = "생년월일을";
          break;
      }

      alert(str + " 확인해 주세요");
      inputObjGoogle[key].focus();
      e.preventDefault();

      return;
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
    showMyCustomAlert6xczxc5cccc();
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
