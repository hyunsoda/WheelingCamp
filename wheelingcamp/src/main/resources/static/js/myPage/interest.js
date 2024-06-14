// 화면 새로고침 함수
const redirect = () => {
  fetch("/interest/interestList", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ memberNo: memberNo }),
  })
    .then((resp) => resp.json())
    .then((result) => {
      // 차 대여 목록
      const rentalCarList = document.querySelector(".rentalCarList");
      rentalCarList.innerHTML = "";

      // 상품 대여 목록
      const rentalItemList = document.querySelector(".rentalItemList");
      rentalItemList.innerHTML = "";

      // 렌탈 차량이 비어 있을 때

      if (result.rentalCarList.length == 0) {
        const emptyHtml = `
          <div class="interest-none">
            <i class="fa-solid fa-car-side"></i>
            <span>관심 차량이 비었습니다.</span>
          </div>
        `;
        rentalCarList.innerHTML = emptyHtml;
      } else {
        // 렌탈 목록이 있을 때
        result.rentalCarList.forEach((rental) => {
          const rentalCarHtml = `
            <div class="rental-div-item">
              <div class="rental-div-item-checkbox">
                <input type="checkbox" checked class="rental-car-check" value="${rental.itemNo}" />
              </div>
              <div class="rental-div-item-img">
                <div class="rental-div-item-img-div">
                  <a href="/item/itemDetail?itemNo=${rental.itemNo}&categoryCode=${rental.categoryCode}">
                    <img src="/images/sample/profileImg.png" class="cart-img" />
                  </a>
                </div>
              </div>
              <div class="rental-div-item-info">
                <div class="rental-div-item-name">
                  <div class="rental-div-item-name-div">
                    <a href="/item/itemDetail?itemNo=${rental.itemNo}&categoryCode=${rental.categoryCode}">
                      <span class="item-name">${rental.itemName} [대여]</span>
                    </a>
                    <span class="item-price rental-item-price">${rental.price}원 </span>
                  </div>
                </div>
                <div class="rental-div-item-count">
                  <div class="rental-div-item-count-div">
                    <button class="rentalCarAppendBtn appendBtn"   value="${rental.categoryCode}">
                        장바구니 담기
                    </button>
                  </div>
                </div>
                <button class="rental-div-item-close rental-car-close">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          `;
          rentalCarList.innerHTML += rentalCarHtml;
        });
      }

      // 대여 상품 목록이 비어 있을 때
      if (result.rentalItemList.length == 0) {
        const emptyHtml = `
      <div class="interest-none">
        <i class="fa-solid fa-dolly"></i>
        <span>관심 상품이 비었습니다.</span>
      </div>
    `;
        rentalItemList.innerHTML = emptyHtml;
      } else {
        // 렌탈 목록이 있을 때
        result.rentalItemList.forEach((rental) => {
          let priceHtml;
          let nameHtml;

          if (rental.categoryCode == 2) {
            priceHtml = `<span class="item-price rental-item-price">대여  ${rental.price}원</span>
                        <span class="item-price2 rental-item-price">구매  ${rental.sellPrice}원</span>`;

            nameHtml = `<span class="item-name">${rental.itemName}</span>`;
          } else {
            priceHtml = `<span class="item-price rental-item-price">
            ${rental.price}원
          </span>`;
            nameHtml = `<span class="item-name">${rental.itemName} [대여]</span>`;
          }

          const rentalItemHtml =
            `
        <div class="rental-div-item">
          <div class="rental-div-item-checkbox">
            <input type="checkbox" checked class="rental-item-check" value="${rental.itemNo}" />
          </div>
          <div class="rental-div-item-img">
            <div class="rental-div-item-img-div">
              <a href="/item/itemDetail?itemNo=${rental.itemNo}&categoryCode=${rental.categoryCode}">
                <img src="/images/sample/profileImg.png" class="cart-img" />
              </a>
            </div>
          </div>
          <div class="rental-div-item-info">
            <div class="rental-div-item-name">
              <div class="rental-div-item-name-div">
                <a href="/item/itemDetail?itemNo=${rental.itemNo}&categoryCode=${rental.categoryCode}"> ` +
            nameHtml +
            `
                </a>` +
            priceHtml +
            `
              </div>
            </div>
            <div class="rental-div-item-count">
              <div class="rentalItem">
                <button class="rentalItemAppendBtn appendBtn"  value="${rental.categoryCode}">
                    장바구니 담기
                </button>
              </div>
            </div>
            <button class="rental-div-item-close rental-item-close">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      `;
          rentalItemList.innerHTML += rentalItemHtml;
        });
      }

      allFunc();
    });
};

