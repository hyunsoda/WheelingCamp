package kr.co.wheelingcamp.interest.model.dto;

import kr.co.wheelingcamp.cart.model.dto.Cart;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Interest {
	
	private int cartNo;		// 장바구니 번호
	private int itemNo;		// 상품 번호
	private int memberNo;	// 회원 번호
	private int saleType;	// 판매유형 (1 - 대여, 2 - 구매)
	
	private String itemName;	// 상품 이름
	private int price;		// 상품 가격
	private String itemImg;		// 상품 이미지
	
	private int packageNo;	// 패키지 번호
	
}
