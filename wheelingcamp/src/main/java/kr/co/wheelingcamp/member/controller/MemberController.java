package kr.co.wheelingcamp.member.controller;

import org.springframework.stereotype.Controller;

import kr.co.wheelingcamp.member.model.service.MemberService;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class MemberController {

	private final MemberService service;
	
}
