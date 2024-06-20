package kr.co.wheelingcamp.interest.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import kr.co.wheelingcamp.interest.model.dto.Interest;
import kr.co.wheelingcamp.interest.model.service.InterestService;
import kr.co.wheelingcamp.member.model.dto.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("interest")
@RequiredArgsConstructor
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
		
		int loginMemberNo = map.get("memberNo");

		return service.interestList(loginMemberNo);
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

	
	/** 상세보기에서 관심상품 추가 / 삭제
	 * @param map
	 * @return
	 */
	@PostMapping("item")
	public int interest(@RequestBody Map<String, Integer> map,
							HttpSession session) {
		
		// 만약에 패키지넘버가 들어왔을 경우 상품 번호에 패키지 번호를 넣기
		if(map.get("packageNo") != null) {
			map.put("itemNo", map.get("packageNo"));
		}
			
		map.put("memberNo", ((Member) session.getAttribute("loginMember")).getMemberNo());
		
		return service.interest(map);
		
	}
	
	

}
