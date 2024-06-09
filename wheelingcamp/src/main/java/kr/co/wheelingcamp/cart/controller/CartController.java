package kr.co.wheelingcamp.cart.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import kr.co.wheelingcamp.cart.model.dto.Cart;
import kr.co.wheelingcamp.cart.model.service.CartService;
import kr.co.wheelingcamp.member.model.dto.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@RequestMapping("cart")
@SessionAttributes({"loginMember"})
@Slf4j
public class CartController {

	private final CartService service;
	
	/** 로그인한 회원의 대여용 장바구니 정보 불러오기
	 * @param member
	 * @return
	 */
	@GetMapping("cartList")
	public String cartList(@ModelAttribute("loginMember") Member member,
							Model model) {
		
		// 대여 상품, 구매상품 리스트
		Map<String, List<Cart>> CartMap = service.getCartList(member.getMemberNo());
		
		model.addAttribute("rentalCartList", CartMap.get("rentalList"));
		model.addAttribute("rentalPackageList", CartMap.get("rentalPackageList"));
		model.addAttribute("shoppingCartList", CartMap.get("shoppingEquipmentList"));
		model.addAttribute("shoppingPackageList", CartMap.get("shoppingPackageList"));
		
		
		return "cart/cartList";
	}
	
	@ResponseBody
	@PutMapping("itemMinus")
	public int itemMinus (@RequestBody Map<String, Integer> map) {
		
		int result = service.itemMinus(map.get("cartNo"));
		
		System.out.println(result);
		
		return result;
	}
	
}
