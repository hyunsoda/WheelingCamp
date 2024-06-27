package kr.co.wheelingcamp.item.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
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

import jakarta.servlet.http.HttpSession;
import kr.co.wheelingcamp.interest.model.service.InterestService;
import kr.co.wheelingcamp.item.model.dto.CampEquipment;
import kr.co.wheelingcamp.item.model.dto.Car;
import kr.co.wheelingcamp.item.model.dto.Item;
import kr.co.wheelingcamp.item.model.dto.Package;
import kr.co.wheelingcamp.item.model.service.ItemService;
import kr.co.wheelingcamp.member.model.dto.Member;
import kr.co.wheelingcamp.review.model.dto.Review;
import kr.co.wheelingcamp.review.model.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 상품 컨트롤러
 */
@SessionAttributes({ "itemViewNoList" })
@Slf4j
@Controller
@RequestMapping("item")
@RequiredArgsConstructor
public class ItemController {

	private final ItemService service;
	private final InterestService interestService;
	private final ReviewService reviewService;

	/**
	 * 상품 목록 redirect
	 * 
	 * @param categoryCode  : 상품 종류 번호
	 * @param cp            : 페이지 번호
	 * @param carLocationNo : 대여 지역
	 * @param rentDate      : 대여 예정 날짜
	 * @param expectDate    : 반납 예정 날짜
	 * @param carGradeNo    : 차급 (소형, 중형, 대형, 캠핑카)
	 * @param model
	 * @return
	 */
	@GetMapping("itemList")
	public String itemListView(@RequestParam("categoryCode") int categoryCode,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@RequestParam(value = "carLocationNo", required = false, defaultValue = "0") int carLocationNo,
			@RequestParam(value = "rentDate", required = false) String rentDate,
			@RequestParam(value = "expectDate", required = false) String expectDate,
			@RequestParam(value = "carGradeNo", required = false, defaultValue = "0") int carGradeNo,
			@RequestParam(value = "equipmentCategoryCode", required = false, defaultValue = "0") int equipmentCategoryCode,
			@RequestParam(value = "rendSellCheck", required = false, defaultValue = "0") int rendSellCheck,
			@RequestParam(value = "sortNo", required = false, defaultValue = "0") int sortNo, Model model,
			HttpSession session) {

		// Service에서 사용한 변수를 MAP에 세팅
		Map<String, Object> map = new HashMap<>();
		map.put("categoryCode", categoryCode);
		map.put("cp", cp);
		map.put("carLocationNo", carLocationNo);
		map.put("rentDate", rentDate == null ? null : rentDate);
		map.put("expectDate", expectDate == null ? null : expectDate);
		map.put("carGradeNo", carGradeNo);
		map.put("equipmentCategoryCode", equipmentCategoryCode);
		map.put("rendSellCheck", rendSellCheck);
		map.put("sortNo", sortNo);

		// 검색된 상품 목록을 가져옴
		Map<String, Object> resultMap = service.selectCategoryAll(map);

		Member member = (Member) session.getAttribute("loginMember");

		if (member != null) {
			// 관심 상품 리스트
			model.addAttribute("interestList", interestService.interestArrayList(member.getMemberNo()));

		} else {
			model.addAttribute("interestList", new ArrayList<>());
		}

		// 상품을 request scope 에 세팅
		model.addAttribute("itemList", resultMap.get("itemList"));

		// 카테고리 번호를 request scope 에 세팅
		model.addAttribute("categoryCode", categoryCode);
		model.addAttribute("pagination", resultMap.get("pagination"));

		// 페이지네이션을 request scope 에 세팅
		model.addAttribute("pagination", resultMap.get("pagination"));

		// 정렬 번호를 request scope 에 세팅
		model.addAttribute("sortNo", sortNo);

		// 정렬 이름을 request scope 에 세팅
		List<String> sortOptions = Arrays.asList("최신순", "높은 가격순", "낮은 가격순", "인기순");
		model.addAttribute("sortOptions", sortOptions);

		switch (categoryCode) {
		case 1:
			// 자동차 목록일 때 차급 목록 가져오기
			model.addAttribute("carGradeList", service.selectCarGrade());
			// 현재 차급 번호 세팅
			model.addAttribute("carGradeNo", carGradeNo);

			// 차고지 리스트
			model.addAttribute("carLocationNoList", service.selectCarLocationAll());

			model.addAttribute("carLocationNo", carLocationNo);
			model.addAttribute("rentDate", rentDate);
			model.addAttribute("expectDate", expectDate);

			break;
		case 2:
			// 캠핑용품 목록일 때 캠핑용품 카테고리 가져오기
			model.addAttribute("equipmentCategoryList", service.selectEquipmentCategory());
			// 현재 카테고리 번호 세팅
			model.addAttribute("equipmentCategoryCode", equipmentCategoryCode);
			break;
		}
		
         model.addAttribute("item", resultMap);
		return "item/itemList";
	}

