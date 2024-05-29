package kr.co.wheelingcamp.member.model.dto;

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
public class Member {

	private int memberNo;
	private String memberId;
	private String memberPw;
	private String memberEmail;
	private String memberNickName;
	private String memberAddress;
	private String memberEnrollDate;
	private String memberDelFl;
	private String memberName;
	private String profileImg;
	private String memberPhoneNo;
	private String memberBrith;
	private String license;
}
