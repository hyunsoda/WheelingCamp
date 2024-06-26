
package kr.co.wheelingcamp.pay;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import kr.co.wheelingcamp.item.model.dto.CampEquipment;
import kr.co.wheelingcamp.item.model.dto.Car;
import kr.co.wheelingcamp.item.model.dto.Package;
import kr.co.wheelingcamp.member.model.dto.Member;
import kr.co.wheelingcamp.pay.model.PaymentService;
import kr.co.wheelingcamp.pay.model.dto.Pay;
import lombok.RequiredArgsConstructor;

/**
 * 
 */
@SessionAttributes({ "loginMember" })
@RequiredArgsConstructor
@RequestMapping("payment")
@Controller
public class PaymentController {

	private final PaymentService service;

	/**
	 * 대여하기 차량
	 * 
	 * @param loginMember
	 * @param map
	 * @return
	 */
	@PostMapping("complete")
	@ResponseBody
	public ResponseEntity<String> payComplement(@SessionAttribute("loginMember") Member loginMember,
			@RequestBody Map<String, Object> map) {

		String[] dates = ((String) map.get("dateSpan")).split(" ~ ");

		String startDate = dates[0].trim(); // "2024. 06. 20"
		String endDate = dates[1].trim(); // "2024. 06. 25"

		map.put("rentDate", startDate);
		map.put("expectDate", endDate);

		// 갖고온것

		// memberNo , startDate , endDate ,
		// 구매가격, 상품이름 , 아이템 번호 , PaymentId

		// payment 에 들어오는 값 paymentId, totalAmount, orderName
		// 보내줘야 되는 값 memberNo
		map.put("memberNo", loginMember.getMemberNo());

//		 map.put("memberNo", loginMember.getMemberNo());
//		 map.put("paymentId", paymentRequest.getPaymentId());
//		 map.put("totalAmount", paymentRequest.getTotalAmount());
//		 map.put("orderName", paymentRequest.getOrderName());

		int result = service.setPayList(map);

		if (result > 0) {
			return ResponseEntity.ok("Payment processed successfully.");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed.");
		}

	}

	/**
	 * 패키지 대여하기
	 * 
	 * @return
	 */
	@PostMapping("PackageComplete")
	public ResponseEntity<String> payComlementPurchase(@SessionAttribute("loginMember") Member loginMember,
			@RequestBody Map<String, Object> map) {

		String[] dates = ((String) map.get("dateSpan")).split(" ~ ");

		String startDate = dates[0].trim(); // "2024. 06. 20"
		String endDate = dates[1].trim(); // "2024. 06. 25"

		map.put("rentDate", startDate);
		map.put("expectDate", endDate);

		map.put("memberNo", loginMember.getMemberNo());

		int result = service.borrowPackageList(map);

		if (result > 0) {
			return ResponseEntity.ok("Payment processed successfully.");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed.");
		}

	}

	/**
	 * 캠핑용품 대여하기
	 * 
	 * @return
	 */
	@PostMapping("borrowCamping")
	public ResponseEntity<String> borrowCamp(@SessionAttribute("loginMember") Member loginMember,
			@RequestBody Map<String, Object> map) {

		System.out.println("payList: payListpayListpayListpayListpayListpayListpayList" + map);
		String[] dates = ((String) map.get("dateSpan")).split(" ~ ");

		String startDate = dates[0].trim(); // "2024. 06. 20"
		String endDate = dates[1].trim(); // "2024. 06. 25"

		map.put("rentDate", startDate);
		map.put("expectDate", endDate);

		map.put("memberNo", loginMember.getMemberNo());

		int result = service.borrowCamping(map);

		if (result > 0) {
			return ResponseEntity.ok("Payment processed successfully.");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed.");
		}

	}

	/**
	 * 캠핑용품 구매하기
	 * 
	 * @return
	 */
	@PostMapping("purChaseCamp")
	public ResponseEntity<String> purChaseCamp(@SessionAttribute("loginMember") Member loginMember,
			@RequestBody Map<String, Object> map) {
		map.put("memberNo", loginMember.getMemberNo());

		int result = service.purChaseCamping(map);

		if (result > 0) {
			return ResponseEntity.ok("Payment processed successfully.");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed.");
		}

	}

