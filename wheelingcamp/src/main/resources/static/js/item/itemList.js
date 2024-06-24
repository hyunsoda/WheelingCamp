// 카테고리 버튼을 눌렀을 때 선택된 카테고리를 강조
const categoryListA = document.querySelectorAll("[name='categoryLi'] > a");

switch (categoryCode) {
  case 1:
    categoryListA[carGradeNo].classList.add("categorySelected");
    break;
  case 2:
    categoryListA[equipmentCategoryCode].classList.add("categorySelected");
    break;
}

// ---------------------------------------------------------------------------------------

// 선택된 정렬 순서를 강조
document
  .querySelectorAll("[name='sortNoLi'] > a")
  [sortNo].classList.add("sortNoSelected");

// ---------------------------------------------------------------------------------------

// 차랑 페이지일때만 사용될 함수들
if (categoryCode == 1) {
  // 차량 검색 요청용 함수
  function getItemList() {
    // 입력된 차고지 번호
    const carLocationNo = document.querySelector(
      "select[name='carLocationNo'] option:checked"
    ).value;

    const rentDate = document.getElementById("rentDate").value; // 입력된 대여 날짜
    const expectDate = document.getElementById("expectDate").value; // 입력된 반납 날짜

    let link = `/item/itemList?categoryCode=${categoryCode}`;

    if (rentDate.length != 0) {
      link += `&rentDate=${rentDate}&expectDate=${expectDate}`;
    }

    if (carLocationNo != 0) {
      link += `&carLocationNo=${carLocationNo}`;
    }

    // get 요청을 보내고 페이지를 전환
    location.href = link;
  }

  // ---------------------------------------------------------------------------------------

  // 대여 지역 선택값이 바뀌면 요청
  document
    .getElementById("carLocationNoSelect")
    .addEventListener("change", () => {
      getItemList();
    });

  // 대여 / 반납 날짜가 바뀌면 요청
  const rentExpectDateInput = document.querySelectorAll(
    "#rentDate, #expectDate"
  );
  const rentDateBefore = document.getElementById("rentDate").value; // 이전에 입력된 대여 날짜
  const expectDateBefore = document.getElementById("expectDate").value; // 이전에 입력된 반납 날짜

  rentExpectDateInput.forEach((e) => {
    e.addEventListener("change", () => {
      const rentDate = document.getElementById("rentDate").value; // 입력된 대여 날짜
      const expectDate = document.getElementById("expectDate").value; // 입력된 반납 날짜

      // 대여 날짜가 없을 때 요청 안함
      if (rentDate.length == 0) {
        return;
      }

      // 반납 날짜가 없을 때 요청 안함
      if (expectDate.length == 0) {
        return;
      }

      // 대여 날짜보다 반납 날짜가 빠른 경우 return
      if (rentDate > expectDate) {
        showMyCustomAlert255();

        // 이전에 입력한 값으로 되돌림
        e.value = e.id == "rentDate" ? rentDateBefore : expectDateBefore;
        return;
      }

      // 검색 요청
      getItemList();
    });
  });

  // 검색 버튼이 눌리면 요청
  document.getElementById("serachBtn").addEventListener("click", () => {
    getItemList();
  });

  // ---------------------------------------------------------------------------------------

  // 초기화 버튼이 눌릴 경우 내역 초기화
  document.getElementById("resetBtn").addEventListener("click", () => {
    // 입력된 지역 초기화
    document.querySelector("[name='carLocationNo']").value = 0;

    // 입력된 대여 날짜 초기화
    document.getElementById("rentDate").value = "";

    // 입력된 대여 날짜
    document.getElementById("expectDate").value = "";

    // 검색 요청
    getItemList();
  });
}

// ---------------------------------------------------------------------------------------

// 캠핑용품 페이지 시 사용할 함수
if (categoryCode == 2) {
}

//////////////////////////////////////////////////////////////////////////

function addInterest(itemNo, element) {
  if (loginMember == null) {
    alert("로그인 후 이용해주세요");
    return;
  }

  fetch("/interest/item", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ itemNo: itemNo }),
  })
    .then(function (resp) {
      return resp.text();
    })
    .then(function (result) {
      if (result == 1) {
        showMyCustomAlert154();
        element.classList.remove("fa-regular");
        element.classList.add("fa-solid");
      } else if (result == 2) {
        showMyCustomAlert155();
        element.classList.remove("fa-solid");
        element.classList.add("fa-regular");
      } else {
        console.log("진행 실패..");
      }
    });
}
