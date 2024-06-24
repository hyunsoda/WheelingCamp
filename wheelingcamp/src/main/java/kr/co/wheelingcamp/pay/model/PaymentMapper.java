package kr.co.wheelingcamp.pay.model;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.wheelingcamp.item.model.dto.CampEquipment;
import kr.co.wheelingcamp.item.model.dto.Car;
import kr.co.wheelingcamp.item.model.dto.Package;
import kr.co.wheelingcamp.pay.model.dto.Pay;
@Mapper
public interface PaymentMapper {


	/** 대여 햇을때 pay 테이블에 들어갈값
	 * @param payList
	 * @return
	 */
	int putPay(Map<String, Object> payList);
	


	/** 대여 테이블에 잘 삽입되면 대여 테이블에 들어갈 값들
	 * @param rentList
	 * @return 
	 */
	int putRent(Map<String, Object> rentList);



	/** 캠핑 용품 구매하기
	 * @param rentList
	 * @return 
	 */
	int purChaseCamping(Map<String, Object> rentList);



	int getPayNo();



	/** 대여한 결제 상품 뽑아오기
	 * @param memberNo
	 * @return
	 */
	Pay getNowPay(int memberNo);



	/**  구매한 결제 상품 뽑아오기
	 * @param memberNo
	 * @return
	 */
	Pay getNowPayPurchase(int memberNo);






	/** 대여시 결제 횟수 카운트 
	 * @param memberNo
	 * @return
	 */
	int getPaymentCount(int memberNo);



	/** 첫 결제 시 10번 뱃지 수여
	 * @param memberNo
	 */
	void updateFirstPaymentBadge(int memberNo);



	/** 구매시 결제 횟수 카운트
	 * @param memberNo
	 * @return
	 */
	int getPaymentPurChaseCount(int memberNo);



	/** 총 대여금액 조회
	 * @param memberNo
	 * @return
	 */
	int totalRentAmount(int memberNo);


	/** 총 대여금액 30만원 이상 11번 뱃지 수여
	 * @param memberNo
	 */
	void updateTotalAmount300000(int memberNo);


	/** 총 대여금액 100만원 이상12번 뱃지 수여
	 * @param memberNo
	 */
	void updateTotalAmount1000000(int memberNo);



	/** 총 대여금액 500만원 이상 13번 뱃지 수여
	 * @param memberNo
	 */
	void updateTotalAmount5000000(int memberNo);



	/** 대여일이 있는 상품 넣기 = 대여
	 * @param itemsWithStartDate
	 * @return
	 */
	int WithstartDateItems
	(@Param("itemsWithStartDate") List<Map<String, Object>> itemsWithStartDate, 
			@Param("paymentId") String paymentId);



	/** 대여일이 없는 상품 넣기 = 구매
	 * @param itemsWithoutStartDate
	 * @return
	 */
	int WithoutstartDateItems(@Param("itemsWithoutStartDate") List<Map<String, Object>> itemsWithoutStartDate, 
			@Param("paymentId") String paymentId);


	//RENT 테이블에 넣고 RENT_DETAIL 테이블에 넣기 ( 차량 대여)
	int putRentDetailPutIsCarBorrow(Map<String, Object> map);


	//RENT 테이블에 넣고 RENT_DETAIL 테이블에 넣기 ( 패키지 대여)
	int putRentDetailPutIsPacakgeBorrow(Map<String, Object> map);


	//RENT 테이블에 넣고 RENT_DETAIL 테이블에 넣기 ( 캠핑 용품  대여)
	int putRentDetailPutIsCampingThingsBorrow(Map<String, Object> map);


	//PURCHASE 테이블에 넣고 PURCHASE_DETAIL 테이블에 넣기 (캠핑 용품 구매)
	int putRentDetailPutIsCampingThingsPurchase(Map<String, Object> map);


    // 캠핑 용품 대여할건데 현재 equiment_rent_count 가 1이상일때만 가능하게함 그거 갯수가져오기
	int equimentRentCount(Map<String, Object> map);


    // 캠핑 용품 대여할건데 현재 equiment_rent_count 가 1 이상인거 확인했을때 갯수 1차감
	void chagamEquimentRentCount(Map<String, Object> map);


    // 패키지 대여할건데 현재 item_count 가 1이상일때만 가능하게함 그거 갯수가져오기
	int packageDetailItemCount(Map<String, Object> map);


