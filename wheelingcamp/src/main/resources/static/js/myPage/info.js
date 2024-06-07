//비밀번호가 현재 입력한 값과 같은지 확인
const checkPwForm = document.querySelector("#checkPwForm");
const inputPw = document.querySelector("#inputPw");

checkPwForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputPw.value.trim().length == 0) {
    alert("현재 비밀번호를 입력해주시기 바랍니다");
    e.preventDefault();
    return;
  }
  fetch("/myPage/checkPw", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: inputPw.value,
  })
    .then((resp) => resp.json())
    .then((result) => {
      if (result == 0) {
        alert("비밀번호가 일치하지 않습니다.");
        e.preventDefault();
        return;
      }
      window.location.href = "/myPage/profile";
    });
});

//=================================================================================
// 프로필 이미지 변경하기


const profileImgForm = document.querySelector("#profileImgForm");

let statusCheck = -1;

let backupInput;

if (profileImgForm != null) {
  
  const profileImg = document.querySelector("#profileImg");
  
  let inputImg = document.querySelector("#inputImg");
  
  const deleteImg = document.querySelector("#deleteImg");
  
  const changeImgFn = (e) => {
   
    const maxSize = 1024 * 1024 * 5;
    
    console.log("e.target", e.target);
    console.log("e.target.value", e.target.value); 
    console.log("e.target.files", e.target.files);
    
    console.log("e.target.files[0]", e.target.files[0]);
    const file = e.target.files[0];

    // ------------ 업로드된 파일이 없다면(취소한 경우)------------
    if (file == undefined) {
      console.log("파일 선택 후 취소됨");
      const temp = backupInput.cloneNode(true);
      console.log("temp", temp); 
      inputImg.after(backupInput);
      inputImg.remove();
      inputImg = backupInput;      
      inputImg.addEventListener("change", changeImgFn);
      backupInput = temp;
      return; 
    }

    // ----------- 선택된 파일이 최대 크기를 초과한 경우 ------------
    if (file.size > maxSize) {
      alert("5MB 이하의 이미지 파일을 선택해 주세요.");

      if (statusCheck == -1) {
        inputImg.value = "";
      } else {
        const temp = backupInput.cloneNode(true);
        inputImg.after(backupInput);
        inputImg.remove();
        inputImg = backupInput;
        inputImg.addEventListener("change", changeImgFn);
        backupInput = temp;
      }
      return; 
    }

    // ------------- 선택된 이미지 미리보기 ----------------
    const reader = new FileReader();
  
    reader.readAsDataURL(file); 
    reader.addEventListener("load", (e) => {
      const url = e.target.result; 
      profileImg.setAttribute("src", url);
      statusCheck = 1;
      backupInput = inputImg.cloneNode(true);
    });
  };

  // 2) inputImg에 change 이벤트로 changeImgFn 등록
  inputImg.addEventListener("change", changeImgFn);
  // ------------ 4) x버튼 클릭 시 기본 이미지로 변경 ----------------
  deleteImg.addEventListener("click", () => {
    // 프로필 이미지(img)를 기본 이미지로 변경
    profileImg.src = "/images/user.png";
   
    inputImg.value = "";
    backupInput = undefined; 
    statusCheck = 0;
  });

  // ------------ 5) #profileImgForm (form) 제출 시 -----------------
  
  profileImgForm.addEventListener("submit", (e) => {
    let flag = true;
    // submit 해도 되는 경우 :
    // 1. 기존 프로필 이미지가 없다가 새 이미지가 선택된 경우
    if (loginMemberProfileImg== null && statusCheck == 1) flag = false;
    // 2. 기존 프로필 이미지가 있다가 삭제한 경우
    if (loginMemberProfileImg != null && statusCheck == 0) flag = false;

    // 3. 기존 프로필 이미지가 있다가 새 이미지가 선택된 경우
    if (loginMemberProfileImg != null && statusCheck == 1) flag = false;
    // 나머지의 경우는 기존 상태에서 변경사항이 없는 경우임.-> 제출막기
    if (flag) {
      // flag 값이 true인 경우
      e.preventDefault();
      alert("이미지 변경 후 클릭하세요");
    }
  });
}


//회원 탈퇴 모달창
const checkSecession = {
  agree: false,
  currentPw: false,
};

const currentPw = document.querySelector("#currentPw");
const agree = document.querySelector("#agree");
const pwMessage = document.querySelector("#pwMessage");
const secessionBtn = document.querySelector("#secessionBtn");

const secessionForm = document.querySelector("#secessionForm");

// 비밀번호 입력 시 이벤트
currentPw.addEventListener("input", () => {
  if (currentPw.value.trim().length == 0) {
    pwMessage.innerText = "비밀번호를 입력해주세요";
    checkSecession.currentPw = false;
    return;
  }
  fetch("/myPage/checkPw", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: currentPw.value,
  })
    .then((resp) => resp.json())
    .then((result) => {
      if (result == 0) {
        pwMessage.innerText = "비밀번호 불일치";
        checkSecession.currentPw = false;
        return;
      }
      pwMessage.innerText = "비밀번호 일치";
      checkSecession.currentPw = true;
    });
});

// 동의체크박스
agree.addEventListener("change", (e) => {
  console.log(e.target.checked);
  if (e.target.checked) checkSecession.agree = true;
  else checkSecession.agree = false;
});

// 최종 서브밋 될 때 이벤트
secessionForm.addEventListener("submit", (e) => {
  if (!checkSecession.agree) {
    e.preventDefault();
    alert("탈퇴 약관에 동의해주세요");
    return;
  }

  if (!checkSecession.currentPw) {
    e.preventDefault();
    alert("비밀번호가 일치하지 않습니다");
    return;
  }

  alert("탈퇴 되었습니다!");
  return true;
});
