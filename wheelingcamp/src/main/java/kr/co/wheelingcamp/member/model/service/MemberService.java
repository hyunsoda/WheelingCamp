package kr.co.wheelingcamp.member.model.service;

import java.text.ParseException;
import java.util.Map;

import org.springframework.util.MultiValueMap;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.wheelingcamp.member.model.dto.Member;

public interface MemberService {

	/** 네이버 로그인 인가코드 요청
	 * @return
	 */
	Map<String, String> naverLoginUrl(HttpServletRequest request);

	/** 네이버 accessTocken 얻어오기 위한 body data 생성
	 * @param state 
	 * @param code 
	 * @return
	 */
	MultiValueMap<String, String> naverTockenUrl(String code, String state);

	/** 네이버 로그인 수행
	 * @param map
	 * @return
	 * @throws ParseException 
	 */
	Member naverLogin(Map<String, String> map) throws ParseException;

	/** 카카오 로그인 페이지 이동
	 * @return 리다이렉트 url
	 */
	String kakaoLoginUrl();

	/** 카카오 토큰 발급
	 * @param code
	 * @return 
	 */
	String getKakaoToken(String code);

	/** 카카오 토큰으로 유저 정보 받기
	 * @param kakaoToken
	 * @return
	 */
	Map<String, String> getKakaoUserInfo(String kakaoToken);

	/** 구글 로그인 페이지 이동
	 * @return 리다이렉트 url
	 */
	String googleLoginUrl();

	/** 구글 토큰 발급
	 * @param code
	 * @return
	 */
	String getGoogleToken(String code);

	/** 구글 토큰으로 유저 정보 받기
	 * @param googleToken
	 * @return
	 */
	Map<String, String> getGoogleUserInfo(String googleToken);

	/** 일반 회원가입
	 * @param member : 가입 회원 정보
	 * @return
	 */
	int signUp(Member member, String[] address);

	/** 구글 로그인
	 * @param userInfo
	 * @return
	 * @throws ParseException 
	 */
	Member googleLogin(Map<String, String> userInfo) throws ParseException;

	/** 카카오 로그인
	 * @param userInfo
	 * @param snsName
	 * @return
	 * @throws ParseException 
	 */
	Member kakaoLogin(Map<String, String> userInfo) throws ParseException;
	/** 일반 로그인
	 * @param member
	 * @return
	 * @throws ParseException 
	 */
	Member login(Member member) throws ParseException;

	/** 카카오, 구글 회원가입
	 * @param member
	 * @return
	 */
	int snsSignUp(Member member,  String[] address);

	/** 아이디 찾아서 반환
	 * @param userInfo
	 * @return
	 */
	String findId(Map<String, String> userInfo);

	/** 비밀번호 찾아서 반환
	 * @param userInfo
	 * @return
	 */
	String findPw(Map<String, String> userInfo);
 
	/** 비밀번호 변경
	 * @param map(memberId, memberPw)
	 * @return
	 */
	int changePw(Map<String, String> map);

	/** 회원가입 시 아이디 중복 검사
	 * @param map
	 * @return
	 */
	int idCheck(Map<String, String> map);





}
