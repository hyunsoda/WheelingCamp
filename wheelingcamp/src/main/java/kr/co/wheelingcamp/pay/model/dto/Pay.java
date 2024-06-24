package kr.co.wheelingcamp.pay.model.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Pay {
		private int payNo; // 주문번호
		private String paymentId; // 주문 ID
	    private String totalAmount; // 총 개수
	    private String orderName; // 상품명
	    private int memberNo; // 구매회원
	    private String memberName; // 회원 이름
		private int itemCount; // 상품 개수
	    
	    // 구매
	    private int purchaseNo; // 구매번호
	    private String purchaseDate; // 대여일
	    private String purchaseDelFl; // 삭제여부
	    
	    // 대여
	    private int rentNo; // 대여번호
	    private String rentDate; // 대여날짜
	    private String expectDate; // 예상 반납날짜
	    private String rentDelFl; // 대여 취소 여부
	    private String expireDate; // 만기일
	    
	    private String equipmentName;
	    
	    private String packageName;
	    
	    private String carName;
}
