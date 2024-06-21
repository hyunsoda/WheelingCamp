package kr.co.wheelingcamp.manage.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import kr.co.wheelingcamp.manage.model.service.ManageService;
import kr.co.wheelingcamp.member.model.dto.Member;
import kr.co.wheelingcamp.pay.model.dto.Pay;
import kr.co.wheelingcamp.pay.model.dto.PayDetail;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("manage")
public class ManageController {

	private final ManageService service;

	@GetMapping("info")
	public void info(HttpServletResponse response) throws Exception {

		String manageUrl = service.getUrl();

		response.sendRedirect(manageUrl);
	}

	/**
	 * 멤버 리스트 조회
	 * 
	 * @return
	 */
	@GetMapping("selectAllMember")
	public List<Member> selectAllMember() {
		List<Member> memberList = service.selectAllMember();
		return memberList;
	}

	/**
	 * 멤버 수정
	 * 
	 * @param member
	 * @return
	 */
	@PutMapping("updateMember")
	public int updateMember(Member member) {
		return service.updateMember(member);
	}

	/**
	 * 멤버 삭제
	 * 
	 * @param memberNo
	 * @return
	 */
	@DeleteMapping("deleteMember")
	public int deleteMember(@RequestParam("memberNo") int memberNo) {
		return service.deleteMember(memberNo);
	}

	/**
	 * 멤버 추가
	 * 
	 * @param member
	 * @return
	 */
	@PutMapping("insertMember")
	public int insertMember(Member member) {
		return service.insertMember(member);
	}

	// ------------------------------------------
	// 주문 목록 조회

	@GetMapping("order")
	public Map<String, Object> selectAllOrder(
			@RequestParam(value = "payCode", required = false, defaultValue = "1") int payCode) {
		log.info("payCode" + payCode);
		return service.selectAllOrder(payCode);
	}

	// 주문 삭제
	@DeleteMapping("deleteOrder")
	public int deleteOrder(@RequestParam("payNo") int payNo) {

		return service.deleteOrder(payNo);
	}

	// 주문 수정
	@PutMapping("updateOrder")
	public int updateOrder(Pay pay, @RequestParam("payCode") int payCode) {
		return service.updateOrder(pay, payCode);
	}

	@GetMapping("orderDetail")
	public Map<String, Object> selectOneOrder(
			@RequestParam(value = "payCode", required = false, defaultValue = "1") int payCode,
			@RequestParam("payNo") int payNo) {
		log.info("payNo : "+payNo);
		return service.selectOneOrder(payCode, payNo);
	}
	
	@PutMapping("updateOrderDetail")
	public int updateOrderDetail(PayDetail payDetail) {
		return service.updateOrderDetail(payDetail);
	}

//	/**
//	 * @param categoryCode : 상품 카테고리 번호(0 : 전체, 1 : 차, 2 : 캠핑용품, 3 : 패키지)
//	 * @param cp           : 현재 페이지 번호 (미입력시 기본 1페이지)
//	 * @param sortNo       : 정렬 번호 (0 : 최신순,1 : )
//	 * @param sellStatus   : 판매상태(0 : 전체, 1 : 판매중, 2 : 품절)
//	 * @param itemSearch   : 검색 키워드
//	 * @param itemNo       : 상품 번호로 검색 시 입력받는 상품번호
//	 * @return
//	 */
//	@GetMapping("item")
//	public Map<String, Object> selectAllItem(
//			@RequestParam(value = "categoryCode", required = false, defaultValue = "1") int categoryCode,
//			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
//			@RequestParam(value = "sortNo", required = false, defaultValue = "0") int sortNo,
//			@RequestParam(value = "sellStatus", required = false, defaultValue = "0") int sellStatus,
//			@RequestParam(value = "itemSearch", required = false, defaultValue = "") String itemSearch,
//			@RequestParam(value = "itemNo", required = false, defaultValue = "1") int itemNo) {
//
//		log.info("sort : {}", sortNo);
//
//		Map<String, Object> map = new HashMap<>();
//		map.put("categoryCode", categoryCode);
//		map.put("cp", cp);
//		map.put("sortNo", sortNo);
//		map.put("sellStatus", sellStatus);
//		map.put("itemSearch", itemSearch);
//		map.put("itemNo", itemNo);
//
//		Map<String, Object> resultMap = service.selectAllItem(map);
//
//		log.info("resultMap : {}", resultMap);
//
//		return resultMap;
//	}

//--------------------------------------------------------------------------------------------------

	// ----------------------------------------------------------------------------------------

	/**
	 * 상품 리스트 출력
	 * 
	 * @param categoryCode : 상품 카테고리 번호(0 : 전체, 1 : 차, 2 : 캠핑용품, 3 : 패키지)
	 * @return
	 */
	@GetMapping("item")
	public Map<String, Object> selectAllItem(
			@RequestParam(value = "categoryCode", required = false, defaultValue = "1") int categoryCode) {

		Map<String, Object> resultMap = service.selectAllItem(categoryCode);

		return resultMap;
	}

	/**
	 * 상품 상세 출력
	 * 
	 * @param categoryCode
	 * @param itemNo
	 * @return
	 */
	@GetMapping("itemDetail")
	public Map<String, Object> selectOneItem(
			@RequestParam(value = "categoryCode", required = false, defaultValue = "1") int categoryCode,
			@RequestParam("itemNo") int itemNo) {

		return service.selectOneItem(categoryCode, itemNo);
	}

	@PutMapping("updateItem")
	public int updateItem(@RequestBody Map<String, Map<String, Object>> item) {

		log.info("{}", item);
		// log.info("{}", item);
		// log.info("{}", item.get("item"));

		// return service.updateItem(item.get("item"));
		return 0;
	}

	// --------------------------------------------------------------------------------------------------

	// ----------------------------------------------------------------------------------------
}
