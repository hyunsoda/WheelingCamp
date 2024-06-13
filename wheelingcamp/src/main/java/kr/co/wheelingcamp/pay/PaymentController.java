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

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

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
@RequestMapping("pay")






public class PaymentController {
	
	private final PaymentService service;
	
	 @PostMapping("payComplement")
	    public ResponseEntity<String> payComplement(
	    		@SessionAttribute("loginMember") Member loginMember
	    		) {
	        
		  //payment 에 들어오는 값 paymentId,  totalAmount, orderName 
		 // 보내줘야 되는 값 memberNo
		 
		 Map<String, Object> map = null;
		 
		 map.put("memberNo", loginMember.getMemberNo());
		 map.put("paymentId", paymentRequest.getPaymentId());
		 map.put("totalAmount", paymentRequest.getTotalAmount());
		 map.put("orderName", paymentRequest.getOrderName());
		 
		 int result = service.setPayList(map);
		 	
		 
		 
		 return ResponseEntity.ok("Payment processed successfully.");
//        return ResponseEntity.ok("Payment processed successfully.");
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed.");
	    }

}
