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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import jakarta.servlet.http.HttpSession;
import kr.co.wheelingcamp.cart.model.dto.Cart;
import kr.co.wheelingcamp.cart.model.service.CartService;
import kr.co.wheelingcamp.member.model.dto.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("cart")
@SessionAttributes({"loginMember"})
@Slf4j
public class CartController {

	private final CartService service;
	

	
	@PostMapping("cartListTest")
	public Map<String, List<Cart>> cartMapTest(@RequestBody Map<String, Integer> map) {
		
		Map<String, List<Cart>> cartMap = service.getCartList(map.get("memberNo"));
		
		
		return cartMap;
	}
	
	/** 장바구니에서 수량 증감
	 * @param map
	 * @return
	 */
	@PutMapping("itemCount")
	public int itemCount (@RequestBody Map<String, Integer> map){
		
		return service.itemCount(map);
	}
	
	/** 장바구니 상품 삭제
	 * @param map
	 * @return
	 */
	@DeleteMapping("itemDelete")
	public int itemDelete (@RequestBody Map<String, Integer> map) {
		
		return service.itemDelete(map);
	}
	
	
	/** 장바구니 상품 추가
	 * @param map 
	 * @return
	 */
	@PostMapping("appendCart")
	public int appendCart(@RequestBody Map<String, Object> map,
							HttpSession session) {
		
		map.put("memberNo", ((Member)session.getAttribute("loginMember")).getMemberNo());
		
		log.info("map = {}", map);
		
		// service.appendCart(map) 
	
		return 0;
	}
	
	
	/** 선택된 상품전체 삭제
	 * @param map
	 * @return
	 */
	@PostMapping("checkListDelete")
	public int checkListDelete(@RequestBody Map<String, Object> map) {

		return service.checkListDelete(map);
	}
	

	
	
	

	
}