// 전체 체크 함수
const allCheck = (clickElement, items) => {
  // 전체 체크하는 요소의 체크 여부에 따라 check 변수에 저장
  clickElement.addEventListener("click", () => {
    let check = clickElement.checked ? true : false;

    items.forEach((item) => {
      item.checked = check;
    });
  });
};

// 개별 체크 함수
const soloCheck = (allCheck, clickChecks) => {
  clickChecks.forEach((check) => {
    check.addEventListener("click", () => {
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
const deleteItem = (itemNo) => {
  const obj = {
    memberNo: memberNo,
    itemNo: itemNo,
  };

  fetch("/interest/itemDelete", {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
    body: JSON.stringify(obj),
  })
    .then((resp) => resp.text())
    .then((result) => {
      if (result > 0) {
        console.log("삭제 확인");
        redirect();
      } else {
        console.log("삭제 확인 중 에러 발생  " + result);
      }
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

        console.log("자동차");
        // 삭제 후 새로고침 함수
        redirect();
      }
    });
  });
};

// 추가하는 기능
const appendFunc = (obj, type) => {
  obj.type = type;

  fetch("/cart/appendCart", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(obj),
  })
    .then((resp) => resp.text())
    .then((result) => {
      if (result > 0) {
        alert("상품을 장바구니에 추가했습니다.");

        let answer = confirm("관심상품에서 지우시겠습니까?");
        if (answer) {
          // 삭제하는 함수
          deleteItem(obj.itemNo);
          // 새로고침 함수

          redirect();
        }
      } else {
        console.log("추가 실패.. " + result);
      }
    });
};

// 장바구니 추가 이벤트
const appendCart = (appendBtn, checks) => {
  appendBtn.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      const obj = {
        memberNo: memberNo,
        itemNo: checks[index].value,
      };

      // categoryCode가 1(차) 이거나 3(패키지)면 그대로 장바구니,
      // 2(장비)이면 대여인지 구매인지 따져주기
      if (btn.value == 1 || btn.value == 3) {
        console.log("자동차");
        appendFunc(obj, 1);
      } else {
        // 장바구니 추가 버튼 누를 때 사용한 요소 생성////////////////////////////////////
        const rentalBtn = document.createElement("button");
        const shoppingBtn = document.createElement("button");

        rentalBtn.innerText = "대여";
        shoppingBtn.innerText = "구매";

        rentalBtn.classList.add("rentalBtn");
        shoppingBtn.classList.add("shoppingBtn");

        rentalBtn.onclick = () => {
          appendFunc(obj, 1);
        }; // 대여추가하는 함수
        shoppingBtn.onclick = () => {
          appendFunc(obj, 2);
        }; // 구매추가하는 함수

        ////////////////////////////////////////////////////////////////////////////////

        const rentalItem = document.querySelectorAll(".rentalItem")[index];

        rentalItem.removeChild(btn);

        rentalItem.appendChild(rentalBtn);
        rentalItem.appendChild(shoppingBtn);

        document.addEventListener("click", (e) => {
          if (!btn.contains(e.target)) {
            if (!rentalItem.contains(btn)) {
              rentalItem.appendChild(btn);
            }

            if (rentalItem.contains(rentalBtn)) {
              rentalItem.removeChild(rentalBtn);
            }

            if (rentalItem.contains(shoppingBtn)) {
              rentalItem.removeChild(shoppingBtn);
            }
          }
        });
      }
    });
  });
};

