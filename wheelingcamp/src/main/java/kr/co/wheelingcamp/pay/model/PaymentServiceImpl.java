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
	    	
	    	 // 첫 결제인지 확인하고, 첫 결제일 경우 뱃지 수여
            Long memberNo = (Long) map.get("memberNo");
            int paymentCount = mapper.getPaymentCount(memberNo);

            if (paymentCount == 1) {
                mapper.updateFirstPaymentBadge(memberNo);
            }
	    }
	    
	    
		
		
		return 1;
	}
	 
}
