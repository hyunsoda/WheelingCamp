package kr.co.wheelingcamp.cart.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
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
		Map<String, List<Cart>> cartMap = service.getCartList(member.getMemberNo());
		
		model.addAttribute("rentalList", cartMap.get("rentalList"));
		model.addAttribute("shoppingList", cartMap.get("shoppingList"));
		
		return "cart/cartList";
	}
	
	@ResponseBody
	@PostMapping("cartListTest")
	public Map<String, List<Cart>> cartMapTest(@RequestBody Map<String, Integer> map) {
		
		Map<String, List<Cart>> cartMap = service.getCartList(map.get("memberNo"));
		
		
		return cartMap;
	}
	
	/** 장바구니에서 수량 증감
	 * @param map
	 * @return
	 */
	@ResponseBody
	@PutMapping("itemCount")
	public int itemCount (@RequestBody Map<String, Integer> map){
		
		return service.itemCount(map);
	}
	
	/** 장바구니 상품 삭제
	 * @param map
	 * @return
	 */
	@ResponseBody
	@DeleteMapping("itemDelete")
	public int itemDelete (@RequestBody Map<String, Integer> map) {
		
		return service.itemDelete(map);
	}
	

	
}
