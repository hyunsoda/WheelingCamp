package kr.co.wheelingcamp.pay.model;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService{
  
	
	 private final PaymentMapper mapper;

	@Override
	public int setPayList(Map<String, Object> map) {
		
		
	    Map<String ,Object> payList = new HashMap<String , Object>();
	    

	  
	   
	    
	    payList.put("totalAmount",  map.get("totalAmount"));
	    payList.put("orderName", map.get("orderName"));
	    payList.put("paymentId", map.get("paymentId"));
	    
	    
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
	    }
	    
	    
		
		
		return 1;
	}
	 
}
