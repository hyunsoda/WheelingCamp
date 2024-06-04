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
  if (boardTitle.value == "") {
    alert("제목을 입력해주세요");
    e.preventDefault();
    return;
  }

  if (boardContent.value == "") {
    alert("내용을 입력해주세요");
    e.preventDefault();
    return;
  }
});
