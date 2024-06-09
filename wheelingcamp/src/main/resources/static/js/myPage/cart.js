// 대여 상품
const rentalAllCheck = document.querySelector(".rental-all-check"); // 대여상품 전체 체크
const rentalItems = document.querySelectorAll(".rental-check"); // 대여상품 개별 체크
const rentalPackages = document.querySelectorAll(".rental-package-check"); // 대여 페키지 개별 체크

// 구매 상품
const shoppingAllCheck = document.querySelector(".shopping-all-check"); // 구매상품 전체 체크
const shoppingItems = document.querySelectorAll(".shopping-check"); // 구매상품 개별 체크
const shoppingPackages = document.querySelectorAll(".shopping-package-check"); // 구매 패키지 개별 체크

// 가격
const rentalPrice = document.querySelector(".rental-price"); // 대여 결제 금액
const shoppingprice = document.querySelector(".shopping-price"); // 구매 결제 금액
const allRentalPrice = document.querySelector(".all-rental-price"); // 총 대여 상품 가격
const allShoppingPrice = document.querySelector(".all-shopping-price"); // 총 구매 상품 가격

const payMoney = document.querySelector(".payment-price"); // 총 결제 금액

// 증감 버튼
const rentalItemMinus = document.querySelectorAll(".rental-item-minus"); // 대여 아이템 감소
const rentalItemPlus = document.querySelectorAll(".rental-item-plus"); // 대여 아이템 증가
const rentalPackageMinus = document.querySelectorAll(".rental-package-minus"); // 대여 패키지 감소
const rentalPackagePlus = document.querySelectorAll(".rental-package-plus"); // 대여 패키지 증가

const shoppingItemMinus = document.querySelectorAll(".shopping-item-minus"); // 구매 아이템 감소
const shoppingItemPlus = document.querySelectorAll(".shopping-item-plus"); // 구매 아이템 증가
const shoppingPackageMinus = document.querySelectorAll(
  ".shopping-package-minus"
); // 구매 패키지 감소
const shoppingPackagePlus = document.querySelectorAll(".shopping-package-plus"); // 구매 패키지 증가

// 개수 span
const rentalItemSpan = document.querySelectorAll(".rental-item-count"); // 대여 아이템 개수
const rentalPackageSpan = document.querySelectorAll(".rental-package-count"); // 대여 패키지 개수
const shoppingItemSpan = document.querySelectorAll(".shopping-item-count"); // 구매 아이템 개수
const shoppingPackageSpan = document.querySelectorAll(
  ".shopping-package-count"
); // 구매 패키지 개수

// 아이템번호, 패키지번호
const rentalItemNo = document.querySelectorAll(".rental-item-no"); // 대여 아이템 번호
const rentalPackageNo = document.querySelectorAll(".rental-package-no"); // 대여 패키지 번호
const shoppingItemNo = document.querySelectorAll(".shopping-item-no"); // 구매 아이템 번호
const shoppingPackageNo = document.querySelectorAll(".shopping-package-no"); // 구매 패키지 번호

// 전체 체크 함수
const allCheck = (clickElement, items, packages) => {
  // 전체 체크하는 요소의 체크 여부에 따라 check 변수에 저장
  clickElement.addEventListener("click", () => {
    let check = clickElement.checked ? true : false;

    items.forEach((item) => {
      item.checked = check;
    });

    packages.forEach((package) => {
      package.checked = check;
    });
  });
};

// 개별 체크 함수
const soloCheck = (allCheck, clickChecks, otherChecks) => {
  clickChecks.forEach((check) => {
    check.addEventListener("click", () => {
      let test = true;
      // 상품 체크 리스트 확인
      clickChecks.forEach((ch) => {
        if (!ch.checked) {
          allCheck.checked = false;
          test = false;
        }
      });
      // 패키지 체크 리스트 확인
      otherChecks.forEach((ch) => {
        if (!ch.checked) {
          allCheck.checked = false;
          test = false;
        }
      });

      if (!test) return;
      allCheck.checked = true;
    });
  });
};

// 상품 감소 함수
const minusItem = (cartNo) => {
  fetch("/cart/itemMinus", {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    body: JSON.stringify({ cartNo: cartNo }),
  })
    .then((resp) => resp.text())
    .then((result) => {
      if (result > 0) {
        console.log("감소 확인");
      } else {
        console.log("감소 중 에러 발생  ");
      }
    });
};

// 감소 버튼 함수
// itemType 은 상품, 패키지 분류 1은 상품, 2는 패키지
const minus = (minusClick, countSpan, cartNo, itemType) => {
  minusClick.forEach((click, index) => {
    click.addEventListener("click", () => {
      if (parseInt(countSpan[index].innerText) == 1) {
        let answer = confirm("장바구니에서 삭제하시겠습니까?");

        if (answer) {
          // 삭제하는 함수
        }

        return;
      }

      // 상품을 감소할 때
      if (itemType == 1) {
        minusItem(cartNo);
      } else {
        // 패키지를 감소할 때
        minusPackage(cartNo);
      }

      //   새로 고침 함수를 해야함

      countSpan[index].innerText = parseInt(countSpan[index].innerText) - 1;
    });
  });
};

// 증가 버튼 함수
const plus = (plusClick, countSpan) => {
  plusClick.forEach((click, index) => {
    click.addEventListener("click", () => {
      countSpan[index].innerText = parseInt(countSpan[index].innerText) + 1;
    });
  });
};
// 상품 대여

// 상품 구매

// 증가 버튼 함수

allCheck(rentalAllCheck, rentalItems, rentalPackages); // 대여 상품 전체 체크 함수
allCheck(shoppingAllCheck, shoppingItems, shoppingPackages); // 구매 상품 전체 체크 함수

// 개별 대여 체크 함수
// 대여
soloCheck(rentalAllCheck, rentalItems, rentalPackages);
soloCheck(rentalAllCheck, rentalPackages, rentalItems);
// 구매
soloCheck(shoppingAllCheck, shoppingItems, shoppingPackages);
soloCheck(shoppingAllCheck, shoppingPackages, shoppingItems);

// 감소 버튼
// 대여
minus(rentalItemMinus, rentalItemSpan, rentalItemNo, 1);
minus(rentalPackageMinus, rentalPackageSpan, rentalPackageNo, 2);
// 구매
minus(shoppingItemMinus, shoppingItemSpan, shoppingItemNo, 1);
minus(shoppingPackageMinus, shoppingPackageSpan, shoppingPackageNo, 2);

// 증가 버튼
// 대여
plus(rentalItemPlus, rentalItemSpan);
plus(rentalPackagePlus, rentalPackageSpan);
// 구매
plus(shoppingItemPlus, shoppingItemSpan);
plus(shoppingPackagePlus, shoppingPackageSpan);
// 각 상품마다 수량 증감버튼 (결제 금액 변동)

// 각 상품마다 삭제 버튼 (결제 금액 변동)
// 각 상품마다 체크 할때 결제 금액 변동, 모든 상품이 체크되면 전체 상품체크가 체크 됨
// 체크된 상품만 결제금액 계산
//
