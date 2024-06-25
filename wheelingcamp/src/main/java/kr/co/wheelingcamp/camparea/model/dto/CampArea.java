package kr.co.wheelingcamp.camparea.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CampArea {
	private String siseolmyeong; // 시설명
	
	private String normalCampsite; // 일반캠핑장
	private String carCampsite; // 차량캠핑장
	private String caravan; // 카라반
	private String glamping; // 글램핑
	
	private long latitude; // 위도
	private long longitude; // 경도
	
	private int postalCode; // 우편번호
	private String roadNameAddress; // 도로명 주소
	private String numberAddress; // 지번 주소
	
	private String phoneNumber; // 전화번호
	private String homepage; // 홈페이지
	
	private String businessEntity; // 민간 / 지차체
	
	private String weekdayOperations; // 평일 운영
	private String weekendOperations; // 주말 운영
	private String springOperations; // 봄 운영
	private String summerOperations; // 여름 운영
	private String autumnOperations; // 가을 운영
	private String winterOperations; // 가을 운영
	
	private String electricity; // 전기 사용 가능 여부
	private String hotWater; // 온수 사용 가능 여부
	private String wiFi; // 와이파이 사용 가능 여부
	private String firewood; // 장작 판매 여부
	
	private String walkingTrails; // 부대시설 산책로 유무
	private String waterPlayground; // 부대시설 물놀이장 유무
	private String playground; // 부대시설 놀이터 유무
	private String mart; // 부대시설 마트 유무
	
	private int restroomCount; // 부대시설 화장실 개수
	private int washroomCount; // 부대시샤워실 개수
	private int sinkCount; // 부대시설 싱크대 개수
	private int fireExtinguisherCount; // 부대시설 소화기 개수
	
	private String fishingFacilities; // 주변 낚시시설 유무
	private String nearbyWalkingTrails; // 주변 산책로 유무
	private String nearbySeaSwimming; // 주변 해수욕장 유무
	private String nearbyWaterActivities; // 주변 물놀이 수상레저 시설 유무
	private String nearbyValley; // 주변 물놀이 계곡 유무
	private String nearbyRiver; // 주변 물놀이 강 유무
	private String nearbySwimmingPool; // 주변 물놀이 수영장 유무
	private String nearbyYouthExperience; // 주변 물놀이 청소년 체험시설 유무
	private String nearbyRuralExperience; // 주변 물놀이 농어촌체험시설 유무
	private String nearbyChildrenPlayground; // 주변 물놀이 어린이놀이시설 유무
	
	private String glampingBed; // 글램핑 침대 유무
	private String glampingTv; // 글램핑 TV 유무
	private String glampingRefrigerator; // 글램핑 냉장고 유무
	private String glampingInternet; // 글램핑 인터넷 유무
	private String glampingRestroom; // 글램핑 화장실 유무
	private String glampingAirConditioner; // 글램핑 에어컨 유무
	private String glampingHeatingEquipment; // 글램핑 난방기 유무
	private String glampingCookware; // 글램핑 요리장비 유무
	
	private String facilityFeatures; // 시설 특징
}













