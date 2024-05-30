package kr.co.wheelingcamp.item.model.dto;

import java.util.List;

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

	private int packageNo;
	private int packagePrice;
	private List<Item> itemList;
}
