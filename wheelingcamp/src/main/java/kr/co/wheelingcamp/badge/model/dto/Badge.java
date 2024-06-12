package kr.co.wheelingcamp.badge.model.dto;

import groovy.transform.ToString;
import groovy.transform.builder.Builder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Badge {
	
	private int badgeNo; //뱃지 번호
	private String badgeName; //뱃지 이름
	private String badgeContents; // 뱃지 내용
	private String badgeImg; // 뱃지이미지경로
	private int memberNo; //회원 번호
	private String badgeDate; // 뱃지 획득 날짜
	private String badgeFl; //뱃지 획득 여부
	

}