	// 패키지 대여할건데 현재 item_count 가 1 이상인거 확인했을때 갯수 1차감
	void chagamPackageItemCount(Map<String, Object> map);


    //캠핑 용품 구매할건데 현재 equiment_sell_count 가 1 이상일때만 가능하게함 그거 갯수가져오기
	int equimentSellCount(Map<String, Object> map);


	//캠핑 용품 구매할건데 현재 equiment_sell_count 가 1 이상인거 확인했을때 갯수 1차감
	void chagamEquimentSellCount(Map<String, Object> map);


	// 대여 완료햇을때 완료페이지에 띄어줄 상품 이름 불러오기
	Car carNameGet(int itemNo);


	// 대여 완료햇을때 완료페이지에 띄어줄 상품 이름 불러오기
	CampEquipment equipmentNameGet(int itemNo);


	// 대여 완료햇을때 완료페이지에 띄어줄 상품 이름 불러오기
	Package packageNameGet(int itemNo);






	/** 장바구니에서 결제할때 pay 테이블에 잘 삽입되면
	 * @param totalAmount
	 * @return
	 */
	int payPutComplete(
			@Param("totalAmount")int totalAmount, 
			@Param("paymentId") String paymentId);

	/** 장바구니에서 구매품목 있을때 결제할때 purchase 테이블에 삽입하기
	 * @param shopCount
	 * @param memberNo
	 * @return
	 */
	int PurchaseList(
			@Param("shopCount") String shopCount, 
			@Param("memberNo")	int memberNo);

	/** 장바구니에서 대여품목 있을때 결제할때 rent table 에 삽입하기
	 * @param rentalCount
	 * @param startDate
	 * @param endDate
	 * @param memberNo
	 * @return
	 */
	int borrowListYou(
		@Param("rentCount")	String rentCount, 
		@Param("startDate")	String startDate, 
		@Param("endDate")	String endDate, 
		@Param("memberNo")	int memberNo);



	/** rent 테이블에 넣고 잘들어갓을시 rent_detail에 넣기
	 * @param itemsWithStartDate
	 * @return
	 */
	int putRentDetail(List<Map<String, Object>> itemsWithStartDate);
	
	/** purchase 테이블에 넣고 잘들어갓을시 purchase_detail에 넣기
	 * @param shopItemInfo
	 * @return
	 */
	int putPurchaseDetail(List<Map<String, Object>> shopItemInfo);


//	// 대여일이 있는 상품 = 대여 = rent 테이블에 넣기
//	int WithstartDateItemsPutRent(@Param("itemsWithStartDatePut") List<Map<String, Object>> itemsWithStartDate, 
//								  @Param("paymentId") String paymentId);
//
//
//	// 대여일이 없는 상품 = 구매 = purchase 테이블에 넣기
//	int WithoutStartDateItemsPutPurchase(@Param("itemsWithoutStartDatePut") List<Map<String, Object>> itemsWithoutStartDate, 
//										 @Param("paymentId")String paymentId);

	// 100번째 결제일 경우 뱃지 수여
	void update100thPaymentBadge(int memberNo);


////리스트중에 카테고리 2번 = 캠핑용품 애들 번호찾아서 그거 갯수 차감시키기
	int putBorrowCategory2ChagamCampEquipment(Map<String, Object> itemInfo);


////리스트중에 카테고리 3번 = 패키지 애들 번호찾아서 그거 갯수 차감시키기
	int putBorrowCategory3ChagamPackage(Map<String, Object> itemInfo);


  // 장바구니에서 결제하고 카테코리 2번 구매한거 찾아서 갯수 감소시키기
	int putPurchaseCategory2ChagamCampEquipment(Map<String, Object> itemInfo);



	/** 대여 구매내역 상세 뽑아오기
	 * @param memberNo
	 * @return
	 */
	Pay getDetailLookPay(
		@Param("memberNo")	int memberNo, 
		@Param("rentDetailNo")	int rentDetailNo);



	/** 구매 구매 내역 
	 * @param memberNo
	 * @param purchaseDetailNo
	 * @return
	 */
	Pay getDetailLookPayBorrow(
			@Param("memberNo")	int memberNo, 
			@Param("purchaseDetailNo")	int purchaseDetailNo);



	int totalPurchaseAmount(int memberNo);







	



	
	
}
