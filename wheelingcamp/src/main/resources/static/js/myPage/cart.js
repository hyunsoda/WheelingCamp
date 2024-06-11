// 화면 새로고침 함수
const redirect = () => {
  fetch("/cart/cartListTest", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ memberNo: memberNo }),
  })
    .then((resp) => resp.json())
    .then((result) => {
      // 대여 목록
      const rentalCartList = document.querySelector(".rentalCartList");
      rentalCartList.innerHTML = "";

      // 구매 목록
      const shoppingCartList = document.querySelector(".shoppingCartList");
      shoppingCartList.innerHTML = "";

      // 렌탈 목록이 비어 있을 때
      if (result.rentalList.length == 0) {
        const emptyHtml = `
        <div class="cart-none">
          <i class="fa-solid fa-tents"></i>
          <span>대여 상품 목록이 비었습니다.</span>
        </div>
      `;
        rentalCartList.innerHTML = emptyHtml;
      } else {
        // 렌탈 목록이 있을 때
        result.rentalList.forEach((rental) => {
          const rentalItemHtml = `
          <div class="rental-div-item">
            <div class="rental-div-item-checkbox">
              <input type="checkbox" checked class="rental-check" value="${rental.itemNo}" />
            </div>
            <div class="rental-div-item-img">
              <div class="rental-div-item-img-div">
                <img src="/images/sample/profileImg.png" class="cart-img" />
                <i class="fa-regular fa-heart"></i>
              </div>
            </div>
            <div class="rental-div-item-info">
              <div class="rental-div-item-name">
                <div class="rental-div-item-name-div">
                  <span class="item-name">${rental.itemName}</span>
                  <span class="item-price rental-item-price">${rental.price}원</span>
                </div>
              </div>
              <div class="rental-div-item-count">
                <div class="rental-div-item-count-div">
                  <button class="rental-div-item-count-div-button rental-minus">
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <span class="rental-div-item-count-div-span rental-count">${rental.cartCount}</span>
                  <button class="rental-div-item-count-div-button rental-plus">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
              <button class="rental-div-item-close rental-close">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        `;
          rentalCartList.innerHTML += rentalItemHtml;
        });
      }

      // 쇼핑 목록이 비어 있을 때
      if (result.shoppingList.length == 0) {
        const emptyHtml = `
        <div class="cart-none">
          <i class="fa-solid fa-tents"></i>
          <span>구매 상품 목록이 비었습니다.</span>
        </div>
      `;
        shoppingCartList.innerHTML = emptyHtml;
      } else {
        // 쇼핑 목록이 있을 때
        result.shoppingList.forEach((shopping) => {
          const shoppingItemHtml = `
          <div class="rental-div-item">
            <div class="rental-div-item-checkbox">
              <input type="checkbox" checked class="shopping-check" value="${shopping.itemNo}" />
            </div>
            <div class="rental-div-item-img">
              <div class="rental-div-item-img-div">
                <img src="/images/sample/profileImg.png" class="cart-img" />
                <i class="fa-regular fa-heart"></i>
              </div>
            </div>
            <div class="rental-div-item-info">
              <div class="rental-div-item-name">
                <div class="rental-div-item-name-div">
                  <span class="item-name">${shopping.itemName}</span>
                  <span class="item-price shopping-item-price">${shopping.price}원</span>
                </div>
              </div>
              <div class="rental-div-item-count">
                <div class="rental-div-item-count-div">
                  <button class="rental-div-item-count-div-button shopping-minus">
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <span class="rental-div-item-count-div-span shopping-count">${shopping.cartCount}</span>
                  <button class="rental-div-item-count-div-button shopping-plus">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
              <button class="rental-div-item-close shopping-close">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        `;
          shoppingCartList.innerHTML += shoppingItemHtml;
        });
      }

      allFunc();
    });
};

