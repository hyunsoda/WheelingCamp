async function rentConfirm(rentDetailNo){

    if(await showMyCustomConfirm419()){
       location.href = `/myPage/borrowListCancle?rentDetailNo=` + rentDetailNo;
    }

}

async function purchaseConfirm(purchaseDetailNo) {
  if (await showMyCustomConfirm519()) {
      // try {
      //     const response = await fetch(`/myPage/purchaseListCancle?purchaseDetailNo=${purchaseDetailNo}`, {
      //         method: 'GET'
      //     });

      //     if (response.ok) {
      //       showMyCustomAlert3232();
      //         await reloadItemList(); // 리스트를 다시 불러오기
      //     } else {
      //         // 구매 취소 실패 시
      //         console.error('구매 취소 실패');
      //         showMyCustomAlert3233();
      //     }
      // } catch (error) {
      //     console.error('네트워크 오류:', error);
      // }

      location.href = `/myPage/purchaseListCancle?purchaseDetailNo=` + purchaseDetailNo;
  }



}

async function rentCancleConfirm(borrowCancleDetailNo){

    if(await showMyCustomConfirm1500()){
          location.href =`/myPage/borrorDeleteCancle?RentDetailNo=` +
          borrowCancleDetailNo;
    }

}

async function PurchaseCancleConfirm(purchaseCancleDetailNo){

    if(await showMyCustomConfirm1501()){
          location.href =`/myPage/PurchaseDeleteCancle?purchaseDetailNo=` +
          purchaseCancleDetailNo;
    }

}

// 대여 상세보기 
async function detailLook(categoryCode, itemNo, rentDetailNo){
 console.log('itemno :' + itemNo);
 console.log('categoryCode :' + categoryCode);

  location.href=`/payment/BorrowComplete?categoryCode=` + categoryCode 
  + "&itemNo=" + itemNo + "&detailLookNo=" + 2 + "&rentDetailNo="  + rentDetailNo;

}

// 구매 상세보기 
async function purchaseLook(categoryCode, itemNo, purchaseDetailNo){
 console.log('itemno :' + itemNo);
 console.log('categoryCode :' + categoryCode);

  location.href=`/payment/PurChaseComplete?categoryCode=` + categoryCode 
  + "&itemNo=" + itemNo + "&purchaseLookNo=" + 2 + "&purchaseDetailNo=" + purchaseDetailNo;

}




// async function reloadItemList() {
//   try {
//       const response = await fetch("/myPage/myOrderListRe");
//       const data = await response.json();

//       // itemListPurchase 처리
//       const purchaseWrapBox = document.querySelector('.purchase-wrap-box');
//       // const itemListContainer = purchaseWrapBox.querySelector('.purchaseSection');

//       const itemListContainer = document.querySelector(".purchaseSection");

//       // 기존 아이템 제거
//       itemListContainer.innerHTML = "";

//       data.forEach(item => {
//           const itemElement = document.createElement('section');
//           itemElement.classList.add('orderListSection', 'purchaseSection');

//           itemElement.innerHTML = `
//               <section class="list-box">
//                   <div class="list-box-in1">
//                       <img src="/images/eventBanner/2.banner.jpg" alt=""
//                           style="border-top-left-radius: 10px; border-bottom-left-radius: 10px; object-fit: cover;">
//                   </div>
//                   <div class="list-box-in2">
//                       <span class="list-box-in2-span">${item.equipmentName}</span>
//                       <div class="orderList-date-div">
//                           <h3 style="color: #585F38; font-size: 17px;">구매일: ${item.purchaseDate}</h3>
//                       </div>
//                   </div>
//                   <div class="list-box-in3">
//                       <section class="list-box-in3-section">
//                           <button class="list-box-in3-section-btn"
//                               data-purchase-detail-no="${item.purchaseDetailNo}"
//                               onclick="purchaseConfirm(this.getAttribute('data-purchase-detail-no'))">
//                               구매 취소 하기
//                           </button>
//                           <button class="list-box-in3-section-btn">구매 상세 보기</button>
//                       </section>
//                   </div>
//               </section>
//           `;

//           itemListContainer.appendChild(itemElement);
//       });
//   } catch (error) {
//       console.error('데이터 가져오기 오류:', error);
//   }
// }