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
  
	
	 private PaymentMapper mapper;

	@Override
	public int setPayList(Map<String, Object> map) {
		
	    Map<String ,Object> payList = new HashMap<String , Object>();
	    
	    payList.put("payNo", payList.get("payNo"));
	    payList.put("totalAmount", payList.get("totalAmount"));
	    payList.put("orderName", payList.get("orderName"));
	    payList.put("paymentId", payList.get("paymentId"));
	    
	    int result = mapper.putPay(payList);
	    
	    if(result < 0) {
	    	return 0;
	    }else {
	    	
	    }
	    
	    
		
		
		return 1;
	}
	 
}
