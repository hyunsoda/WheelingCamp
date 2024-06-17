package kr.co.wheelingcamp.pay.model;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;

import kr.co.wheelingcamp.pay.model.dto.Pay;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService{
  
	
	 private final PaymentMapper mapper;

	/**
	 * 차량 대여하기
	 */
	@Override
	public int setPayList(Map<String, Object> map) {
		
		
	    Map<String ,Object> payList = new HashMap<String , Object>();
	    

	  
	   
	    
	    payList.put("totalAmount",  map.get("totalAmount"));
	    payList.put("orderName", map.get("orderName"));
	    payList.put("paymentId", map.get("paymentId"));
	    
	 // 결제 테이블에 잘 삽입될시
	    int result = mapper.putPay(payList);
	    
	    if(result < 0) {
	    	return 0;
	    }else {
	    	Map<String , Object> rentList = new HashMap<String , Object>();
	    	
	    	rentList.put("rentDate", map.get("rentDate"));
	    	rentList.put("expectDate", map.get("expectDate"));
	    	rentList.put("memberNo", map.get("memberNo"));
	    	
	    	System.out.println("rentList : " + rentList);
	    	
	    	mapper.putRent(rentList);
	          
	           // 첫 결제인지 확인하고, 첫 결제일 경우 뱃지 수여
	            Long memberNo = (Long) map.get("memberNo");
	            int paymentCount = mapper.getPaymentCount(memberNo);

	            if (paymentCount == 1) {
	                mapper.updateFirstPaymentBadge(memberNo);
	            }
	       }

	    
	    
	
		
		return 1;
	}
	
	
	

	/**
	 * 패키지 대여하기
	 */
	@Override
	public int borrowPackageList(Map<String, Object> map) {
		 Map<String ,Object> payList = new HashMap<String , Object>();
		    

		  
		   
		    
		    payList.put("totalAmount",  map.get("totalAmount"));
		    payList.put("orderName", map.get("orderName"));
		    payList.put("paymentId", map.get("paymentId"));
		    
		    // 결제 테이블에 잘 삽입될시
		    int result = mapper.putPay(payList);
		    
		    if(result < 0) {
		    	return 0;
		    }else {
		    	
		    	Map<String , Object> rentList = new HashMap<String , Object>();
		    	
		    	rentList.put("rentDate", map.get("rentDate"));
		    	rentList.put("expectDate", map.get("expectDate"));
		    	rentList.put("memberNo", map.get("memberNo"));
		    	
		    	System.out.println("rentList : " + rentList);
		    	
		    	int result2 =mapper.putRent(rentList);

		    	if(result2 < 0) {
		    		return 0;
		    	}

		    }
		    
		    
			
			
			return 1;
	}




	/**
	 * 캠핑용품 대여하기
	 */
	@Override
	public int borrowCamping(Map<String, Object> map) {
		Map<String ,Object> payList = new HashMap<String , Object>();
	    

		  
		   
	    
	    payList.put("totalAmount",  map.get("totalAmount"));
	    payList.put("orderName", map.get("orderName"));
	    payList.put("paymentId", map.get("paymentId"));
	    
	    // 결제 테이블에 잘 삽입될시
	    int result = mapper.putPay(payList);
	    
	    if(result < 0) {
	    	return 0;
	    }else {
	    	
	    	Map<String , Object> rentList = new HashMap<String , Object>();
	    	
	    	rentList.put("rentDate", map.get("rentDate"));
	    	rentList.put("expectDate", map.get("expectDate"));
	    	rentList.put("memberNo", map.get("memberNo"));
	    	
	    	System.out.println("rentList : " + rentList);
	    	
	    	int result2 = mapper.putRent(rentList);

	    	if(result2 < 0) {
	    		return 0;
	    	}

	    }
	    
	    
		
		
		return 1;
	}




	/**
	 * 캠핑용품 구매하기
	 */

	@Override
	public int purChaseCamping(Map<String, Object> map) {
		
		Map<String ,Object> payList = new HashMap<String , Object>();
	    

		  
		   
	    
	    payList.put("totalAmount",  map.get("totalAmount"));
	    payList.put("orderName", map.get("orderName"));
	    payList.put("paymentId", map.get("paymentId"));
	    
	    // 결제 테이블에 잘 삽입될시
	    int result = mapper.putPay(payList);
	    
	    if(result < 0) {
	    	return 0;
	    }else {
	    	
	    	Map<String , Object> rentList = new HashMap<String , Object>();
	    	
	    	rentList.put("memberNo", map.get("memberNo"));
	    	
	    	System.out.println("rentList : " + rentList);
	    	
	    	int result2 = mapper.purChaseCamping(rentList);
	    	

	    	if(result2 < 0) {
	    		return 0;
	    	}
	    }
	    
	   
		
		
		return 1;
		
		
	}




	/**
	 * 결제 완료 페이지에 지금 pay 품목 가져오기
	 */
	@Override
	public Pay getNowPayList(int memberNo) {
		
		// 방금 산 결제 목록 가져오기
		
		Pay payList = mapper.getNowPay(memberNo);
		
		return payList;
	}
	
	
	 
	
	
	
}
