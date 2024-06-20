package kr.co.wheelingcamp.pay.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;

import ch.qos.logback.core.recovery.ResilientSyslogOutputStream;
import kr.co.wheelingcamp.pay.model.dto.Pay;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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
	    	
	    	
	    	
	    	
	    	
	    	
	    	//***********************************************************************************************************************//
	    	//***********************************************************************************************************************//
	    	   // 대여 테이블에 넣기 아래 잇는거보다 위에 이 구문이 존재 해야됨 안그러면 실행안돼
	    	int result2 = mapper.putRent(rentList);
	    	
	    	
	    	if(result2 < 0) {
	    		return 0;
	    	}else {
	    		//RENT 테이블에 넣고 RENT_DETAIL 테이블에 넣기
	    		int result3 = mapper.putRentDetailPutIsCarBorrow(map);
	    		System.out.println("3번째 값 : " + result3);
	    		
	    		if(result3 < 0) {
	    			return 0;
	    		}
	    	}
	    	
	    	//***********************************************************************************************************************//
	    	//***********************************************************************************************************************//
	    	  // 첫 결제인지 확인하고, 첫 결제일 경우 뱃지 수여
            int memberNo = (int) map.get("memberNo");
            int paymentCount = mapper.getPaymentCount(memberNo); // 22

            if (paymentCount == 1) {
                mapper.updateFirstPaymentBadge(memberNo);
            }
            // 총 대여 금액 조회
            int totalAmount =  mapper.totalRentAmount(memberNo); 
            
            // 총 구매 금액 1만원 이상 11번 뱃지 수여
            if(totalAmount >= 27) {
            	mapper.updateTotalAmount10000(memberNo);
            // 총 구매 금액 2만원 이상 12번 뱃지 수여
            }if(totalAmount >= 29) {
            	mapper.updateTotalAmount100000(memberNo);
            // 총 구매 금액 3만원 이상 11번 뱃지 수여
            }if(totalAmount >= 32){
            	mapper.updateTotalAmount200000(memberNo);
            }
      
	    
	          
	          
	            
	       }
		
		return 1;
	}
	
	
	

	/**
	 * 패키지 대여하기
	 */
	@Override
	public int borrowPackageList(Map<String, Object> map) {
		
		// 상품 수량 갖고오기
		
		int PACKAGE_ITEM_COUNT = mapper.packageDetailItemCount(map);
		
			if(PACKAGE_ITEM_COUNT < 0) {
				return 0;
				}else {
			mapper.chagamPackageItemCount(map);
				}
		
		
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
		    	
		    	//***********************************************************************************************************************//
		    	//***********************************************************************************************************************//
		    	   // 대여 테이블에 넣기 아래 잇는거보다 위에 이 구문이 존재 해야됨 안그러면 실행안돼
		    	
		    	int result2 = mapper.putRent(rentList);
		    	
		    	
		    	 if(result2 < 0) {
			    		return 0;
			    	}else {
			    		//RENT 테이블에 넣고 RENT_DETAIL 테이블에 넣기
			    		int result3 = mapper.putRentDetailPutIsPacakgeBorrow(map);
			    		
			    		if(result3 <0) {
			    			return 0;
			    		}
			    		
			    	}
		    	//***********************************************************************************************************************//
			    	//***********************************************************************************************************************//
		    	
		    	// 첫 결제인지 확인하고, 첫 결제일 경우 뱃지 수여
	            int memberNo = (int) map.get("memberNo");
	            int paymentCount = mapper.getPaymentCount(memberNo); // 22

	            if (paymentCount == 1) {
	                mapper.updateFirstPaymentBadge(memberNo);
	            }
	            
	            // 총 대여 금액 조회
	            int totalAmount =  mapper.totalRentAmount(memberNo); 
	            
	            // 총 구매 금액 1만원 이상 11번 뱃지 수여
	            if(totalAmount >= 10000) {
	            	mapper.updateTotalAmount10000(memberNo);
	            // 총 구매 금액 2만원 이상 12번 뱃지 수여
	            }if(totalAmount >= 20000) {
	            	mapper.updateTotalAmount100000(memberNo);
	            // 총 구매 금액 3만원 이상 11번 뱃지 수여
	            }if(totalAmount >= 30000){
	            	mapper.updateTotalAmount200000(memberNo);
	            }
	            
	           

		    }
		    
		    
			
			
			return 1;
	}




	/**
	 * 캠핑용품 대여하기
	 */
	@Override
	public int borrowCamping(Map<String, Object> map) {
		
		// camp_equiment 에 equiment_rent_count 에 -1 할껀데 그게 0보다 크면 가능하게 함
		
		System.out.println("map :에 잇나요 " + map);
		
		int equiment_rent_count = mapper.equimentRentCount(map);
		
		if(equiment_rent_count < 0) {
				return 0;
		}else {
			mapper.chagamEquimentRentCount(map);
		}
		
		
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
	    	
	    	
	    	//***********************************************************************************************************************//
	    	//***********************************************************************************************************************//
	    	   // 대여 테이블에 넣기 아래 잇는거보다 위에 이 구문이 존재 해야됨 안그러면 실행안돼
	    	
	    	int result2 = mapper.putRent(rentList);

	    	 if(result2 < 0) {
		    		return 0;
		    	}else {
		    		//RENT 테이블에 넣고 RENT_DETAIL 테이블에 넣기 = 캠핑용품 
		    		int result3 = mapper.putRentDetailPutIsCampingThingsBorrow(map);
		    		
		    		if(result3 <0) {
		    			return 0;
		    		}
		    		
		    	}
	    	//***********************************************************************************************************************//
		    	//***********************************************************************************************************************//
	    	
	    	
	    	
	    	// 첫 결제인지 확인하고, 첫 결제일 경우 뱃지 수여
            int memberNo = (int) map.get("memberNo");
            int paymentCount = mapper.getPaymentCount(memberNo); // 22

            if (paymentCount == 1) {
                mapper.updateFirstPaymentBadge(memberNo);
            }
            // 총 대여 금액 조회
            int totalAmount =  mapper.totalRentAmount(memberNo); 
            
            // 총 구매 금액 1만원 이상 11번 뱃지 수여
            if(totalAmount >= 27) {
            	mapper.updateTotalAmount10000(memberNo);
            // 총 구매 금액 2만원 이상 12번 뱃지 수여
            }if(totalAmount >= 29) {
            	mapper.updateTotalAmount100000(memberNo);
            // 총 구매 금액 3만원 이상 11번 뱃지 수여
            }if(totalAmount >= 32){
            	mapper.updateTotalAmount200000(memberNo);
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
	    
	    
	   System.out.println("payList: 제발요" + payList);
	    
	    // 결제 테이블에 잘 삽입될시
	    int result = mapper.putPay(payList);
	    
	    if(result < 0) {
	    	return 0;
	    }else {
	    	
	    	Map<String , Object> rentList = new HashMap<String , Object>();
	    	
	    	rentList.put("memberNo", map.get("memberNo"));
	    	
	    	
	    	//***********************************************************************************************************************//
	    	//***********************************************************************************************************************//
	    	   // 대여 테이블에 넣기 아래 잇는거보다 위에 이 구문이 존재 해야됨 안그러면 실행안돼
	    	
	    	int result2 = mapper.purChaseCamping(rentList);

	    	 if(result2 < 0) {
		    		return 0;
		    	}else {
		    		//RENT 테이블에 넣고 RENT_DETAIL 테이블에 넣기 = 캠핑용품 
		    		
		    		System.out.println("map에 워마기" + map);
		    		int result3 = mapper.putRentDetailPutIsCampingThingsPurchase(map);
		    		
		    		if(result3 <0) {
		    			return 0;
		    		}
		    		
		    	}
	    	//***********************************************************************************************************************//
		    	//***********************************************************************************************************************//
	    	
	    	
	    	
	    	// 첫 결제인지 확인하고, 첫 결제일 경우 뱃지 수여
            int memberNo = (int) map.get("memberNo");
            int paymentCount = mapper.getPaymentPurChaseCount(memberNo); // 22

            if (paymentCount == 1) {
                mapper.updateFirstPaymentBadge(memberNo);
            }
            // 총 대여 금액 조회
            int totalAmount =  mapper.totalRentAmount(memberNo); 
            
            // 총 구매 금액 1만원 이상 11번 뱃지 수여
            if(totalAmount >= 27) {
            	mapper.updateTotalAmount10000(memberNo);
            // 총 구매 금액 2만원 이상 12번 뱃지 수여
            }if(totalAmount >= 29) {
            	mapper.updateTotalAmount100000(memberNo);
            // 총 구매 금액 3만원 이상 11번 뱃지 수여
            }if(totalAmount >= 32){
            	mapper.updateTotalAmount200000(memberNo);
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




	@Override
	public Pay getNowPayListPurChase(int memberNo) {
			Pay payList = mapper.getNowPayPurchase(memberNo);
			
		
		return payList;
	}




	/**
	 * 장바구니 상품 최종 결제완료 하기 구문
	 */
	@Override
	public int SumPurchase(
			List<Map<String, Object>> itemsWithStartDate,
			List<Map<String, Object>> itemsWithoutStartDate,
			String paymentId
			) {
		

		
		// 대여일이 있는 상품 넣기 = 대여
		int result1 = mapper.WithstartDateItems(itemsWithStartDate, paymentId);
		
		// 대여일이 없는 상품 넣기 = 구매
		int result2 = mapper.WithoutstartDateItems(itemsWithoutStartDate, paymentId);
		
		if(result1>0&& result2 >0) {
			
			
			
			
			return 1;
		}
		
		return 0;
	}
	
	
	 
	
	
	
}
