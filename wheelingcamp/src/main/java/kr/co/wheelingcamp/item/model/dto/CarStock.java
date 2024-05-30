package kr.co.wheelingcamp.item.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * 차량 재고 관리 DTO
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CarStock extends Car {

	private int carStockNo; // 차 재고 번호
	private String carId; // 차량 번호
	private String carRentCheck; // 차량 대여 여부
	private int carLocationNo; // 차고지 번호
	private String carLocationName; // 차고지 지역 명
}
