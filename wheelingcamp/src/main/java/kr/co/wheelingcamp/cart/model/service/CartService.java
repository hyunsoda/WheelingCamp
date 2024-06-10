package kr.co.wheelingcamp.cart.model.service;

import java.util.List;
import java.util.Map;

import kr.co.wheelingcamp.cart.model.dto.Cart;
import kr.co.wheelingcamp.member.model.dto.Member;

public interface CartService {

	/** 장바구니 정보 불러오기
	 * @param member
	 * @return
	 */
	Map<String, List<Cart>> getCartList(int memberNo);

	/** 장바구니 상품 감소
	 * @param cartNo
	 * @return
	 */
	int itemCount(Map<String, Integer> map);

	/** 장바구니 상품 삭제
	 * @param map
	 * @return
	 */
	int itemDelete(Map<String, Integer> map);



}
