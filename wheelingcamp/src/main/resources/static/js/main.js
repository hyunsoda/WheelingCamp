

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

function showMyCustomAlert65() {
  let customAlertP = document.querySelector(".custom-alert-p");

  customAlertP.innerHTML = "로그인 후 이용해주세요";

  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose65() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

function showMyCustomAlert75() {
  let customAlertP = document.querySelector(".custom-alert-p");

  customAlertP.innerHTML = "로그인 후 이용해주세요";

  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose75() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}




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

function showMyCustomAlert100() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "결제가 취소됨" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose100() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

// 결제중 취소 버튼 



// 결제중 취소 버튼

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
// 댓글 등록 실패

function showMyCustomAlert200() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "대여 날짜를 선택하세요" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose200() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

// 댓글 등록 실패

// 게시글 작성 하려고 하는데 로그인 안했을때 alert

function showMyCustomAlert55() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "로그인 후 이용해주세요" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose55() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}
// 게시글 작성 하려고 하는데 로그인 안했을때 alert

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

// 장바구니에서 삭제 

function showMyCustomAlert24124124() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "장바구니에서 삭제되었습니다" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlert24124124() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

// 장바구니에서 삭제 

function showMyCustomAlert1000000000000000() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "패키지 대여 완료 !" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlert1000000000000000() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

function showMyCustomAlert10000000000000001() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "캠핑용품 구매 완료 !" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlert10000000000000001() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

function showMyCustomAlert100000000000000012() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "캠핑용품 대여 완료 !" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlert100000000000000012() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

function showMyCustomAlert10000000000000001222() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "차량 대여 완료 !" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlert10000000000000001222() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

function showMyCustomAlert10004242() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "결제 실패 !" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlert10004242() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

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

function showMyCustomAlert3232() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "구매 취소 완료" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose3232() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

function showMyCustomAlert3233() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "취소 실패" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose3233() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

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

// 로그인 후 이용

function showMyCustomAlert153() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "로그인 후 이용해주세요" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose153() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}


// 로그인 후 이용

// 찜록록에서 추가

function showMyCustomAlert154() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "찜 목록으로 추가 되었습니다" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose154() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}


// 찜록록에서 추가



function showMyCustomAlert512512412321() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "선택한 상품이 존재하지 않습니다" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlert512512412321() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

// 찜록록에서 삭제

function showMyCustomAlert155() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "찜목록에서 삭제 되었습니다" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose155() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}


// 찜록록에서 삭제

// 대여 날짜보다 반납 날짜가 늦을 수 없습니다!

function showMyCustomAlert255() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "대여 날짜보다 반납 날짜가 늦을 수 없습니다!" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose255() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}


// 대여 날짜보다 반납 날짜가 늦을 수 없습니다!

// 예약 날짜를 선택해주세요

function showMyCustomAlert156() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "예약 날짜를 선택해주세요" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose156() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}


function showMyCustomAlert1312312() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "결제 완료 !!" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlert1312312() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}




// 상품이 장바구니에 추가되었습니다

function showMyCustomAlert157() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "상품이 장바구니에 추가되었습니다" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlertClose157() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}


// 상품이 장바구니에 추가되었습니다

function showMyCustomAlert241241241242312() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "삭제되었습니다" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlert241241241242312() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

function showMyCustomAlert241241241242312412421() {
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "선택된 상품이 없습니다" ;


  document.getElementById("custom-alert-wrap").style.display = "block";
}
function showMyCustomAlert241241241242312412421() {
  document.getElementById("custom-alert-wrap").style.display = "none";
}

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

function showMyCustomConfirm419(){
  return new Promise((resolve, reject) => {
    let confirmP = document.querySelector(".confirmP");
    confirmP.innerHTML = "대여 취소 하시겠습니까?";

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

async function showMyCustomConfirm124124124(){
  return new Promise((resolve, reject) => {
    let confirmP = document.querySelector(".confirmP");
    confirmP.innerHTML = "장바구니에서 삭제 하시겠습니까?";

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

async function showMyCustomConfirm21412512512(){
  return new Promise((resolve, reject) => {
    let confirmP = document.querySelector(".confirmP");
    confirmP.innerHTML = "정말 삭제 하시겠습니까?";

    document.getElementById('customConfirm').style.display = 'block';

    document.querySelector(".confirmBtn").addEventListener("click", function await() {
        document.querySelector("#customConfirm").style.display = 'none';
        resolve(true);
    });

    document.querySelector(".confirmBtn2").addEventListener("click", function await() {
        document.querySelector("#customConfirm").style.display = 'none';
        resolve(false);
    });
});
}

function showMyCustomConfirm519(){
  return new Promise((resolve, reject) => {
    let confirmP = document.querySelector(".confirmP");
    confirmP.innerHTML = "구매 취소 하시겠습니까?";

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

async function showMyCustomConfirm1500() {
  return new Promise((resolve, reject) => {
      let confirmP = document.querySelector(".confirmP");
      confirmP.innerHTML = "대여 취소 철회 하시겠습니까?";

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

async function showMyCustomConfirm1501() {
  return new Promise((resolve, reject) => {
      let confirmP = document.querySelector(".confirmP");
      confirmP.innerHTML = "구매 취소 철회 하시겠습니까?";

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

