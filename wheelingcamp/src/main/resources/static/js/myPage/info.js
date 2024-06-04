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