// 화면에 나와있는 금액을 계산하는 함수
const calculator = () => {
  const rentalCheckes = document.querySelectorAll(".rental-check"); // 대여상품 개별 체크
  const shoppingCheckes = document.querySelectorAll(".shopping-check"); // 구매상품 개별 체크
  const rentalSpan = document.querySelectorAll(".rental-count"); // 대여 아이템 개수
  const shoppingSpan = document.querySelectorAll(".shopping-count"); // 구매 아이템 개수

  // 가격
  const rentalItemPrice = document.querySelectorAll(".rental-item-price"); // 대여 상품 가격
  const shoppingItemPrice = document.querySelectorAll(".shopping-item-price"); // 구매 상품 가격

  const rentalPrice = document.querySelector(".rental-price"); // 대여 결제 금액
  const shoppingprice = document.querySelector(".shopping-price"); // 구매 결제 금액
  const allRentalPrice = document.querySelector(".all-rental-price"); // 총 대여 상품 가격
  const allShoppingPrice = document.querySelector(".all-shopping-price"); // 총 구매 상품 가격

  const payMoney = document.querySelector(".payment-price"); // 총 결제 금액

  let rentalTotalPrice = 0;
  let shoppingTotalPrice = 0;

  // 대여 금액 계산
  rentalItemPrice.forEach((ItemPrice, index) => {
    if (rentalCheckes[index].checked) {
      rentalTotalPrice +=
        parseInt(rentalSpan[index].innerText) *
        parseInt(ItemPrice.innerText.replace("원", ""));
    }
  });

  rentalPrice.innerText = rentalTotalPrice.toLocaleString();
  allRentalPrice.innerText = rentalTotalPrice.toLocaleString();

  // 구매 금액 계산
  shoppingItemPrice.forEach((ItemPrice, index) => {
    if (shoppingCheckes[index].checked) {
      shoppingTotalPrice +=
        parseInt(shoppingSpan[index].innerText) *
        parseInt(ItemPrice.innerText.replace("원", ""));
    }
  });

  shoppingprice.innerText = shoppingTotalPrice.toLocaleString();
  allShoppingPrice.innerText = shoppingTotalPrice.toLocaleString();

  payMoney.innerText = (
    rentalTotalPrice +
    shoppingTotalPrice +
    3000
  ).toLocaleString();
};

// 전체 체크 함수
const allCheck = (clickElement, items) => {
  // 전체 체크하는 요소의 체크 여부에 따라 check 변수에 저장
  clickElement.addEventListener("click", () => {
    let check = clickElement.checked ? true : false;

    items.forEach((item) => {
      item.checked = check;
      calculator();
    });
  });
};

// 개별 체크 함수
const soloCheck = (allCheck, clickChecks) => {
  clickChecks.forEach((check) => {
    check.addEventListener("click", () => {
      calculator();

      let test = true;
      // 상품 체크 리스트 확인
      clickChecks.forEach((ch) => {
        if (!ch.checked) {
          test = false;
        }
      });

      if (!test) {
        allCheck.checked = false;
        return;
      }
      allCheck.checked = true;
    });
  });
};

// 상품 삭제 함수
const deleteItem = (itemNo, type) => {
  const obj = {
    memberNo: memberNo,
    itemNo: itemNo,
    type: type,
  };

  fetch("/cart/itemDelete", {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
    body: JSON.stringify(obj),
  })
    .then((resp) => resp.text())
    .then((result) => {
      if (result > 0) {
        console.log("삭제 확인");
      } else {
        console.log("삭제 확인 중 에러 발생  " + result);
      }
    });
};

// 상품 증감 함수
const itemCountChange = (itemNo, math, type) => {
  const obj = {
    memberNo: memberNo,
    itemNo: itemNo, // 상품 번호
    math: math, // 감소인지 증가인지 판별
    type: type, // 대여인지 구매인지 판별
  };

  fetch("/cart/itemCount", {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    body: JSON.stringify(obj),
  })
    .then((resp) => resp.text())
    .then((result) => {
      if (result > 0) {
        console.log("증감 확인");
      } else {
        console.log("증감 처리 중 에러 발생  " + result);
      }
    });
};

