package kr.co.wheelingcamp.item.model.dto;

import java.util.List;

import kr.co.wheelingcamp.file.model.dto.ItemImage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * 패키지 관리 DTO
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Package extends Item {

	private int packageNo; // 패키지 번호
	private int packagePrice; // 패키지 대여 비용
	private List<Item> itemList; // 패키지 상품 리스트
}
