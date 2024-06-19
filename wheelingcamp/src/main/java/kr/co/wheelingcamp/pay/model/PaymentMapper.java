package kr.co.wheelingcamp.pay.model;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

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


	/** 총 대여금액 1만원 이상 11번 뱃지 수여
	 * @param memberNo
	 */
	void updateTotalAmount10000(int memberNo);


	/** 총 대여금액 10만원 이상12번 뱃지 수여
	 * @param memberNo
	 */
	void updateTotalAmount100000(int memberNo);



	/** 총 대여금액 20만원 이상 13번 뱃지 수여
	 * @param memberNo
	 */
	void updateTotalAmount200000(int memberNo);

}
