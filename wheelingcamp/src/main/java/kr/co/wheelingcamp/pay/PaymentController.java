


package kr.co.wheelingcamp.pay;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;



import groovy.util.logging.Slf4j;
import kr.co.wheelingcamp.item.model.dto.CampEquipment;
import kr.co.wheelingcamp.item.model.dto.Car;
import kr.co.wheelingcamp.item.model.dto.Package;
import kr.co.wheelingcamp.member.model.dto.Member;
import kr.co.wheelingcamp.pay.model.PaymentService;
import kr.co.wheelingcamp.pay.model.dto.Pay;
import lombok.RequiredArgsConstructor;


/**
 * 
 */
@SessionAttributes({"loginMember"})
@RequiredArgsConstructor
@RequestMapping("payment")
@Controller
public class PaymentController {
	
	private final PaymentService service;
	
	   /** 대여하기 차량   
	 * @param loginMember
	 * @param map
	 * @return
	 */
	@PostMapping("complete")
	   @ResponseBody
	    public ResponseEntity<String> payComplement(
	    		@SessionAttribute("loginMember") Member loginMember,
	    		@RequestBody Map<String, Object> map
	    		) {
		
	        
		  String[] dates = ((String) map.get("dateSpan")).split(" ~ ");
		  
		  String startDate = dates[0].trim(); // "2024. 06. 20"
		  String endDate = dates[1].trim();  // "2024. 06. 25"
		  
		  
		  map.put("rentDate", startDate);
		  map.put("expectDate", endDate);
		  
		  // 갖고온것
		  
		  // memberNo , startDate , endDate , 
		  // 구매가격, 상품이름 , 아이템 번호 , PaymentId
		  
		  
		
		  //payment 에 들어오는 값 paymentId,  totalAmount, orderName 
		 // 보내줘야 되는 값 memberNo
		 map.put("memberNo", loginMember.getMemberNo());
		 
		 
		 
//		 map.put("memberNo", loginMember.getMemberNo());
//		 map.put("paymentId", paymentRequest.getPaymentId());
//		 map.put("totalAmount", paymentRequest.getTotalAmount());
//		 map.put("orderName", paymentRequest.getOrderName());
		 
		 int result = service.setPayList(map);
		 	
		 if(result > 0) {
			 return ResponseEntity.ok("Payment processed successfully.");
		 }else {
			 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed.");
		 }
		 
		 
     
	    }
 
	 
	  
	  
	   /** 패키지 대여하기 
	     * @return
	     */
       @PostMapping("PackageComplete")
       public ResponseEntity<String> payComlementPurchase(
	    		@SessionAttribute("loginMember") Member loginMember,
	    		@RequestBody Map<String, Object> map
	    		){
    	      	     	   
    	   String[] dates = ((String) map.get("dateSpan")).split(" ~ ");
 		  
 		  String startDate = dates[0].trim(); // "2024. 06. 20"
 		  String endDate = dates[1].trim();  // "2024. 06. 25"
 		  
 		  
 		  map.put("rentDate", startDate);
 		  map.put("expectDate", endDate);
 		  
			 map.put("memberNo", loginMember.getMemberNo());
			 
		
			 
			 int result = service.borrowPackageList(map);
			 	
			 if(result > 0) {
				 return ResponseEntity.ok("Payment processed successfully.");
			 }else {
				 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed.");
			 }
			 
			 
	    }
       
       /** 캠핑용품 대여하기 
	     * @return
	     */
      @PostMapping("borrowCamping")
	    public ResponseEntity<String> borrowCamp(
	    		@SessionAttribute("loginMember") Member loginMember,
	    		@RequestBody Map<String, Object> map
	    		){
    	  
    	  System.out.println("payList: payListpayListpayListpayListpayListpayListpayList" + map);
   	   String[] dates = ((String) map.get("dateSpan")).split(" ~ ");
		  
		  String startDate = dates[0].trim(); // "2024. 06. 20"
		  String endDate = dates[1].trim();  // "2024. 06. 25"
		  
		  
		  map.put("rentDate", startDate);
		  map.put("expectDate", endDate);
		  

			 map.put("memberNo", loginMember.getMemberNo());
			 		 	 

			 
			 int result = service.borrowCamping(map);
			 	
			 if(result > 0) {
				 return ResponseEntity.ok("Payment processed successfully.");
			 }else {
				 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed.");
			 }
			 
			 
	    }
      
      
       
       
      /** 캠핑용품 구매하기
	     * @return
	     */
  	@PostMapping("purChaseCamp")
	    public ResponseEntity<String> purChaseCamp(
	    		@SessionAttribute("loginMember") Member loginMember,
	    		@RequestBody Map<String, Object> map
	    		){
			 map.put("memberNo", loginMember.getMemberNo());
			 
			
			 
			 int result = service.purChaseCamping(map);
			 	
			 if(result > 0) {
				 return ResponseEntity.ok("Payment processed successfully.");
			 }else {
				 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed.");
			 }
			 
			 
	    }
	 
  	
  	
