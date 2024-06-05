// 필수 유효성 검사를 위한 객체
const updateObj = {
  memberEmail: false, // 이메일
  memberNickName: false, // 닉네임
  memberName: false, // 실명
  memberPhoneNo: false, // 휴대폰 번호
  memberBirth: false, // 생년월일
};

// 입력받은 회원 정보 (input) 객체
const inputObj = {
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

for (const key in inputObj) {
  if (inputObj[key].value != null) {
    inputObj[key].addEventListener("input", (e) => {
      // 빈칸 입력시 공백 제거
      console.log("inputObj");
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
document
  .getElementById("profileImgFormForm")
  .addEventListener("submit", (e) => {
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
        inputObj[key].focus();
        e.preventDefault();

        return;
      }
    }
  });

//====================================================================
//비밀번호 변경 (성공)
// const newPw = document.querySelector("#newPw");
// const newPwConfirm = document.querySelector("#newPwConfirm");
// const newPwMessage = document.querySelector("#newPwMessage");
// const currentPw = document.querySelector("#currentPw");

// // 비밀번호 변경 정규식, 유효성 검사
// const checkNewPw = () => {
//   if (newPw.value.trim().length == 0 || newPwConfirm.value.trim().length == 0) {
//     newPwMessage.innerText = "변경 비밀번호를 모두 입력해주세요";
//     return;
//   }

//   if (newPw.value != newPwConfirm.value) {
//     newPwMessage.innerText = "비밀번호가 불일치 합니다";
//     return;
//   }

//   const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{6,16}$/;
//   if (!regExp.test(newPw.value) || !regExp.test(newPwConfirm.value)) {
//     newPwMessage.innerText = "변경 비밀번호가 유효하지 않습니다. ";
//     return;
//   }

//   newPwMessage.innerText = "비밀번호가 일치합니다.";
// };

// newPw.addEventListener("input", (e) => {
//   if (newPw.value.length !== 0) {
//     checkNewPw();
//     return;
//   }
// });
// newPwConfirm.addEventListener("input", (e) => {
//   if (newPwConfirm.value.length !== 0) {
//     checkNewPw();
//     return;
//   }
// });

// // 비밀번호 변경 ajax
// const changePwForm = document.querySelector("#changePwForm");

// changePwForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   if (currentPw.value.trim() == 0) {
//     alert("현재 비밀번호를 입력해 주세요.");
//     currentPw.focus();
//     e.preventDefault();
//     return;
//   }

//   if (newPw.value.trim() == 0) {
//     alert("변경 비밀번호를 입력해주세요.");
//     newPw.focus();
//     e.preventDefault();
//     return;
//   }

//   if (newPwConfirm.value.trim() == 0) {
//     alert("변경 비밀번호 확인을 입력해주세요.");
//     newPwConfirm.focus();
//     e.preventDefault();
//     return;
//   }

//   if (newPw.value != newPwConfirm.value) {
//     alert("변경 비밀번호가 불일치 합니다");
//     newPw.innerText = "";
//     newPwConfirm.innerText = "";
//     newPw.focus();
//     e.preventDefault();
//     return;
//   }

//   const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{6,16}$/;
//   if (!regExp.test(newPw.value) || !regExp.test(newPwConfirm.value)) {
//     alert("변경 비밀번호가 유효하지 않습니다");
//     newPw.innerText = "";
//     newPwConfirm.innerText = "";
//     newPw.focus();
//     e.preventDefault();
//     return;
//   }

//   fetch("/myPage/changePw", {
//     method: "POST",
//     headers: { "Content-Type": "application/json; charset=utf-8" },
//     body: JSON.stringify({
//       currentPw: currentPw.value,
//       newPw: newPw.value,
//     }),
//   })
//     .then((resp) => resp.json())
//     .then((result) => {
//       if (result == 0) {
//         alert("현재 비밀번호가 일치하지 않습니다.");
//         currentPw.innerText = "";
//         currentPw.focus();
//         e.preventDefault();
//         return;
//       }
//       if (result == 2) {
//         alert("현재 비밀번호와 변경된 비밀번호가 일치합니다.");
//         newPw.innerText = "";
//         newPwConfirm.innerText = "";
//         newPw.focus();
//         e.preventDefault();
//         return;
//       }
//       if (result == 1) {
//         alert("비밀번호가 변경되었습니다.");
//         window.location.href = "/myPage/info";
//       }
//     });
// });

// 요소 선택
const form = document.querySelector("#changePwForm"),
  newPw = form.querySelector("#newPw"),
  newPwConfirm = form.querySelector("#newPwConfirm"),
  newPwMessage = form.querySelector("#newPwMessage"),
  currentPw = form.querySelector("#currentPw"),
  regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{6,16}$/;

// 비밀번호 유효성 검사
const validatePassword = () => {
  const messages = {
    empty: "변경 비밀번호를 모두 입력해주세요",
    mismatch: "비밀번호가 불일치 합니다",
    invalid: "변경 비밀번호가 유효하지 않습니다",
    match: "비밀번호가 일치합니다.",
  };

  let pw = newPw.value.trim(),
    pwConfirm = newPwConfirm.value.trim();

  newPwMessage.innerText =
    !pw || !pwConfirm
      ? messages.empty
      : pw !== pwConfirm
      ? messages.mismatch
      : !regExp.test(pw)
      ? messages.invalid
      : messages.match;
};

// 이벤트 리스너
[newPw, newPwConfirm].forEach((elem) =>
  elem.addEventListener("input", validatePassword)
);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let alerts = {
    currentEmpty: "현재 비밀번호를 입력해 주세요.",
    newEmpty: "변경 비밀번호를 입력해주세요.",
    confirmEmpty: "변경 비밀번호 확인을 입력해주세요.",
    mismatch: "변경 비밀번호가 불일치 합니다",
    invalid: "변경 비밀번호가 유효하지 않습니다",
    currentMismatch: "현재 비밀번호가 일치하지 않습니다.",
    sameAsCurrent: "현재 비밀번호와 변경된 비밀번호가 일치합니다.",
    success: "비밀번호가 변경되었습니다.",
  };

  let current = currentPw.value.trim(),
    pw = newPw.value.trim(),
    pwConfirm = newPwConfirm.value.trim();

  if (!current) return alert(alerts.currentEmpty) && currentPw.focus();
  if (!pw) return alert(alerts.newEmpty) && newPw.focus();
  if (!pwConfirm) return alert(alerts.confirmEmpty) && newPwConfirm.focus();
  if (pw !== pwConfirm) return alert(alerts.mismatch) && newPw.focus();
  if (!regExp.test(pw)) return alert(alerts.invalid) && newPw.focus();

  fetch("/myPage/changePw", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ currentPw: current, newPw: pw }),
  })
    .then((resp) => resp.json())
    .then((result) => {
      switch (result) {
        case 0:
          return alert(alerts.currentMismatch) && currentPw.focus();
        case 2:
          return alert(alerts.sameAsCurrent) && newPw.focus();
        case 1:
          alert(alerts.success) &&
            window.location.href == "redirect:/myPage/info";
      }
    });
});

