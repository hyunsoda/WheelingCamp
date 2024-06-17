package kr.co.wheelingcamp.pay.model;

import java.util.Map;

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

	/** 결제완료 페이지에 pay 목록 띄어줄거 갖고오기
	 * @param memberNo
	 * @return
	 */
	Pay getNowPayList(int memberNo);

}
