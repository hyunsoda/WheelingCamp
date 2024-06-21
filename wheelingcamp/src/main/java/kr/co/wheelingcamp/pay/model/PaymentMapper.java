package kr.co.wheelingcamp.pay.model;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

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
	
}