  	/** 대여하기 완료했을때 페이지 넘어가기 전에 값 전달하기
  	 * @param categoryCode
  	 * @param model
  	 * @param loginMember
  	 * @return
  	 */
  	@RequestMapping("BorrowComplete")
  	public String carBorrowComplete(
  			@RequestParam("categoryCode") int categoryCode,
  			Model model,
  			@SessionAttribute("loginMember") Member loginMember,
  			@RequestParam("itemNo") int itemNo
  			) {
  		
  		Pay payList = service.getNowPayList(loginMember.getMemberNo());

  		
  		if(categoryCode == 1) {	
  				Car carList = service.carNameGet(itemNo);
  				model.addAttribute("carList", carList);
  		}else if(categoryCode == 2) {
  				CampEquipment equimentList= service.camEquimentNameGet(itemNo);
  				model.addAttribute("equimentList", equimentList);
  		}else {
  				Package packageList = service.packageNameGet(itemNo);
  				model.addAttribute("packageList", packageList);
  		}
  		
  		model.addAttribute("payList", payList);
  		model.addAttribute("categoryCode", categoryCode)  ;
  		
  		
  		return "complete/Borrow";
  	}
  	
  	  /** 구매(캠핑용품)하기 완료했을때 페이지 넘어가기 전에 값 전달하기
  	 * @param categoryCode
  	 * @param model
  	 * @param loginMember
  	 * @return
  	 */
  	@RequestMapping("PurChaseComplete")
  	  public String PurChaseComplete(
  			  @RequestParam("categoryCode") int categoryCode,
  			  Model model,
  			  @SessionAttribute("loginMember") Member loginMember
  			  ) {
  		
 
  		  
  		  Pay payList = service.getNowPayListPurChase(loginMember.getMemberNo());
  		  
  		  model.addAttribute("payList", payList);
  		  model.addAttribute("categoryCode", categoryCode);
  		 
  		  
  		  return "complete/Purchase";
  	  }
  	
  	@RequestMapping("sumPurchase")
  	public ResponseEntity<String> sumPurchase(@RequestBody Map<String , Object> sumList,
  			                 @SessionAttribute("loginMember") Member loginMember
  			) {
  				// 모든 상품 리스트 가져오기
  				List<Map<String, Object>> itemList = (List<Map<String, Object>>) sumList.get("itemList");
  				
//  				List<Map<String, Object>> itemsWithoutStartDate = (List<Map<String, Object>>) sumList.get("shoppingList");
  				List<Map<String, Object>> itemsWithStartDate = (List<Map<String, Object>>) itemList.get("rentItemInfo");
  				List<Map<String, Object>> itemsWithoutStartDate = (List<Map<String, Object>>) itemList.get("shopItemInfo");
  				
  				System.out.println("------------------------------------------------------------");
  				System.out.println("itemsWithStartDate" + itemsWithStartDate);
  				System.out.println("itemsWithoutStartDate" + itemsWithoutStartDate);
  				
  		
  				int memberNo = loginMember.getMemberNo();
  				String paymentId = (String) sumList.get("paymentId");
  		
  		 
	    	int totalAmount = (int)sumList.get("totalAmount");
	    	
	    	// 1. 먼저 결제 테이블에 넣기
	    	int payPutComplete = service.payPutComplete(totalAmount, paymentId);
	    	
	    	if(payPutComplete < 0) {
	    		 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed.");
	    	}
  		
  		
  		
  	    
  	    
// 대여한게 있을때 ..  
	    	if(itemsWithStartDate != null && itemsWithStartDate.size() > 0) {
	    		
	    		// 대여한 물건 갯수들
	    		String rentalCount =  (String)sumList.get("rentalCount");
	    		
	    		String[] dates = ((String) sumList.get("date")).split(" ~ ");
	    		String startDate = dates[0].trim(); // "2024. 06. 20"
	    	    String endDate = dates[1].trim();  // "2024. 06. 25"
	    		
	    		// Rent 테이블에 일단 값 넣기
	    		int borrowListYou = service.borrowListYou(
	  	    			rentalCount,
	  	    			startDate,
	  	    			endDate,
	  	    			memberNo);
	    		
	    		
	    		if(borrowListYou < 0) {
	    			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed.");
	    		}
	    		
	    		// rent 테이블에 넣고 잘들어갓을시 rent_detail에 넣기
	    		int putRentDetail = service.putRentDetail(itemsWithStartDate);
	    		
	    		if(putRentDetail < 0) {
	    			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed.");
	    		}
	    		
// 대여한게 있을때 .. 
	    	}
// 대여한게 있을때 .. 
  	    
  	  
	  

  	    	
  	    	
	    	   String shoppingCount = (String)sumList.get("shoppingCount");
  	    	
  	    	
  	    	
	 	
		 
  			
	    	   return ResponseEntity.ok("Payment processed successfully.");
  	}
  	
}
