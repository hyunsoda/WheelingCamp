package kr.co.wheelingcamp.member.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import kr.co.wheelingcamp.member.model.dto.Member;
import kr.co.wheelingcamp.member.model.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("member")
@SessionAttributes("loginMember")
public class MemberController {

	private final MemberService service;
	
	/** 로그인 페이지 redirect
	 * @return
	 */
	@GetMapping("login")
	public String loginView() {
		return "member/login";
	}
	
	/** 로그인 페이지 redirect
	 * @return
	 */
	@GetMapping("signUp")
	public String signUpView() {
		return "member/signUp";
	}
	
	/** 일반 회원가입 
	 * @param member : 회원가입을 요청한 회원의 정보
	 * @return
	 */
	@PostMapping("signUp")
	public String siginUp(Member member) {
		
		int result = service.signUp(member);
		
		log.info("memberNo : {}", member.getMemberNo());
		
		return "pages/home";
	}
	
	/** 카카오 로그인 페이지 이동
	 * @return
	 */
	@GetMapping("loginKakao")
	public String loginKakaoView() {
		
		// 카카오 로그인 url
		String kakaoLoginUrl = service.kakaoLoginUrl();
		
		return "redirect:" + kakaoLoginUrl;
	}
	
	/** 카카오 토큰 발급 + 유저 정보(고유키, 닉네임, 프로필 이미지) 가져오기
	 * @return
	 */
	@GetMapping("kakao/callback")
	public String getKakaoToken(@RequestParam("code") String code) {
		
		// 카카오 토큰 받기
		String kakaoToken = service.getKakaoToken(code);
		
		// 받은 카카오 토큰으로 해당 유저 정보를 담은 map
		Map<String, String> userInfo = service.getKakaoUserInfo(kakaoToken);
		
		System.out.println("카카오 유저 = " + userInfo);
		// 사용자가 있으면 로그인, 아니면 회원가입 하는 코드짜기
		
		
		
		return null;
	}
	
	/** 구글 로그인 페이지로 이동
	 * @return
	 */
	@GetMapping("loginGoogle")
	public String loginGoogleView() {
		
		// 구글 로그인 url
		String googleLoginUrl = service.googleLoginUrl();
		
		return "redirect:" + googleLoginUrl;
	}
	
	/** 구글 토큰 발급 + 유저 정보(고유키, 이메일...) 가져오기
	 * @param code
	 * @return
	 */
	@GetMapping("google/callback")
	public String getGoogleToken(@RequestParam("code") String code) {
		
		// 구글 토큰 받기
		String googleToken = service.getGoogleToken(code);
		
		// 받은 구글 토큰으로 해당 유저 정보를 담은 map
		Map<String, String> userInfo = service.getGoogleUserInfo(googleToken);
		
		System.out.println("구글 유저 = " + userInfo);
		// 사용자가 있으면 로그인, 아니면 회원가입 하는 코드 짜기
		
		return null;
	}
	
}
