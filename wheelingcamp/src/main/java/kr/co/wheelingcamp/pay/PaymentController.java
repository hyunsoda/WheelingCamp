package kr.co.wheelingcamp.pay;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;



import groovy.util.logging.Slf4j;
import jakarta.annotation.PostConstruct;
import kr.co.wheelingcamp.member.model.dto.Member;
import kr.co.wheelingcamp.pay.model.PaymentService;
import kr.co.wheelingcamp.pay.model.dto.Pay;
import lombok.RequiredArgsConstructor;

@Controller
@SessionAttributes({"loginMember"})
@RequiredArgsConstructor
@PropertySource("classpath:/config.properties")
@RequestMapping("payment")
public class PaymentController {
	
	private final PaymentService service;
	
	@ResponseBody
	 @PostMapping("complete")
	    public ResponseEntity<String> payComplement(
	    		@SessionAttribute("loginMember") Member loginMember,
	    		@RequestBody Map<String, Object> map
	    		) {
		
		System.out.println(map);
	        
		  String[] dates = ((String) map.get("dateSpan")).split(" ~ ");
		  
		  String startDate = dates[0].trim(); // "2024. 06. 20"
		  String endDate = dates[1].trim();  // "2024. 06. 25"
		  
		  map.put("rendDate", startDate);
		  map.put("expectDate", endDate);
		  
		  // 갖고온것
		  
		  // memberNo , startDate , endDate , 
		  // 구매가격, 상품이름 , 아이템 번호 , PaymentId
		  
		  
		
		  //payment 에 들어오는 값 paymentId,  totalAmount, orderName 
		 // 보내줘야 되는 값 memberNo
		 map.put("memberNo", loginMember.getMemberNo());
		 
		 System.out.println("값받았냐" + map);
		 
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

}
