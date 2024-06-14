package kr.co.wheelingcamp.manage.controller;

import java.util.List;
import org.springframework.stereotype.Controller;
import java.util.HashMap;
import java.util.Map;

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
	
	@GetMapping("selectOneMember")
	public Member selectOneMember(@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
	         @RequestParam("memberNo") String memberNo) {
		
		Member member = service.selectOneMember(memberNo);
		
		return member;
  }
	// ----------------------------------------------------------------------------------------

	/**
	 * @param categoryCode : 상품 카테고리 번호(0 : 전체, 1 : 차, 2 : 캠핑용품, 3 : 패키지)
	 * @param cp           : 현재 페이지 번호 (미입력시 기본 1페이지)
	 * @param sortNo       : 정렬 번호 (0 : 최신순,1 : )
	 * @param sellStatus   : 판매상태(0 : 전체, 1 : 판매중, 2 : 품절)
	 * @param itemSearch   : 검색 키워드
	 * @param itemNo       : 상품 번호로 검색 시 입력받는 상품번호
	 * @return
	 */
	@GetMapping("item")
	public Map<String, Object> selectAllItem(
			@RequestParam(value = "categoryCode", required = false, defaultValue = "1") int categoryCode,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@RequestParam(value = "sortNo", required = false, defaultValue = "0") int sortNo,
			@RequestParam(value = "sellStatus", required = false, defaultValue = "0") int sellStatus,
			@RequestParam(value = "itemSearch", required = false, defaultValue = "") String itemSearch,
			@RequestParam(value = "itemNo", required = false, defaultValue = "1") int itemNo) {

		log.info("sort : {}", sortNo);

		Map<String, Object> map = new HashMap<>();
		map.put("categoryCode", categoryCode);
		map.put("cp", cp);
		map.put("sortNo", sortNo);
		map.put("sellStatus", sellStatus);
		map.put("itemSearch", itemSearch);
		map.put("itemNo", itemNo);

		Map<String, Object> resultMap = service.selectAllItem(map);

		log.info("resultMap : {}", resultMap);

		return resultMap;
	}
	
	
//--------------------------------------------------------------------------------------------------

	// ----------------------------------------------------------------------------------------
}