const checkDeleteFunc = (checkes) => {
  const checkList = [];

  checkes.forEach((check) => {
    if (check.checked == true) {
      checkList.push(check.value);
    }
  });

  if (checkList.length == 0) {
    alert("선택한 상품이 존재하지 않습니다.");
    return;
  }

  if (!confirm("정말 삭제하시겠습니까?")) {
    return;
  }

  fetch("/interest/checkListDelete", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      checkes: checkList,
      memberNo: memberNo,
    }),
  })
    .then((resp) => resp.text())
    .then((result) => {
      if (result > 0) {
        // 삭제가 됐다면 화면 새로고침
        redirect();
        alert("삭제되었습니다.");
      } else {
        console.log("삭제 실패  " + result);
      }
    });
};

const checkDeleteBtn = (btn, checkes) => {
  // 동일한 함수 참조를 유지하기 위한 고차 함수 사용
  const makeCheckDeleteFuncWrapper = (checkes) => {
    return () => {
      checkDeleteFunc(checkes);
    };
  };

  // 동일한 함수 참조를 유지하기 위해 btn에 저장된 기존 핸들러를 제거
  if (btn._checkDeleteHandler) {
    btn.removeEventListener("click", btn._checkDeleteHandler);
  }

  // 새로운 핸들러를 생성하고 버튼에 저장
  btn._checkDeleteHandler = makeCheckDeleteFuncWrapper(checkes);
  btn.addEventListener("click", btn._checkDeleteHandler);
};

// 전체 기능 부여하는 함수
const allFunc = () => {
  // 대여 차
  const rentalCarAllCheck = document.querySelector(".rental-car-all-check"); // 대여 차 전체 체크
  const rentalCarCheckes = document.querySelectorAll(".rental-car-check"); // 대여 차 개별 체크

  // 대여 상품
  const rentalItemAllCheck = document.querySelector(".rental-item-all-check"); // 대여상품 전체 체크
  const rentalItemCheckes = document.querySelectorAll(".rental-item-check"); // 대여상품 개별 체크

  rentalCarAllCheck.checked = true;
  rentalItemAllCheck.checked = true;

  // 삭제 버튼
  const rentalCarCloses = document.querySelectorAll(".rental-car-close"); // 대여 차 삭제 버튼
  const rentalItemCloses = document.querySelectorAll(".rental-item-close"); // 대여 상품 삭제 버튼

  // 장바구니 담기 버튼
  const rentalCarAppendBtn = document.querySelectorAll(".rentalCarAppendBtn");
  const rentalItemAppendBtn = document.querySelectorAll(".rentalItemAppendBtn");

  // 체크된 항목만 삭제 버튼
  const rentalCarCheckDelete = document.getElementById(
    "rental-car-check-delete"
  ); // 대여 체크 삭제 버튼
  const rentalItemCheckDelete = document.getElementById(
    "rental-item-check-delete"
  );

  // 전체 체크 함수
  allCheck(rentalCarAllCheck, rentalCarCheckes); // 대여 차
  allCheck(rentalItemAllCheck, rentalItemCheckes); // 대여 상품

  // 개별 체크 함수
  soloCheck(rentalCarAllCheck, rentalCarCheckes); // 대여 차
  soloCheck(rentalItemAllCheck, rentalItemCheckes); // 대여 상품

  // 삭제 버튼
  deleteClick(rentalCarCloses, rentalCarCheckes); // 대여 차
  deleteClick(rentalItemCloses, rentalItemCheckes); // 대여 상품

  // 장바구니 추가 버튼
  appendCart(rentalCarAppendBtn, rentalCarCheckes); // 대여 차
  appendCart(rentalItemAppendBtn, rentalItemCheckes); // 대여 상품

  // 선택한 항복 삭제 버튼
  checkDeleteBtn(rentalCarCheckDelete, rentalCarCheckes); // 대여 차 삭제
  checkDeleteBtn(rentalItemCheckDelete, rentalItemCheckes); // 대여 상품 삭제
};

// 처음 시작될때 화면 로드
redirect();
