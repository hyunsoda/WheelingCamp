package kr.co.wheelingcamp.pay.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Pay {
	   private String paymentId;
	    private int totalAmount;
	    private String orderName;
	    private String expectDate;

	   
}
