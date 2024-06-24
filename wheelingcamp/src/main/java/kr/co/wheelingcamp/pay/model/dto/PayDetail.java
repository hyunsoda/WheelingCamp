package kr.co.wheelingcamp.pay.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class PayDetail {

	private int itemNo; // 아이템 번호
	private int payNo; // 주문번호
	private int categoryCode; // 카테고리 코드
	private String categoryName; // 카테고리 이름

	private String carName; // 차 이름
	private String equipmentName; // 캠핑용품 이름
	private String packageName; // 패키지 이름

	private int purchaseDetailNo; // 구매 디테일 번호
	private String purchaseDetailDelFl; // 구매 상세 취소 여부

	private int rentDetailNo; // 대여 디테일 번호
	private String returnFl;
	private int carStockNo;

}
