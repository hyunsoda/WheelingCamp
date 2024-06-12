package kr.co.wheelingcamp.interest.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import jakarta.servlet.http.HttpSession;
import kr.co.wheelingcamp.interest.model.dto.Interest;
import kr.co.wheelingcamp.interest.model.service.InterestService;
import kr.co.wheelingcamp.member.model.dto.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("interest")
@RequiredArgsConstructor
@SessionAttributes({"loginMember"})
@Slf4j
public class InterestController {

	private final InterestService service;



	/**
	 * 관심상품 불러오기
	 * 
	 * @return
	 */
	@PostMapping("interestList")
	public Map<String, List<Interest>> interestList(@RequestBody Map<String, Integer> map) {

		// requestBody로 받은 map 에는 memberNo 하나 들어있음

		return service.interestList(map);
	}

	/**
	 * 관심상품 삭제
	 * 
	 * @param map
	 * @return
	 */
	@DeleteMapping("itemDelete")
	public int itemDelete(@RequestBody Map<String, Integer> map) {

		return service.itemDelete(map);
	}
	
	/** 선택된 상품전체 삭제
	 * @param map
	 * @return
	 */
	@PostMapping("checkListDelete")
	public int checkListDelete(@RequestBody Map<String, Object> map) {

		return service.checkListDelete(map);
	}
	
	
	/** 관심상품 추가
	 * @param map
	 * @return
	 */
	@PostMapping("add")
	public int interestAdd(@RequestBody Map<String, Integer> map,
							HttpSession session) {
		
		map.put("memberNo", ((Member) session.getAttribute("loginMember")).getMemberNo());
		
		return service.interestAdd(map);
		
	}
	

}
