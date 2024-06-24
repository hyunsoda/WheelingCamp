// const file = document.querySelector("#file");
// const btn = document.querySelector("#btn");
// const formImg = document.querySelector("#formImg");

// formImg.addEventListener("submit", () => {});
// function handleSubmit(e) {
//   console.log("테스트");
//   e.preventDefault();
// }

// file.addEventListener("change", (e) => {
//   const fileItem = e.target.files[0];
//   console.log(fileItem);
//   if (fileItem) {
//     uploadFile(fileItem);
//   }
// });

// async function uploadFile(fileItem) {
//   try {
//     const formData = new FormData();
//     formData.append("image", fileItem);

//     const response = await fetch("/validateLicense/uploadImage", {
//       method: "POST",
//       body: formData,
//     });

//     if (response.ok) {
//       const data = await response.json();
//       // 서버에서 반환한 데이터 처리 로직 추가
//       console.log(data);
//     } else {
//       console.error("파일 업로드에 실패했습니다.");
//     }
//   } catch (error) {
//     console.error("오류 발생:", error);
//   }
// }

// btn.addEventListener("click", () => {
//   const fileItem = file.files[0];
//   if (fileItem) {
//     uploadFile(fileItem);
//   } else {
//     alert("파일을 선택하세요");
//   }
// });
