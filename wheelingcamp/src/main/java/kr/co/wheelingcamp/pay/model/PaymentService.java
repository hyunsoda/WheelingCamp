package kr.co.wheelingcamp.pay.model;

import java.util.List;
import java.util.Map;

import kr.co.wheelingcamp.item.model.dto.CampEquipment;
import kr.co.wheelingcamp.item.model.dto.Car;
import kr.co.wheelingcamp.item.model.dto.Package;
import kr.co.wheelingcamp.pay.model.dto.Pay;

public interface PaymentService {

	/** 차량 대여하기
	 * @param map
	 * @return
	 */
	int setPayList(Map<String, Object> map);

	/** 패키지 대여하기
	 * @param map
	 * @return
	 */
	int borrowPackageList(Map<String, Object> map);

	/** 캠핑용품 대여하기
	 * @param map
	 * @return
	 */
	int borrowCamping(Map<String, Object> map);

	/** 캠핑용품 구매하기
	 * @param map
	 * @return
	 */
	int purChaseCamping(Map<String, Object> map);

	/** 결제하고 대여했을때 페이지에 pay 목록 띄어줄거 갖고오기
	 * @param memberNo
	 * @return
	 */
	Pay getNowPayList(int memberNo);

	/** 결제하고 구매했을때 페이지에 pay 목록 띄어줄거 갖고오기
	 * @param memberNo
	 * @return
	 */
	Pay getNowPayListPurChase(int memberNo);

	


	// 카테고리 번호 1번일때 차 이름 가져오기
	Car carNameGet(int itemNo);
 
	// 카테고리 번호 2번일때 캠핑 용품 이름 가져오기
	CampEquipment camEquimentNameGet(int itemNo);
  
	// 카테고리 번호 3번일때 패키지 이름 가져오기
	Package packageNameGet(int itemNo);

	/** Pay 테이블에 잘 삽입되면
	 * @param totalAmount
	 * @return
	 */
	int payPutComplete(int totalAmount, String paymentId);
 
	/** 장부구니 결제시 대여 결제한게 있을때
	 * @param itemsWithStartDate
	 * @param rentalCount
	 * @param startDate
	 * @param endDate
	 * @param memberNo
	 * @return
	 */
	int borrowListYou(String rentCount, String startDate,
			String endDate, int memberNo);

	/** rent 테이블에 넣고 잘들어갓을시 rent_detail에 넣기
	 * @param itemsWithStartDate
	 * @return
	 */
	int putRentDetail(List<Map<String, Object>> itemsWithStartDate);
	
	
	/** purchase 테이블에 넣고 잘들어갓을시 purchase_detail 에 넣기
	 * @param shopItemInfo
	 * @return
	 */
	int putPurchaseDetail(List<Map<String, Object>> shopItemInfo);

	//// 리스트중에 카테고리 2번 = 캠핑용품 애들 번호찾아서 그거 갯수 차감시키기
	int putBorrowCategory2ChagamCampEquipment(List<Map<String, Object>> rentItemInfoCategoryCode2CampEquipment);
	// 리스트중에 카테고리 3번 = 패키지 애들 번호찾아서 그거 갯수 차감시키기
	int putBorrowCategory3ChagamPackage(List<Map<String, Object>> rentItemInfoCategoryCode3packageList);

	/** 장바구니 결제시 구매한게 있을때 purchase 테이블에 넣기
	 * @param shopCount
	 * @param memberNo
	 * @return
	 */
	int PurchaseList(String shopCount, int memberNo);

	
	
	/** 장바구니에서 결제한거 중에 카테고리 2번 캠핑용품 찾아서 그거 갯수 차감시키기
	 * @param purchaseItemInfoCategoryCode2CampEquipment
	 * @return
	 */
	int putBorrowCategory2ChagamCampEquipmentPurchase(
			List<Map<String, Object>> purchaseItemInfoCategoryCode2CampEquipment);

	/** 주문 내역 대여 상세 보기 누른 상품 뽑아오기
	 * @param memberNo
	 * @return
	 */
	Pay getDetailLookPay(int memberNo, int rentDetailNo);

	/** 구매 내역 상세 보기 누른 상품 뽑아오기
	 * @param memberNo
	 * @param purchaseDetailNo
	 * @return
	 */
	Pay getDetailLookPayBorrow(int memberNo, int purchaseDetailNo);

	

}
