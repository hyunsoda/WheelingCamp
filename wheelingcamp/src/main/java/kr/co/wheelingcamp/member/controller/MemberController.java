package kr.co.wheelingcamp.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.wheelingcamp.member.model.dto.Member;
import kr.co.wheelingcamp.member.model.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("member")
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
	
	
}