	/**
	 * 대여하기 완료했을때 페이지 넘어가기 전에 값 전달하기
	 * 
	 * @param categoryCode
	 * @param model
	 * @param loginMember
	 * @return
	 */
	@RequestMapping("BorrowComplete")
	public String carBorrowComplete(@RequestParam("categoryCode") int categoryCode, Model model,
			@SessionAttribute("loginMember") Member loginMember, @RequestParam("itemNo") int itemNo,
			@RequestParam(value = "detailLookNo", defaultValue = "1", required = false) int detailLookNo,
			@RequestParam(value = "rentDetailNo", defaultValue = "1", required = false) int rentDetailNo) {

		String path = null;

		if (detailLookNo == 1) {
			Pay payList = service.getNowPayList(loginMember.getMemberNo());

			if (categoryCode == 1) {
				Car carList = service.carNameGet(itemNo);
				model.addAttribute("carList", carList);
			} else if (categoryCode == 2) {
				CampEquipment equimentList = service.camEquimentNameGet(itemNo);
				model.addAttribute("equimentList", equimentList);
			} else {
				Package packageList = service.packageNameGet(itemNo);
				model.addAttribute("packageList", packageList);
			}

			model.addAttribute("payList", payList);
			model.addAttribute("categoryCode", categoryCode);

			path = "complete/Borrow";
		} else {

			Pay payList = service.getDetailLookPay(loginMember.getMemberNo(), rentDetailNo);

			if (categoryCode == 1) {
				Car carList = service.carNameGet(itemNo);
				model.addAttribute("carList", carList);
			} else if (categoryCode == 2) {
				CampEquipment equimentList = service.camEquimentNameGet(itemNo);
				model.addAttribute("equimentList", equimentList);
			} else {
				Package packageList = service.packageNameGet(itemNo);
				model.addAttribute("packageList", packageList);
			}

			model.addAttribute("payList", payList);
			model.addAttribute("categoryCode", categoryCode);
			path = "detail/look";
		}

		return path;
	}

	/**
	 * 구매(캠핑용품)하기 완료했을때 페이지 넘어가기 전에 값 전달하기
	 * 
	 * @param categoryCode
	 * @param model
	 * @param loginMember
	 * @return
	 */
	@RequestMapping("PurChaseComplete")
	public String PurChaseComplete(@RequestParam("categoryCode") int categoryCode, Model model,
			@SessionAttribute("loginMember") Member loginMember,
			@RequestParam(value = "purchaseLookNo", defaultValue = "1", required = false) int purchaseLookNo,
			@RequestParam(value = "purchaseDetailNo", defaultValue = "1", required = false) int purchaseDetailNo

	) {
		String path = null;

		if (purchaseLookNo == 1) {
			Pay payList = service.getNowPayListPurChase(loginMember.getMemberNo());

			model.addAttribute("payList", payList);
			model.addAttribute("categoryCode", categoryCode);

			path = "complete/Purchase";
		} else {

			Pay payList = service.getDetailLookPayBorrow(loginMember.getMemberNo(), purchaseDetailNo);

			model.addAttribute("payList", payList);
			model.addAttribute("categoryCode", categoryCode);

			path = "detail/lookPurchase";
		}

		return path;
	}

	@RequestMapping("sumPurchase")
	public ResponseEntity<String> sumPurchase(@RequestBody Map<String, Object> sumList,
			@SessionAttribute("loginMember") Member loginMember, RedirectAttributes ra) {
		// 모든 상품 리스트 가져오기
		System.out.println("sumList :" + sumList);
		// itemList를 먼저 추출
		Map<String, Object> itemList = (Map<String, Object>) sumList.get("itemList");

		// itemList에서 rentItemInfo를 추출
		List<Map<String, Object>> rentItemInfo = (List<Map<String, Object>>) itemList.get("rentItemInfo");
		// itemList에서 shopItemInfo를 추출
		List<Map<String, Object>> shopItemInfo = (List<Map<String, Object>>) itemList.get("shopItemInfo");

		// 토탈 갯수 가져오기
		String totalCount = (String) itemList.get("totalCount");

		// 로그인한 맴버 번호
		int memberNo = loginMember.getMemberNo();
		// 상품 고유번호 가져오기
		String paymentId = (String) sumList.get("paymentId");

		// 상품 총 가격
		int totalAmount = (int) sumList.get("totalAmount");

		// 대여한거 있으면 날짜갖고오기
//      String[] dates = ((String) sumList.get("date")).split(" ~ "); 
//      String startDate = dates[0].trim(); // "2024. 06. 20" 
//      String endDate = dates[1].trim(); // "2024. 06. 25"

//      System.out.println("rentItemInfo : " + rentItemInfo);
//      System.out.println("shopItemInfo :" + shopItemInfo);
//      
//      System.out.println("totalCount : "  + totalCount);
//      System.out.println("shopCount : " + shopCount);
//      
//      System.out.println("totalAmount :" + totalAmount);

//      System.out.println("startDate : " + startDate);
//      System.out.println("endDate : " + endDate);
//      
//      System.out.println("memberNo : " + memberNo);
//      System.out.println("paymentId :" + paymentId);

		// 1. 먼저 결제 테이블에 넣기
		int payPutComplete = service.payPutComplete(totalAmount, paymentId);

		if (payPutComplete < 0) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed.");
		}

		// 대여한게 있을때 ..
		if (rentItemInfo != null && rentItemInfo.size() > 0) {

			System.out.println("rentItemInfo : " + rentItemInfo);

			// 대여한거 물품 갯수 갖고오기
			String rentCount = (String) itemList.get("rentCount");

			// 대여일 가져오기
			String[] dates = ((String) sumList.get("date")).split(" ~ ");
			String startDate = dates[0].trim(); // "2024. 06. 20" String endDate =
			String endDate = dates[1].trim(); // "2024. 06. 25"

			// Rent 테이블에 일단 값 넣기
			int borrowListYou = service.borrowListYou(rentCount, startDate, endDate, memberNo);

			if (borrowListYou < 0) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed.");
			}

