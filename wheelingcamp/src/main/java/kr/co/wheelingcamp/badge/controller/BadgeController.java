package kr.co.wheelingcamp.badge.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import kr.co.wheelingcamp.badge.model.dto.Badge;
import kr.co.wheelingcamp.badge.model.service.BadgeService;
import kr.co.wheelingcamp.member.model.dto.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequiredArgsConstructor
@SessionAttributes({"loginMember"})
@RequestMapping("badge")
public class BadgeController {

	private final BadgeService service;
	
	
	/** 뱃지페이지로 이동 / + 뱃지 목록 조회
	 * @param loginMember
	 * @param model
	 * @param paramMap
	 * @return
	 */
	@GetMapping("detail")
	public String  badgeDetail(@SessionAttribute("loginMember") Member loginMember, Model model, @RequestParam Map<String,Object> paramMap ) {
		
		int memberNo = loginMember.getMemberNo();
		
		//뱃지목록 조회
		Map<String,Object> map = service.selectBadgeList(memberNo);
		model.addAttribute("badgeList",map.get("badgeList"));
		model.addAttribute("badgeCount",map.get("badgeCount"));
	
		return "badge/badgeDetail";
	}
	
	/** 대표뱃지 선택
	 * @param loginMember
	 * @param model
	 * @param selectedBadge
	 * @return
	 */
	@PostMapping("selected")
	@ResponseBody
	public int selectedBadge(@SessionAttribute("loginMember") Member loginMember, @RequestParam ("badgeNo") int badgeNo){
		
		int memberNo = loginMember.getMemberNo();
		int result=service.selectedBadge(memberNo,badgeNo);
		log.debug("result",result);
		return result;
		
	}
	
}
