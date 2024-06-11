package kr.co.wheelingcamp.badge.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import groovy.util.logging.Slf4j;
import kr.co.wheelingcamp.badge.model.service.BadgeService;
import lombok.RequiredArgsConstructor;

@Controller
@Slf4j
@RequiredArgsConstructor
@SessionAttributes({"loginMember"})
@RequestMapping("badge")
public class BadgeController {

	private final BadgeService service;
	
	@GetMapping("detail")
	public String  badgeDetail() {
		return "badge/badgeDetail";
	}
}
