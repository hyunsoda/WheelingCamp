package kr.co.wheelingcamp.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.wheelingcamp.member.model.service.MemberService;
import lombok.RequiredArgsConstructor;

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
	
	
}
