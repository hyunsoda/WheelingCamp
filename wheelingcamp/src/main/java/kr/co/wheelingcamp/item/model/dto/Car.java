package kr.co.wheelingcamp.item.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Car extends Item {

	private int carGradeNo; // 차급 번호
	private String carGradeName; // 차급

	private int carPassengers; // 자동차 최대 탑승 인원
	private int carSleepCapacity; // 자동차 취침 가능 인원
	private String carName; // 차 이름
	private int carRentPrice; // 차 대여 비용
	private String carFuel; // 유종 정보

}
