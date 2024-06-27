package kr.co.wheelingcamp.pay.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;

import ch.qos.logback.core.recovery.ResilientSyslogOutputStream;
import kr.co.wheelingcamp.item.model.dto.CampEquipment;
import kr.co.wheelingcamp.item.model.dto.Car;
import kr.co.wheelingcamp.item.model.dto.Package;
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
//	    payList.put("orderName", map.get("orderName"));
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
	    	  // 첫 결제인지 확인하고, 첫 결제일 경우 뱃지 수여, 100번째 결제일경우 뱃지 수여
            int memberNo = (int) map.get("memberNo");
            int paymentCount = mapper.getPaymentCount(memberNo); // 22

            if (paymentCount == 1) {
                mapper.updateFirstPaymentBadge(memberNo);
            }else if(paymentCount == 100) {
          	  mapper.update100thPaymentBadge(memberNo);
            }
            // 총 대여 금액 조회
            int totalAmount =  mapper.totalRentAmount(memberNo); 
            
            // 총 구매 금액 30만원 이상 12번 뱃지 수여
            if(totalAmount >= 300000) {
            	mapper.updateTotalAmount300000(memberNo);
            // 총 구매 금액 100만원 이상 13번 뱃지 수여
            }if(totalAmount >= 1000000) {
            	mapper.updateTotalAmount1000000(memberNo);
            // 총 구매 금액 500만원 이상 14번 뱃지 수여
            }if(totalAmount >= 5000000){
            	mapper.updateTotalAmount5000000(memberNo);
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
//		    payList.put("orderName", map.get("orderName"));
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
	            }else if(paymentCount == 100) {
	            	  mapper.update100thPaymentBadge(memberNo);
	            }
	            
	            // 총 대여 금액 조회
	            int totalAmount =  mapper.totalRentAmount(memberNo); 
	            
	            // 총 구매 금액 30만원 이상 12번 뱃지 수여
	            if(totalAmount >= 300000) {
	            	mapper.updateTotalAmount300000(memberNo);
	            // 총 구매 금액 100만원 이상 13번 뱃지 수여
	            }if(totalAmount >= 1000000) {
	            	mapper.updateTotalAmount1000000(memberNo);
	            // 총 구매 금액 500만원 이상 14번 뱃지 수여
	            }if(totalAmount >= 5000000){
	            	mapper.updateTotalAmount5000000(memberNo);
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
		
		
		int equiment_rent_count = mapper.equimentRentCount(map);
		
		if(equiment_rent_count < 0) {
				return 0;
		}else {
			mapper.chagamEquimentRentCount(map);
		}
		
		
		Map<String ,Object> payList = new HashMap<String , Object>();
	    
	    
	    payList.put("totalAmount",  map.get("totalAmount"));
//	    payList.put("orderName", map.get("orderName"));
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
            }else if(paymentCount == 100) {
          	  mapper.update100thPaymentBadge(memberNo);
            }
            // 총 대여 금액 조회
            int totalAmount =  mapper.totalRentAmount(memberNo); 
            
            // 총 구매 금액 30만원 이상 14번 뱃지 수여
            if(totalAmount >= 300000) {
            	mapper.updateTotalAmount300000(memberNo);
            // 총 구매 금액 100만원 이상 13번 뱃지 수여
            }if(totalAmount >= 1000000) {
            	mapper.updateTotalAmount1000000(memberNo);
            // 총 구매 금액 500만원 이상 14번 뱃지 수여
            }if(totalAmount >= 5000000){
            	mapper.updateTotalAmount5000000(memberNo);
            }

	    }
	    
	    
		
		
		return 1;
	}




	/**
	 * 캠핑용품 구매하기
	 */

	@Override
	public int purChaseCamping(Map<String, Object> map) {
		
			System.out.println("캠핑용품 map :" + map);
		
		int equiment_sell_count = mapper.equimentSellCount(map);
		
		if(equiment_sell_count < 0) {
				return 0;
		}else {
			mapper.chagamEquimentSellCount(map);
		}
		
		
		Map<String ,Object> payList = new HashMap<String , Object>();
	    
	    payList.put("totalAmount",  map.get("totalAmount"));
//	    payList.put("orderName", map.get("orderName"));
	    payList.put("paymentId", map.get("paymentId"));
	    
	    
	   
	    
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
		    		System.out.println("...ㅇㅁ넹ㄴ멩ㅁ넹" +  map);
		    		int result3 = mapper.putRentDetailPutIsCampingThingsPurchase(map);
		    		
		    		if(result3 <0) {
		    			return 0;
		    		}
		    		
		    	}
	    	//***********************************************************************************************************************//
		    	//***********************************************************************************************************************//
	    	
	    	
	    	
	    	// 첫 결제인지 확인하고, 첫 결제일 경우/100번째 결제일 경우 뱃지 수여
            int memberNo = (int) map.get("memberNo");
            int paymentCount = mapper.getPaymentPurChaseCount(memberNo); // 22

            if (paymentCount == 1) {
                mapper.updateFirstPaymentBadge(memberNo);
            }else if(paymentCount == 100) {
            	  mapper.update100thPaymentBadge(memberNo);
            }
            // 총 대여 금액 조회
            int totalAmount =  mapper.totalPurchaseAmount(memberNo); 
            
            // 총 구매 금액 30만원 이상 12번 뱃지 수여
            if(totalAmount >= 300000) {
            	mapper.updateTotalAmount300000(memberNo);
            // 총 구매 금액 100만원 이상 13번 뱃지 수여
            }if(totalAmount >= 1000000) {
            	mapper.updateTotalAmount1000000(memberNo);
            // 총 구매 금액 500만원 이상 14번 뱃지 수여
            }if(totalAmount >= 5000000){
            	mapper.updateTotalAmount5000000(memberNo);
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
	 * 대여 완료햇을때 완료페이지에 띄어줄 상품 이름 불러오기
	 */
	@Override
	public Car carNameGet(int itemNo) {
		return mapper.carNameGet(itemNo);
	}




	@Override
	public CampEquipment camEquimentNameGet(int itemNo) {
		return mapper.equipmentNameGet(itemNo);
	}




	@Override
	public Package packageNameGet(int itemNo) {
		return mapper.packageNameGet(itemNo);
	}




	/**
	 * 장바구니에서 결제할때 pay 테이블에 잘 삽입되면
	 */
	@Override
	public int payPutComplete(int totalAmount, String paymentId) {
		return mapper.payPutComplete(totalAmount, paymentId);
	}




	/**
	 * 장바구니에서 결제할때 대여한게 있을때 RENT 테이블에 넣기
	 */
	@Override
	public int borrowListYou(String rentCount, String startDate,
			String endDate, int memberNo) {
		return mapper.borrowListYou(rentCount, startDate, endDate, memberNo);
	}

	/**
	 * 장바구니에서 결제할때 구매한게 있을때 PURCHASE 테이블에 넣기
	 */
	@Override
	public int PurchaseList(String shopCount, int memberNo) {
		return mapper.PurchaseList(shopCount, memberNo);
	}

 
	/**
	 *  rent 테이블에 넣고 잘들어갓을시 rent_detail에 넣기
	 */ 
	@Override
	public int putRentDetail(List<Map<String, Object>> itemsWithStartDate) {
		return mapper.putRentDetail(itemsWithStartDate);
	}
	
	/**
	 * PURCHASE 테이블에 넣고 잘들어갓을시 PURCHASE_detail 에 넣기
	 */
	@Override
	public int putPurchaseDetail(List<Map<String, Object>> shopItemInfo) {
		return mapper.putPurchaseDetail(shopItemInfo);
	}



     //// 리스트중에 카테고리 2번 = 캠핑용품 애들 번호찾아서 그거 갯수 차감시키기
	@Override
	public int putBorrowCategory2ChagamCampEquipment(List<Map<String, Object>> rentItemInfoCategoryCode2CampEquipment) {
		
		
		   int successCount = 0;
		    for (Map<String, Object> itemInfo : rentItemInfoCategoryCode2CampEquipment) {
		        System.out.println("캠핑용품 넘어가는 반복문 : " + itemInfo);
		        int updateResult = mapper.putBorrowCategory2ChagamCampEquipment(itemInfo);
		        if (updateResult == 1) {
		            successCount++;
		        } else {
		            return 0; // 하나라도 실패하면 0을 반환
		        }
		    }
		    return successCount == rentItemInfoCategoryCode2CampEquipment.size() ? 1 : 0;
		    
		    
		    
	}



	// 리스트중에 카테고리 3번 = 패키지 애들 번호찾아서 그거 갯수 차감시키기
	@Override
	public int putBorrowCategory3ChagamPackage(List<Map<String, Object>> rentItemInfoCategoryCode3packageList) {
		   int successCount = 0;
		   System.out.println("패키지 넘어가기전는 반복문 : " + rentItemInfoCategoryCode3packageList);
		    for (Map<String, Object> itemInfo : rentItemInfoCategoryCode3packageList) {
		        System.out.println("패키지 넘어가는 반복문 : " + itemInfo);
		        int updateResult = mapper.putBorrowCategory3ChagamPackage(itemInfo);
		        if (updateResult == 1) {
		            successCount++;
		        } else {
		            return 0; // 하나라도 실패하면 0을 반환
		        }
		    }
		    return successCount == rentItemInfoCategoryCode3packageList.size() ? 1 : 0;
	}




	/**
	 * 장바구니에서 결제한거중에 캠핑용품 번호 찾아서 그거 갯수 차감시키기
	 */
	@Override
	public int putBorrowCategory2ChagamCampEquipmentPurchase(
			List<Map<String, Object>> purchaseItemInfoCategoryCode2CampEquipment) {
		
		int successCount = 0;
		   System.out.println("구매한거 장바구니에서 넘어가기전는 반복문 : " + purchaseItemInfoCategoryCode2CampEquipment);
		    for (Map<String, Object> itemInfo : purchaseItemInfoCategoryCode2CampEquipment) {
		        System.out.println("구매한거 장바구니에서 넘어가는 반복문 : " + itemInfo);
		        int updateResult = mapper.putPurchaseCategory2ChagamCampEquipment(itemInfo);
		        if (updateResult == 1) {
		            successCount++;
		        } else {
		            return 0; // 하나라도 실패하면 0을 반환
		        }
		    }
		    return successCount == purchaseItemInfoCategoryCode2CampEquipment.size() ? 1 : 0;
		    
		    
	}




	/**
	 * 대여 상품 누르고 지금 누른거 상세 뽑아오기
	 */
	@Override
	public Pay getDetailLookPay(int memberNo, int rentDetailNo) {
		return mapper.getDetailLookPay(memberNo ,rentDetailNo);
	}




	/**
	 * 구매 내역 상품 지금 누른거 상세 봅아오기
	 */
	@Override
	public Pay getDetailLookPayBorrow(int memberNo, int purchaseDetailNo) {
		return mapper.getDetailLookPayBorrow(memberNo ,purchaseDetailNo);
	}




	





	
	
	 
	
	
	
}
