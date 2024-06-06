package kr.co.wheelingcamp.item.model.dto;

import java.util.List;

import kr.co.wheelingcamp.file.model.dto.ItemImage;
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
public class Review {
	private int reviewNo; // 리뷰 번호
	private int itemNo; // 아이템 번호
	private String reviewContent; // 리뷰 내용
	private String reviewDate; // 작성 날짜
	private int memberNo; // 작성자 회원 번호
	private String memberNickName; // 작성자 닉네임
	private String profileImg; // 프로필 이미지
	
}
