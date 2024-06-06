document.addEventListener('DOMContentLoaded', function () {
  var searchInput = this.documentElement.querySelector('.locationSearch');

  if (searchInput != null) {
    // 마우스 클릭 시 placeholder 텍스트 삭제
    searchInput.addEventListener('focus', function () {
      this.removeAttribute('placeholder');
    });

    // 포커스를 잃으면 다시 placeholder 텍스트 삽입
    searchInput.addEventListener('blur', function () {
      if (!this.value.trim()) {
        this.setAttribute('placeholder', '캠핑장을 검색하세요');
      }
    });
  }
});


//alert p



//alert p


// alert

// 댓글 작성 
function showMyCustomAlert(){
  
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "댓글 작성 완료 !" ;

 

  document.getElementById('custom-alert-wrap').style.display = 'block';
}
function showMyCustomAlertClose(){
  document.getElementById('custom-alert-wrap').style.display = 'none';
}
// 댓글 작성

// 답글 작성
function showMyCustomAlert2(){
  
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "답글 작성 완료 !" ;

 

  document.getElementById('custom-alert-wrap').style.display = 'block';
}
function showMyCustomAlertClose2(){
  document.getElementById('custom-alert-wrap').style.display = 'none';
}
// 답글 작성


// 댓글 수정

function showMyCustomAlert3(){
  
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "댓글 수정 완료 !" ;

 

  document.getElementById('custom-alert-wrap').style.display = 'block';
}
function showMyCustomAlertClose3(){
  document.getElementById('custom-alert-wrap').style.display = 'none';
}

// 댓글 수정

// 댓글 삭제 버튼 누르고 삭제완료 
function showMyCustomAlert4(){
  
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "댓글 삭제 완료 !" ;

 

  document.getElementById('custom-alert-wrap').style.display = 'block';
}
function showMyCustomAlertClose4(){
  document.getElementById('custom-alert-wrap').style.display = 'none';
}
// 댓글 삭제 버튼 누르고 삭제완료

// 게시글 수정 시 제목 입력 안하면 나오는 alert

function showMyCustomAlert5(){
  
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "제목을 입력해주세요 !" ;

 

  document.getElementById('custom-alert-wrap').style.display = 'block';
}
function showMyCustomAlertClose5(){
  document.getElementById('custom-alert-wrap').style.display = 'none';
}

// 게시글 수정 시 제목 입력 안하면 나오는 alert

// 게시글 수정 시 내용 입력 안하면 나오는 alert

function showMyCustomAlert6(){
  
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "내용을 입력해주세요 !" ;

 

  document.getElementById('custom-alert-wrap').style.display = 'block';
}
function showMyCustomAlertClose6(){
  document.getElementById('custom-alert-wrap').style.display = 'none';
}

// 게시글 수정 시 내용 입력 안하면 나오는 alert

// 게시글 수정 완료

function showMyCustomAlert7(){
  
  let customAlertP = document.querySelector(".custom-alert-p");

    customAlertP.innerHTML = "수정 완료 !" ;

  

 

  document.getElementById('custom-alert-wrap').style.display = 'block';
}
function showMyCustomAlertClose7(){
  document.getElementById('custom-alert-wrap').style.display = 'none';
}

// 게시글 수정 완료

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
      confirmP.innerHTML = "다른 답글을 작성 중 현재 댓글에 답글 작성 하시겠습니까?";

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

// confirm