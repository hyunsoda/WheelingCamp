



// function showCustomConfirm() {
//     document.getElementById('customConfirm').style.display = 'block';
// }

// function closeCustomConfirm() {
//     document.getElementById('customConfirm').style.display = 'none';
// }

// function confirmAction() {
//     location.href = `/editBoard/${boardNo}/delete?cp=${cp}`;
//     closeCustomConfirm();
// }




//--------------------------------

// 1. #boardLike 가 클릭되었을 때
document.querySelector("#boardLike").addEventListener("click", e => {
 console.log("들어오는거야?");
  // 2. 로그인 상태가 아닌 경우 동작 X--
  if(loginMemberNo == null){
      alert("로그인 후 이용해 주세요");
      return;
  }

  // 3. 준비된 3개의 변수를 객체로 저장 (JSON 변환 예정)
  const obj = {
      "memberNo" : loginMemberNo,
      "boardNo" : boardNo,
      "likeCheck" : likeCheck
  };

  // 4. 좋아요 INSERT / DELETE 비동기 요청
  fetch("/board/like", {
      method : "POST",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify(obj)
  })
  .then(resp => resp.text()) // 반환 결과 text 형태로 변환
  .then(count => {

      if(count == -1){
          console.log("좋아요 처리 실패");
          return;
      }

      // 5. likeCheck 값 0 <-> 1 변환
      // -> 클릭될 때마다 INSERT / DELETE 동작을 번갈아 가면서 하게끔..
      likeCheck = likeCheck == 0 ? 1: 0;

      // 6. 하트를 채웠다/ 비웠다 바꾸기
      e.target.classList.toggle("fa-regular"); // 있으면 없애고 없으면 생김
      e.target.classList.toggle("fa-solid");

      // 7. 게시글 좋아요 수 수정
      e.target.nextElementSibling.innerText = count;

  })


})


// document.querySelector(".cancle-btn update-btn-page").addEventListener("click", function(){
//     location.href = location.pathname.replace("editBoard","board", "update", "dsd") + location.search;
// })

document.querySelector("#deleteBtn").addEventListener("click", async function(){
    if(await showMyCustomConfirm3()){
        location.href = `/editBoard/${boardNo}/delete?cp=${cp}`;
       
                         
     }
})