			// rent 테이블에 넣고 잘들어갓을시 rent_detail에 넣기
			int putRentDetail = service.putRentDetail(rentItemInfo);

			if (putRentDetail < 0) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed.");
			}

			// 대여 한거 중에서 category = 2 (캠핑용품 인거)코드 가져와보기
			List<Map<String, Object>> rentItemInfoCategoryCode2CampEquipment = new ArrayList<>();
			for (Map<String, Object> item : rentItemInfo) {
				Object categoryObj = item.get("itemCategory");
				if (categoryObj instanceof Integer) {
					if ((Integer) categoryObj == 2) {
						rentItemInfoCategoryCode2CampEquipment.add(item);
					}
				} else if (categoryObj instanceof String) {
					try {
						if (Integer.parseInt((String) categoryObj) == 2) {
							rentItemInfoCategoryCode2CampEquipment.add(item);
						}
					} catch (NumberFormatException e) {
						// Handle the exception if the string cannot be parsed as an integer
						e.printStackTrace();
					}
				}
			}

			// 대여 한거 중에서 category = 3 (패키지 인거)코드 가져와보기
			List<Map<String, Object>> rentItemInfoCategoryCode3packageList = new ArrayList<>();
			for (Map<String, Object> item : rentItemInfo) {
				Object categoryObj = item.get("itemCategory");
				if (categoryObj instanceof Integer) {
					if ((Integer) categoryObj == 3) {
						rentItemInfoCategoryCode3packageList.add(item);
					}
				} else if (categoryObj instanceof String) {
					try {
						if (Integer.parseInt((String) categoryObj) == 3) {
							rentItemInfoCategoryCode3packageList.add(item);
						}
					} catch (NumberFormatException e) {
						// Handle the exception if the string cannot be parsed as an integer
						e.printStackTrace();
					}
				}
			}
			// 리스트중에 카테고리 2번 = 캠핑용품 애들 번호찾아서 그거 갯수 차감시키기

			if (rentItemInfoCategoryCode2CampEquipment != null && rentItemInfoCategoryCode2CampEquipment.size() != 0) {
				int putBorrowCategory2ChagamCampEquipment = service
						.putBorrowCategory2ChagamCampEquipment(rentItemInfoCategoryCode2CampEquipment);

				if (putBorrowCategory2ChagamCampEquipment < 0) {
					return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed.");
				}

				// 리스트중에 카테고리 3번 패키지 용품 애들 번호찾아서 그거 갯수 차감시키기
				if (rentItemInfoCategoryCode3packageList != null && rentItemInfoCategoryCode3packageList.size() != 0) {
					int putBorrowCategory3ChagamPackage = service
							.putBorrowCategory3ChagamPackage(rentItemInfoCategoryCode3packageList);

					if (putBorrowCategory3ChagamPackage < 0) {
						return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
								.body("Payment processing failed.");
					}

				}

			}

			// 대여한게 있을때 ..
		}
		// 대여한게 있을때 ..

		// 구매한게 있을때
		if (shopItemInfo != null && shopItemInfo.size() > 0) {

			String shopCount = (String) itemList.get("shopCount");

			// Purchase 테이블에 일단 넣기

			int PurchaseList = service.PurchaseList(shopCount, memberNo);

			if (PurchaseList < 0) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed.");
			}

			// Purchase 에 일단 넣고 잘들어갓을시 purchase_detail 에 넣기
			int putPurchaseDetail = service.putPurchaseDetail(shopItemInfo);

			if (putPurchaseDetail < 0) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed.");
			}

			// 구매 한거 중에서 category = 2 (캠핑용품 인거) 코드 가져와보기

			List<Map<String, Object>> purchaseItemInfoCategoryCode2CampEquipment = new ArrayList<>();
			for (Map<String, Object> item : shopItemInfo) {
				Object categoryObj = item.get("itemCategory");
				if (categoryObj instanceof Integer) {
					if ((Integer) categoryObj == 2) {
						purchaseItemInfoCategoryCode2CampEquipment.add(item);
					}
				} else if (categoryObj instanceof String) {
					try {
						if (Integer.parseInt((String) categoryObj) == 2) {
							purchaseItemInfoCategoryCode2CampEquipment.add(item);
						}
					} catch (NumberFormatException e) {
						// Handle the exception if the string cannot be parsed as an integer
						e.printStackTrace();
					}
				}
			}

			if (purchaseItemInfoCategoryCode2CampEquipment != null
					&& purchaseItemInfoCategoryCode2CampEquipment.size() != 0) {
				int putBorrowCategory2ChagamCampEquipment = service
						.putBorrowCategory2ChagamCampEquipmentPurchase(purchaseItemInfoCategoryCode2CampEquipment);

				if (putBorrowCategory2ChagamCampEquipment < 0) {
					return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment processing failed.");
				}
			}
			// 구매한게잇을때
		}
		// 구매한게잇을때

//	    	   String shoppingCount = (String)sumList.get("shoppingCount");

//  	    	  ra.addFlashAttribute("message" ,"결제완료 !");

		return ResponseEntity.ok("Payment processed successfully.");
	}

}
