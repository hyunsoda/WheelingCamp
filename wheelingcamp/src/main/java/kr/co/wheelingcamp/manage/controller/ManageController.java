package kr.co.wheelingcamp.manage.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletResponse;
import kr.co.wheelingcamp.file.model.service.FileService;
import kr.co.wheelingcamp.item.model.dto.Item;
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

	private final FileService fileService;

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

	/**
	 * 주문 디테일 조회
	 * 
	 * @param payCode
	 * @param payNo
	 * @return
	 */
	@GetMapping("orderDetail")
	public Map<String, Object> selectOneOrder(
			@RequestParam(value = "payCode", required = false, defaultValue = "1") int payCode,
			@RequestParam("payNo") int payNo) {
		log.info("payNo : " + payNo);
		return service.selectOneOrder(payCode, payNo);
	}

	/**
	 * 주문 디테일 수정
	 * 
	 * @param payDetail
	 * @return
	 */
	@PutMapping("updateOrderDetail")
	public int updateOrderDetail(PayDetail payDetail) {
		return service.updateOrderDetail(payDetail);
	}

	/**
	 * 신규 가입자 수 조회
	 * 
	 * @return
	 */
	@GetMapping("memberCount")
	public List<Member> memberCount() {
		return service.memberCount();
	}

	/**
	 * 상품 일자별 뷰카운트 조회
	 * 
	 * @return
	 */
	@GetMapping("itemViewCount")
	public List<Item> itemViewCount(@RequestParam("categoryCode") int categoryCode) {
		return service.itemViewCount(categoryCode);
	}

	@GetMapping("logout")
	public String logout(SessionStatus status) {

		log.info("" + status);
//		status.setComplete();

		return "redirect:/";
	}
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

	/**
	 * 상품 수정
	 * 
	 * @param item
	 * @param itemImage
	 * @return
	 */
	@PutMapping("updateItem")
	public int updateItem(@RequestPart("item") Map<String, Object> item,
			@RequestPart(value = "itemImage", required = false) List<MultipartFile> itemImage) {

		int result = 0;

		log.info("item : {}", item);

		result = service.updateItem(item);

		if (result <= 0) {
			return 0;
		}

		try {
			if (itemImage != null) {
				if (itemImage.size() > 0) {
					result = fileService.uploadImageList(Integer.parseInt(item.get("itemNo").toString()), itemImage,
							"item");

					if (result <= 0) {
						return result;
					}
				} else {
					result = fileService.deleteImageAll(Integer.parseInt(item.get("itemNo").toString()), "item");
				}
			} else {
				result = fileService.deleteImageAll(Integer.parseInt(item.get("itemNo").toString()), "item");
			}

		} catch (Exception e) {
			System.out.println(e);
		}

		return result;
	}

	// --------------------------------------------------------------------------------------------------

	// ----------------------------------------------------------------------------------------
}
