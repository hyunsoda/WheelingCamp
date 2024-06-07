package kr.co.wheelingcamp.mypage.model.mapper;


import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.member.model.dto.Member;

@Mapper
public interface MyPageMapper {

	/** 입력한 비밀번호와 현재 비밀번호가 같은지 확인
	 * @param memberNo
	 * @return
	 */
	String checkPw(int memberNo);

	/** 회원 탈퇴
	 * @param memberNo
	 * @return
	 */
	int secession(int memberNo);

	/** 비밀번호 변경
	 * @param member
	 * @return
	 */
	int changePw(Member member);

	
	/** 내 정보 수정
	 * @param inputMember
	 * @return
	 */
	int profile(Member inputMember);

	/** 프로필 사진 변경
	 * @param member
	 * @return
	 */
	int changeProfileImg(Member member);

	/** 소셜로그인인지 일반 로그인인지 확인하기
	 * @param memberNo
	 * @return
	 */
	int checkingLogin(int memberNo);

}