//=================================================================================

// 이미지

//* 프로필 이미지 추가/변경/삭제 */
// 프로필 이미지 페이지 form 태그
const profileImgForm = document.querySelector("#profileImgForm");
// 프로필 이미지가 새로 업로드 되거나 삭제 되었음을 기록하는
// 상태 변수
// -1 : 초기 상태(변화 없음)
//  0 : 프로필 이미지 삭제
//  1 : 새 이미지 선택
let statusCheck = -1;
// input type="file" 태그의 값이 변경 되었을 때
// 변경된 상태를 백업해서 저장할 변수
// -> 파일이 선택/취소된 input을 복제해서 저장
// 요소. cloneNode(true|false) : 요소 복제(true 작성 시 하위 요소도 복제)
let backupInput;
// profileImgForm form태그가 화면에 있다면
if (profileImgForm != null) {
  // 1) 프로필 이미지 수정에 사용할 요소 모두 얻어오기
  // img 태그 (프로필 이미지가 보여지는 요소)
  const profileImgFormImg = document.querySelector("#profileImgFormImg");
  // input type="file" 태그 (실제 업로드할 프로필 이미지를 선택하는 요소)
  let inputImg = document.querySelector("#inputImg");
  // x버튼 (프로필 이미지를 제거하고 기본 이미지로 변경하는 요소)
  const deleteImg = document.querySelector("#deleteImg");
  // 3) changeImgFn 함수 정의하기
  /* input type="file"의 값이 변했을 때 동작할 함수(이벤트 핸들러) */
  const changeImgFn = (e) => {
    // 업로드 가능한 파일 최대 크기 지정하여 필터링
    const maxSize = 1024 * 1024 * 5;
    // 5MB == 1024KB * 5 == 1024B * 1024 * 5
    console.log("e.target", e.target); // input 태그
    console.log("e.target.value", e.target.value); // 변경된 값(파일명)
    // 선택된 파일에 대한 정보가 담긴 배열 반환
    // -> 왜 배열?? multiple 옵션에 대한 대비(파일 여러개 받을 때)
    console.log("e.target.files", e.target.files);
    // 업로드된 파일이 1개 있으면 files[0]에 저장됨
    // 업로드된 파일이 없으면 files[0] == undefined
    console.log("e.target.files[0]", e.target.files[0]);
    const file = e.target.files[0];
    // ------------ 업로드된 파일이 없다면(취소한 경우)------------
    if (file == undefined) {
      console.log("파일 선택 후 취소됨");

      // 파일 선택 후 취소 -> value == ''
      // -> 선택한 파일 없음으로 기록됨
      // -> backupInput으로 교체 시켜서
      //    이전 이미지가 남아 있는 것 처럼 보이게 함
      // 백업의 백업본
      const temp = backupInput.cloneNode(true);

      console.log("temp", temp); // 백업용 input태그
      // input 요소 다음에 백업 요소 추가
      inputImg.after(backupInput);

      // 화면에 존재하는 기존 input 제거
      inputImg.remove();
      // inputImg 변수에 백업을 대입해서 대신하도록 함
      inputImg = backupInput;
      // 화면에 추가된  백업본에는
      // 이벤트 리스너가 존재하지 않기 때문에 추가
      inputImg.addEventListener("change", changeImgFn);
      // 한번 화면에 추가된 요소(backupInput)는 재사용 불가능
      //  backupInput의 백업본이 temp를 backupInput 으로 변경
      backupInput = temp;
      return; // 다른 코드 수행할필요없이 바로 return
    }

    // ----------- 선택된 파일이 최대 크기를 초과한 경우 ------------
    if (file.size > maxSize) {
      alert("5MB 이하의 이미지 파일을 선택해 주세요.");
      //파일을 선택할 때 5MB보다 큰 파일을 선택하면
      //일단 무조건 선택은 됨.
      //근데 우리는 5MB보다 큰 파일은 취급 안하고 싶음
      //그래서 대입된 5MB 초과한 파일을 없애버리겠다

      // 아직 변경된적없는 초기상태에서 5MB 초과하는 이미지를 선택한 경우
      if (statusCheck == -1) {
        inputImg.value = "";
      } else {
        // 기존에 변경하려고 선택한 이미지가 있는데
        // 다음에 선택한 이미지가 최대 크기를 초과한 경우
        // -> 비워버리면 안되고, 그 전에 선택한 이미지로 계속 보이게끔 처리해야함.
        // 백업의 백업본
        const temp = backupInput.cloneNode(true);
        // input 요소 다음에 백업 요소 추가
        inputImg.after(backupInput);
        // 화면에 존재하는 기존 input 제거
        inputImg.remove();
        // inputImg 변수에 백업을 대입해서 대신하도록 함
        inputImg = backupInput;
        // 화면에 추가된  백업본에는
        // 이벤트 리스너가 존재하지 않기 때문에 추가
        inputImg.addEventListener("change", changeImgFn);
        // 한번 화면에 추가된 요소(backupInput)는 재사용 불가능
        //  backupInput의 백업본이 temp를 backupInput 으로 변경
        backupInput = temp;
      }
      return; // 다른 코드 수행할필요없이 바로 return
    }

    // ------------- 선택된 이미지 미리보기 ----------------
    // JS에서 파일을 읽을 때 사용하는 객체
    // - 파일을 읽고 클라이언트 컴퓨터에 저장할 수 있음
    /*FileReader 객체는 웹 애플리케이션에서 비동기적으로 파일의 내용을 읽을 수 있게 해줍니다. */
    const reader = new FileReader();
    // 선택한 파일(file) 을 읽어와
    // BASE64 인코딩 형태로 읽어와 result 변수에 저장
    reader.readAsDataURL(file); // -> 읽어오기 이벤트(load)
    // readAsDataURL() : 파일을 BASE64 형식의 데이터 URL로 읽어들입니다.

    // console.log("reader:",reader);
    // result에 "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAW" 이런식으로 들어감
    // 읽어오기 끝났을 때 (파일 읽기 작업이 완료되면 이벤트 핸들러 함수를 실행)
    reader.addEventListener("load", (e) => {
      // e.target == reader
      // 읽어온 이미지 파일이 BASE64 형태로 반환됨
      const url = e.target.result; // reader.result
      // 프로필 이미지(img)에 src속성으로 url값 세팅
      profileImgFormImg.setAttribute("src", url);

      // 새 이미지 선택 상태를 기록
      statusCheck = 1;
      // 파일이 선택된 input을 복제해서 백업
      backupInput = inputImg.cloneNode(true);
    });
  };

  // 2) inputImg에 change 이벤트로 changeImgFn 등록
  // change 이벤트 : 새로운 값이 기존 값과 다를 경우 발생
  inputImg.addEventListener("change", changeImgFn);
  // ------------ 4) x버튼 클릭 시 기본 이미지로 변경 ----------------
  deleteImg.addEventListener("click", () => {
    // 프로필 이미지(img)를 기본 이미지로 변경
    profileImgFormImg.src = "/images/sample/profile.png";
    // input에 저장된 값(value)를 ''(빈칸)으로 변경
    //   -> input에 저장된 파일 정보가 모두 사라짐 == 데이터 삭제
    inputImg.value = "";
    backupInput = undefined; // 백업본도 삭제
    // 삭제 상태임을 기록
    statusCheck = 0;
  });
  // ------------ 5) #profileImgForm (form) 제출 시 -----------------
  profileImgForm.addEventListener("submit", (e) => {
    let flag = true;
    // loginMemberprofileImgFormImg : myPage-profileImgForm.html 하단에 script를 이용하여 타임리프로 선언해둔 변수

    // submit 해도 되는 경우 :
    // 1. 기존 프로필 이미지가 없다가 새 이미지가 선택된 경우
    if (loginMemberprofileImgFormImg == null && statusCheck == 1) flag = false;
    // 2. 기존 프로필 이미지가 있다가 삭제한 경우
    if (loginMemberprofileImgFormImg != null && statusCheck == 0) flag = false;

    // 3. 기존 프로필 이미지가 있다가 새 이미지가 선택된 경우
    if (loginMemberprofileImgFormImg != null && statusCheck == 1) flag = false;
    // 나머지의 경우는 기존 상태에서 변경사항이 없는 경우임.-> 제출막기
    if (flag) {
      // flag 값이 true인 경우
      e.preventDefault();
      alert("이미지 변경 후 클릭하세요");
    }
  });
}
