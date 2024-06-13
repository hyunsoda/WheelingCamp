package kr.co.wheelingcamp.manage.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import kr.co.wheelingcamp.manage.model.service.ManageService;
import kr.co.wheelingcamp.member.model.dto.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("manage")
public class ManageController {

	private final ManageService service;

	/**
	 * React 관리자 페이지 호출
	 * 
	 * @return
	 */
	@GetMapping("info")
	public void info(HttpServletResponse response) throws Exception{

		String manageUrl = service.getUrl();

		response.sendRedirect(manageUrl);
	}
	
	/** 멤버 전체 가져오기
	 * @param cp
	 * @param sortNo
	 * @return
	 */
	@GetMapping("selectAllMember")
	public List<Member> selectAllMember(@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
	         @RequestParam(value = "sortNo", required = false, defaultValue = "0") int sortNo){
		
		List<Member> memberList = service.selectAllMember(sortNo);
		
		
		return memberList;
	}
	
	
	
	
//--------------------------------------------------------------------------------------------------

}
