////////////////////////// 파일 찾기 선택 후 input에 채움
document.querySelectorAll(".file").forEach((file) => {
  file.addEventListener("change", function () {
    var fileName = this.value.split("\\").pop();
    this.closest(".filebox").querySelector(".upload-name").value = fileName;
  });
});

const cancelBtn = document.getElementById("cancel-btn");
const appendBtn = document.getElementById("append-btn");
const boardTitle = document.getElementById("boardTitle");
const boardContent = document.getElementById("boardContent");


// 등록 버튼을 눌렀을 때
appendBtn.addEventListener("click", (e) => {
  if (boardTitle.value.trim() == "") {
    showMyCustomAlert9();
    e.preventDefault();
    return;
  }
    if (boardContent.value.trim() == "") {
      showMyCustomAlert11();
      e.preventDefault();
      return;
    }
    
    if(boardContent.value.trim().length >= 4000){
      showMyCustomAlert12();
    e.preventDefault();
    return;
    }
   
 
});




cancelBtn.addEventListener("click" , async function(){

   const shot = await showMyCustomConfirm5();

   if (shot) { // shot 변수가 true인 경우
    location.href = `/board/boardList?cp=${cp}`;
} else {
    cancelBtn.removeAttribute('th:href'); // 속성을 제거하거나 다른 값을 설정할 수 있음
}

})

 async function showMyCustomConfirm5() {
  return new Promise((resolve, reject) => {
      let confirmP = document.querySelector(".confirmP");
      confirmP.innerHTML = "글 작성을 취소하시겠습니까?";

      document.getElementById('customConfirm').style.display = 'block';

       document.querySelector(".confirmBtn").addEventListener("click",  function await () {
          document.querySelector("#customConfirm").style.display = 'none';
          resolve(true); // 확인 버튼을 누르면 true로 해결
      });

      document.querySelector(".confirmBtn2").addEventListener("click",  function await () {
          document.querySelector("#customConfirm").style.display = 'none';
          resolve(false); // 취소 버튼을 누르면 false로 해결
      });
  });
}

// 게시글 작성중 취소 버튼 클릭시 취소