package kr.co.wheelingcamp.member.model.service;

import java.util.Map;

import org.springframework.util.MultiValueMap;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.wheelingcamp.member.model.dto.Member;

public interface MemberService {

	/** 네이버 로그인 인가코드 요청
	 * @return
	 */
	String naverLoginUrl(HttpServletRequest request);

	/** 네이버 accessTocken 얻어오기 위한 body data 생성
	 * @param state 
	 * @param code 
	 * @return
	 */
	MultiValueMap<String, String> naverTockenUrl(String code, String state);

	/** 네이버 로그인 수행
	 * @param map
	 * @return
	 */
	Member naverLogin(Map<String, String> map);


}
