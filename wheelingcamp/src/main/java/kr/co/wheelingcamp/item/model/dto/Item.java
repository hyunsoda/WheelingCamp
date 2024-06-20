package kr.co.wheelingcamp.item.model.dto;

import java.util.List;

import kr.co.wheelingcamp.file.model.dto.ItemImage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * 전체 상품 관리 DTO
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Item {

	protected int itemNo; // 상품 고유 번호
	private int itemName; // 상품 이름
	private int categoryCode; // 상품 카테고리 번호
	private String categoryName; // 상품 카테고리 번호
	private int itemViewCount; // 상품 조회수
	private String itemDetailContent; // 상품 정보

	// 상품 이미지
	private String thumbnail; // 상품 썸네일
	private List<ItemImage> itemImageList; // 상품 이미지 리스트
}
