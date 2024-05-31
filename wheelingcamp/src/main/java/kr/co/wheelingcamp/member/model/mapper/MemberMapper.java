package kr.co.wheelingcamp.member.model.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.member.model.dto.Member;

@Mapper
public interface MemberMapper {

	/**
	 * 아이디 중복 검사
	 * 
	 * @param checkId
	 * @return
	 */
	int checkId(String checkId);

	/**
	 * 네이버 로그인하기
	 * 
	 * @param map
	 * @return
	 */
	Member snsLoginMember(String checkId);

	/**
	 * 네이버 회원가입 하기
	 * 
	 * @param map
	 * @return
	 */
	int naverSignUp(Map<String, String> map);

	/**
	 * 일반 회원가입
	 * 
	 * @param member
	 * @return
	 */
	int signUp(Member member);

	/**
	 * 카카오 회원가입
	 * 
	 * @param userInfo
	 * @return
	 */
	int kakaoSignUp(Map<String, String> userInfo);

	/**
	 * 구글 회원가입
	 * 
	 * 
	 * @param userInfo
	 * @return
	 */
	int googleSignUp(Map<String, String> userInfo);

	/**
	 * 일반 로그인
	 * 
	 * @param memberId
	 * @return
	 */
	Member login(String memberId);

	/**
	 * 소셜 회원가입(카카오, 구글 추가 입력한 정보)
	 * 
	 * @param member
	 * @return
	 */
	int snsSignUp(Member member);

}
