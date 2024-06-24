package kr.co.wheelingcamp.cart.model.dto;

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
public class Cart {

	private int cartNo;		// 장바구니 번호
	private int itemNo;		// 상품 번호
	private int cartCount;	// 상품 수량
	private int memberNo;	// 회원 번호
	private int saleType;	// 판매유형 (1 - 대여, 2 - 구매)
	private String startDate;	// 대여 날짜
	private String endDate;		// 반납 날짜
	private int totalPrice;		// 총 금액
	
	private int categoryCode; // 카테고리 코드 1- 차 2- 장비 3- 패키지
	
	private String itemName;	// 상품 이름
	private int price;		// 상품 가격
	private String itemImg;		// 상품 이미지
	
	private String stringDate;	// 예약 날짜
	// 2024. 06. 16 ~ 2024. 06. 24
	
	private int packageNo;	// 패키지 번호
	
}
