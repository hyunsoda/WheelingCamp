document.addEventListener("DOMContentLoaded", function () {
  var searchInput = this.documentElement.querySelector(".locationSearch");

  if (searchInput != null) {
    // 마우스 클릭 시 placeholder 텍스트 삭제
    searchInput.addEventListener("focus", function () {
      this.removeAttribute("placeholder");
    });

    // 포커스를 잃으면 다시 placeholder 텍스트 삽입
    searchInput.addEventListener("blur", function () {
      if (!this.value.trim()) {
        this.setAttribute("placeholder", "캠핑장을 검색하세요");
      }
    });
  }
});

//alert p

//alert p

// alert

// 댓글 작성
function showMyCustomAlert() {
  let customAlertP = document.querySelector(".custom-alert-p");

  customAlertP.innerHTML = "댓글 작성 완료 !";

  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}
// 댓글 작성

// 답글 작성
function showMyCustomAlert2() {
  let customAlertP = document.querySelector(".custom-alert-p");

  customAlertP.innerHTML = "답글 작성 완료 !";

  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose2() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}
// 답글 작성

// 댓글 수정

function showMyCustomAlert3() {
  let customAlertP = document.querySelector(".custom-alert-p");

  customAlertP.innerHTML = "댓글 수정 완료 !";

  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose3() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

// 댓글 수정

// 댓글 삭제 버튼 누르고 삭제완료
function showMyCustomAlert4() {
  let customAlertP = document.querySelector(".custom-alert-p");

  customAlertP.innerHTML = "댓글 삭제 완료 !";

  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose4() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}
// 댓글 삭제 버튼 누르고 삭제완료

// 게시글 수정 시 제목 입력 안하면 나오는 alert

function showMyCustomAlert5() {
  let customAlertP = document.querySelector(".custom-alert-p");

  customAlertP.innerHTML = "제목을 입력해주세요 !";

  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose5() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

// 게시글 수정 시 제목 입력 안하면 나오는 alert

// 게시글 수정 시 내용 입력 안하면 나오는 alert

function showMyCustomAlert6() {
  let customAlertP = document.querySelector(".custom-alert-p");

  customAlertP.innerHTML = "내용을 입력해주세요 !";

  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose6() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

// 게시글 수정 시 내용 입력 안하면 나오는 alert

// 게시글 수정 완료

function showMyCustomAlert7() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "수정 완료 !" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose7() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

// 게시글 수정 완료

// 댓글 등록 실패

function showMyCustomAlert8() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "댓글 길이가 너무 깁니다.." ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose8() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

// 댓글 등록 실패

// 답글 등록 실패

function showMyCustomAlert20() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "답글 길이가 너무 깁니다.." ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose20() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

// 답글 등록 실패

// 게시글 작성에서 제목 입력 안했을때

function showMyCustomAlert9() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "제목을 입력해주세요" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose9() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

// 게시글 작성에서 제목 입력 안했을때

// 게시글 작성에서 내용 입력 안했을때

function showMyCustomAlert11() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "내용을 입력해주세요" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose11() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

// 게시글 작성에서 내용 입력 안했을때

function showMyCustomAlert12() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "내용이 너무 깁니다" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose12() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}


// 댑글 내용 작성안하고 댓글 등록시

function showMyCustomAlert22() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "댓글 내용을 작성 해주세요" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose22() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

// 댓글 내용 작성안하고 댓글 등록시

// 답글 내용 작성안하고 댓글 등록시

function showMyCustomAlert32() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "답글 내용을 작성 해주세요" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose32() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

// 답글 내용 작성안하고 댓글 등록시

// 게시판 댓글 수정 내용 작성안하고 댓글 등록시

function showMyCustomAlert42() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "내용이 너무 깁니다" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose42() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

// 게시판 댓글 수정 내용 작성안하고 댓글 등록시

// 게시판 댓글 수정 내용 작성안하고 댓글 등록시

function showMyCustomAlert52() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "댓글 작성 후 수정 버튼을 클릭해주세요" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose52() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

// 게시판 댓글 수정 내용 작성안하고 댓글 등록시


// 댓글 삭제 실패

function showMyCustomAlert152() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "댓글 삭제 실패.." ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose152() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}


// 댓글 삭제 실패

// alert

// confirm

// 답글 작성하고 있는데 다른 답글 클릭시 confirm

// function showMyCustomConfirm(){
//   let confirmP = document.querySelector(".confirmP");

//   confirmP.innerHTML ="다른 답글을 작성 중 현재 댓글에 답글 작성 하시겠습니까?";

//   let flag = false;

//   document.getElementById('customConfirm').style.display = 'block';

//   document.querySelector(".confirmBtn").addEventListener("click", function(){
//     return flag = true;
//   })

//    document.querySelector(".confirmBtn2").addEventListener("click", function(){
//     document.querySelector("#customConfirm").style.display = 'none';
//     return flag = false;
//    })

// }

function showMyCustomConfirm() {
  return new Promise((resolve, reject) => {
    let confirmP = document.querySelector(".confirmP");
    confirmP.innerHTML =
      "다른 답글을 작성 중 현재 댓글에 답글 작성 하시겠습니까?";

    document.getElementById("customConfirm").style.display = "block";

    document
      .querySelector(".confirmBtn")
      .addEventListener("click", function () {
        document.querySelector("#customConfirm").style.display = "none";
        resolve(true);
      });

    document
      .querySelector(".confirmBtn2")
      .addEventListener("click", function () {
        document.querySelector("#customConfirm").style.display = "none";
        resolve(false);
      });
  });
}

// 답글 작성하고 있는데 다른 답글 클릭시 confirm

// 댓글 삭제 버튼 클릭시 confirm  

function showMyCustomConfirm2() {
  return new Promise((resolve, reject) => {
      let confirmP = document.querySelector(".confirmP");
      confirmP.innerHTML = "댓글을 삭제하시겠습니까?";

      document.getElementById('customConfirm').style.display = 'block';

      document.querySelector(".confirmBtn").addEventListener("click", function() {
          document.querySelector("#customConfirm").style.display = 'none';
          resolve(true);
      });

      document.querySelector(".confirmBtn2").addEventListener("click", function() {
          document.querySelector("#customConfirm").style.display = 'none';
          resolve(false);
      });
  });
}



// 댓글 삭제 버튼 클릭시 confirm 

// 게시글 삭제 confirm


function showMyCustomConfirm3() {
  return new Promise((resolve, reject) => {
      let confirmP = document.querySelector(".confirmP");
      confirmP.innerHTML = "게시글을 삭제하시겠습니까?";

      document.getElementById('customConfirm').style.display = 'block';

      document.querySelector(".confirmBtn").addEventListener("click", function() {
          document.querySelector("#customConfirm").style.display = 'none';
          resolve(true);
      });

      document.querySelector(".confirmBtn2").addEventListener("click", function() {
          document.querySelector("#customConfirm").style.display = 'none';
          resolve(false);
      });
  });
}




// 게시글 삭제 confirm




async function showMyCustomConfirm500() {
  return new Promise((resolve, reject) => {
      let confirmP = document.querySelector(".confirmP");
      confirmP.innerHTML = "취소 하시겠습니까?";

      document.getElementById('customConfirm').style.display = 'block';

      document.querySelector(".confirmBtn").addEventListener("click", function await () {
          document.querySelector("#customConfirm").style.display = 'none';
          resolve(true);
      });

      document.querySelector(".confirmBtn2").addEventListener("click", function await () {
          document.querySelector("#customConfirm").style.display = 'none';
          resolve(false);
      });
  });
}




// 게시글 작성중 취소 버튼 클릭시 취소

// 댓글 수정 눌럿는데 취소 버튼 눌렀을대

async function showMyCustomConfirm4(event) {
  event.preventDefault(); // 기본 링크 클릭 동작 중단

  const userConfirmed = await new Promise((resolve, reject) => {
      let confirmP = document.querySelector(".confirmP");
      confirmP.innerHTML = "취소 하시겠습니까?";

      document.getElementById('customConfirm').style.display = 'block';

      document.querySelector(".confirmBtn").addEventListener("click", function() {
          document.querySelector("#customConfirm").style.display = 'none';
          resolve(true);
      });

      document.querySelector(".confirmBtn2").addEventListener("click", function() {
          document.querySelector("#customConfirm").style.display = 'none';
          resolve(false);
      });
  });

  if (userConfirmed) {
      window.location.href = "/member/logout"; // 사용자가 확인을 클릭한 경우 로그아웃
  }
}

// 댓글 수정 눌럿는데 취소 버튼 눌렀을대


// confirm

// document.querySelector(".loginBtn").addEventListener("click", function(){
//   document.querySelector("#userModal").style.display = "block";
// })
