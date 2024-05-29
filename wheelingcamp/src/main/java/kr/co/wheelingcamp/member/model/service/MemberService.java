package kr.co.wheelingcamp.member.model.service;

import java.util.Map;

public interface MemberService {

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

}
