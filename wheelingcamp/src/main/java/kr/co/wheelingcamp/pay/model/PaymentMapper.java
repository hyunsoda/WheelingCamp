package kr.co.wheelingcamp.pay.model;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
@Mapper
public interface PaymentMapper {


	/** 결제 햇을때 pay 테이블에 들어갈값
	 * @param payList
	 * @return
	 */
	int putPay(Map<String, Object> payList);
	


	/** 결제 테이블에 잘 삽입되면 대여 테이블에 들어갈 값들
	 * @param rentList
	 */
	void putRent(Map<String, Object> rentList);

}