	/**
	 * 상품 상세정보 redirect
	 * 
	 * @param itemNo : 상품 번호
	 * @return
	 */
	@GetMapping("itemDetail")
	public String itemDetailView(
			@SessionAttribute(value = "itemViewNoList", required = false) List<Integer> itemViewNoList,
			@RequestParam("itemNo") int itemNo, @RequestParam("categoryCode") int categoryCode,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp, Model model,
			HttpSession session) {

		// 상품 조회 목록을 담는 itemViewList 가 세션에 없으면 객체 생성
		if (itemViewNoList == null) {
			itemViewNoList = new ArrayList<>();
		}

		// 리뷰 가져오기
		List<Review> review = reviewService.selectReview(itemNo);
		model.addAttribute("review", review);

		if (categoryCode == 1) { // 차인 경우

			Item item = service.selectOne(categoryCode, itemNo);
			model.addAttribute("item", ((Car) item));
			model.addAttribute("categoryCode", categoryCode);

			// 추천 차
			List<Car> recommendList = service.selectRecommendCar(itemNo);
			model.addAttribute("recommendList", recommendList);

		} else if (categoryCode == 2) { // 캠핑용품인 경우

			Item item = service.selectOne(categoryCode, itemNo);
			model.addAttribute("item", ((CampEquipment) item));
			model.addAttribute("categoryCode", categoryCode);

			// 추천 용품
			List<CampEquipment> recommendList = service.selectRecommendEquipment(itemNo);
			model.addAttribute("recommendList", recommendList);

		} else { // 패키지인 경우

			Item item = service.selectOne(categoryCode, itemNo);
			model.addAttribute("item", ((Package) item));
			model.addAttribute("categoryCode", categoryCode);

			// 추천 패키지
			List<Package> recommendList = service.selectPackageDetailRecommend(itemNo);
			model.addAttribute("recommendList", recommendList);

		}

		// 추천 패키지 상품
		List<Package> recommendPackage = service.selectRecommendPackage(itemNo);
		model.addAttribute("recommendPackage", recommendPackage);
		
		// 로그인한 회원 (없으면 NULL)
		Member member = (Member) session.getAttribute("loginMember");

		if (member != null) {
			// 찜 목록에 있는지 여부 확인
			Map<String, Integer> map = new HashMap<>();
			map.put("memberNo", member.getMemberNo());
			map.put("itemNo", itemNo);

			if ((int) interestService.itemInterestCheck(map) > 0) {
				model.addAttribute("itemInterest", 1);
			}
		}

		// 조회하지 않은 상품일 경우 조회수 1 증가
		if (itemViewNoList.indexOf(itemNo) == -1) {
			itemViewNoList.add(itemNo);
			int result = service.updateViewCount(itemNo);

		}

		// 세션에 바뀐 상품 조회 목록을 세팅
		model.addAttribute("itemViewNoList", itemViewNoList);

		return "item/itemDetail";

	}

	@ResponseBody
	@PostMapping("selectOne")
	public Item selectOne(@RequestBody Map<String, Integer> map) {

		return service.selectOne(map.get("categoryCode"), map.get("itemNo"));
	}

	@ResponseBody
	@GetMapping("allItemList")
	public List<Item> allItemList() {

		return service.allItemList();

	}

}
