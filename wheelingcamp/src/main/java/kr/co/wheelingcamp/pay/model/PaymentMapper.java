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






	/** 결제 횟수 카운트 
	 * @param memberNo
	 * @return
	 */
	int getPaymentCount(Long memberNo);



	/** 첫 결제 시 10번 뱃지 수여
	 * @param memberNo
	 */
	void updateFirstPaymentBadge(Long memberNo);

}
