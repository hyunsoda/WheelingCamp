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


// 프로필 이미지 변경 하기
const profileImgForm = document.querySelector("#profileImgForm");

// 이미지 상태 기록하는 변수 지정
let statusCheck = -1;

let backupInput;

if(profileImgForm != null){
  //프로필 이미지 요소들 얻어오기
  const profileImg = document.querySelector("#profileImg");
  const inputImg = document.querySelector("#inputImg");
  const deleteImg = document.querySelector("#deleteImg");

  const changeImgFn = e =>{
    const maxSize = 1024 *1024 *5;
    const file = e.target.files[0];

    //업로드된 파일이 없는 경우 
    if(file == undefined){
      const temp = backupInput.cloneNode(true);
      inputImg.after(backupInput);
      inputImg.remove();
      inputImg = backupInput;
      inputImg.addEventListener("change",changeImgFn);
      backupInput = temp;
      return;
    }

    if(file.size > maxSize){
      alert("5MB 이하의 이미지 파일을 선택해 주세요.");
      if(statusCheck == -1){
        inputImg.value = '';
    
      } else{
        const temp = backupInput.cloneNode(true);
        inputImg.after(backupInput);
        inputImg.remove();
        inputImg = backupInput;
        inputImg.addEventListener("change", changeImgFn);

        backupInput = temp;
     }
     return;
    }

    //선택된 이미지 미리보기
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", e => {
      const url = e.target.result; 
      statusCheck = 1;
      backupInput = imageInput.cloneNode(true);
   });
 };


 inputImg.addEventListener("change", changeImgFn);

deleteImage.addEventListener("click", () => {
  profileImg.src = "/images/user.png";
  inputImg.value = '';
  backupInput = undefined; 
  statusCheck = 0;
});

profile.addEventListener("submit", e => {
  
  let flag = true;
 
 
 
  if(loginMemberProfileImg == null && statusCheck == 1) flag = false;
 
  if(loginMemberProfileImg != null && statusCheck == 0) flag = false;
 
  if(loginMemberProfileImg != null && statusCheck == 1) flag = false;

  if(flag){ 
    e.preventDefault();
    alert("이미지 변경 후 클릭하세요")
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