// 감소 버튼 함수
// math는 감소할것인지 증가할것인지 판별 하는 변수 (1 감소, 2 증가)
// type은 대여상품인지, 구매상품인지 판별하는 변수 (1 대여, 2 구매)
const itemCount = (click, countSpan, itemNo, math, type) => {
  click.forEach((ck, index) => {
    ck.addEventListener("click", () => {
      // 개수가 1개고 감소하려고 할 때
      if (parseInt(countSpan[index].innerText) == 1 && math == 1) {
        let answer = confirm("장바구니에서 삭제하시겠습니까?");

        // 장바구니에서 상품을 삭제하는 함수
        if (answer) {
          deleteItem(itemNo[index].value, type);
          alert("장바구니에서 삭제되었습니다.");
          // 삭제 후 새로고침 함수
          redirect();
        }
        return;
      }

      // 아이템 개수 변경
      itemCountChange(itemNo[index].value, math, type);

      if (math == 1) {
        countSpan[index].innerText = parseInt(countSpan[index].innerText) - 1;
      } else {
        countSpan[index].innerText = parseInt(countSpan[index].innerText) + 1;
      }

      calculator();
    });
  });
};

// 삭제 버튼 이벤트
const deleteClick = (closes, itemNo, type) => {
  closes.forEach((close, index) => {
    close.addEventListener("click", () => {
      let answer = confirm("정말 삭제하시겠습니까?");

      if (answer) {
        deleteItem(itemNo[index].value, type);
        alert("장바구니에서 삭제되었습니다.");

        // 삭제 후 새로고침 함수
        redirect();
      }
    });
  });
};

// 전체 기능 부여하는 함수
const allFunc = () => {
  // 대여 상품
  const rentalAllCheck = document.querySelector(".rental-all-check"); // 대여상품 전체 체크
  const rentalCheckes = document.querySelectorAll(".rental-check"); // 대여상품 개별 체크

  // 구매 상품
  const shoppingAllCheck = document.querySelector(".shopping-all-check"); // 구매상품 전체 체크
  const shoppingCheckes = document.querySelectorAll(".shopping-check"); // 구매상품 개별 체크

  // 증감 버튼
  const rentalMinus = document.querySelectorAll(".rental-minus"); // 대여 아이템 감소
  const rentalPlus = document.querySelectorAll(".rental-plus"); // 대여 아이템 증가

  const shoppingMinus = document.querySelectorAll(".shopping-minus"); // 구매 아이템 감소
  const shoppingPlus = document.querySelectorAll(".shopping-plus"); // 구매 아이템 증가

  // 개수 span
  const rentalSpan = document.querySelectorAll(".rental-count"); // 대여 아이템 개수
  const shoppingSpan = document.querySelectorAll(".shopping-count"); // 구매 아이템 개수

  // 삭제 버튼
  const rentalCloses = document.querySelectorAll(".rental-close"); // 대여 삭제 버튼
  const shoppingCloses = document.querySelectorAll(".shopping-close"); // 구매 삭제 버튼

  // 전체 체크 함수
  allCheck(rentalAllCheck, rentalCheckes); // 대여 상품
  allCheck(shoppingAllCheck, shoppingCheckes); // 구매 상품

  // 개별 체크 함수
  soloCheck(rentalAllCheck, rentalCheckes); // 대여 상품
  soloCheck(shoppingAllCheck, shoppingCheckes); // 구매 상품

  // 증감 버튼 (math 1 - 감소, 2 - 증가) (type 1 - 대여, 2 - 구매)
  itemCount(rentalMinus, rentalSpan, rentalCheckes, 1, 1); // 대여 상품
  itemCount(shoppingMinus, shoppingSpan, shoppingCheckes, 1, 2); // 구매 상품
  itemCount(rentalPlus, rentalSpan, rentalCheckes, 2, 1); // 대여 상품
  itemCount(shoppingPlus, shoppingSpan, shoppingCheckes, 2, 2); // 구매 상품

  // 삭제 버튼
  deleteClick(rentalCloses, rentalCheckes, 1); // 대여 상품
  deleteClick(shoppingCloses, shoppingCheckes, 2); // 구매 상품

  // 가격 계산하는 함수
  calculator();
};

// 처음 시작될 때 계산해주는 함수

redirect();
