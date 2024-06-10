package kr.co.wheelingcamp.cart.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.cart.model.dto.Cart;

@Mapper
public interface CartMapper {

	/** 대여 차 장바구니 리스트
	 * @param memberNo
	 * @return
	 */
	List<Cart> getRentalCarList(int memberNo);

	/** 대여 상품 장바구니 리스트
	 * @param memberNo
	 * @return
	 */
	List<Cart> getRentalEquipmentList(int memberNo);

	/** 대여 패키지 장바구니 리스트
	 * @param memberNo
	 * @return
	 */
	List<Cart> getRentalPackageList(int memberNo);

	/** 구매 상품 장바구니 리스트
	 * @param memberNo
	 * @return
	 */
	List<Cart> getShoppingEquipmentList(int memberNo);

	/** 구매 패키지 장바구니 리스트
	 * @param memberNo
	 * @return
	 */
	List<Cart> getShoppingPackageList(int memberNo);

	/** 장바구니 아이템 감소
	 * @param cartNo
	 * @return
	 */
	int itemMinus(Map<String, Integer> map);

	/** 장바구니 아이템 증가
	 * @param cartNo
	 * @return
	 */
	int itemPlus(Map<String, Integer> map);

	/** 장바구니 상품 삭제
	 * @param map
	 * @return
	 */
	int itemDelete(Map<String, Integer> map);

}
