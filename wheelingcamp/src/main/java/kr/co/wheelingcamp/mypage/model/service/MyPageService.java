package kr.co.wheelingcamp.mypage.model.service;

import org.springframework.web.multipart.MultipartFile;

import kr.co.wheelingcamp.member.model.dto.Member;

public interface MyPageService {
	
	/** 입력한 비밀번호가 현재비밀번호와 같은지 확인
	 * @param memberNo
	 * @param inputPw
	 * @return
	 */
	int checkPw(int memberNo, String inputPw);

	/** 회원 탈퇴
	 * @param memberNo
	 * @return
	 */
	int secession(int memberNo);

	/** 비밀번호 변경
	 * @param loginMember
	 * @param newPw
	 * @return
	 */
	int changePw(Member loginMember, String newPw);

	/** 내 정보 수정
	 * @param inputMember
	 * @param memberAddress 
	 * @return
	 */
	int profile(Member inputMember, String[] memberAddress);

	/** 프로필 이미지 변경
	 * @param profileImg
	 * @param loginMember
	 * @return
	 * @throws Exception 
	 */
	int changeProfileImg(MultipartFile uploadFile, Member loginMember) throws Exception;

	/** 소셜 로그인인지 일반로그인인지확인하기
	 * @param memberNo
	 * @return
	 */
	int checkingLogin(int memberNo);





}
