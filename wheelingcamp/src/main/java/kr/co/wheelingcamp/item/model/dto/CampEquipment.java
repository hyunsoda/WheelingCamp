package kr.co.wheelingcamp.item.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * 캠핑용품 관리 DTO
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CampEquipment extends Item {

	private int equipmentCategoryCode; // 캠핑용품 카테고리 번호
	private String equipmentCategoryName; // 캠핑용품 카테고리 이름

	private String equipmentName; // 캠핑용품 이름

	// 캠핑용품 대여
	private String equipmentRentPrice; // 캠핑용품 대여 비용
	private int equipmentRentCount; // 캠핑용품 대여 재고

	// 캠핑용품 판매
	private int equipmentSellPrice; // 캠핑용품 판매 가격
	private int equipmentSellCount; // 캠핑용품 판매 재고
}
