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

	/** 장바구니에 존재하는지 확인
	 * @param map
	 * @return
	 */
	int searchItem(Map<String, Integer> map);

	/** 존재하면 개수 늘리기
	 * @param map
	 * @return
	 */
	int updateCart(Map<String, Integer> map);

	/** 존재하지 않으면 추가
	 * @param map
	 * @return
	 */
	int insertCart(Map<String, Integer> map);

	/** 선택된 상품 전체 삭제
	 * @param map
	 * @return
	 */
	int checkListDelete(Map<String, Object> map);

}
