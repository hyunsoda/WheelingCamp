package kr.co.wheelingcamp.interest.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.interest.model.dto.Interest;

@Mapper
public interface InterestMapper {

	 
	/** 대여 차량 목록
	 * @param memberNo
	 * @return
	 */
	List<Interest> rentalCarList(int memberNo);

	/** 대여 상품 목록
	 * @param memberNo
	 * @return
	 */
	List<Interest> rentalList1(int memberNo);
	
	/** 대여 상품 목록
	 * @param memberNo
	 * @return
	 */
	List<Interest> rentalList2(int memberNo);

	/** 구매 상품 목록
	 * @param memberNo
	 * @return
	 */
	List<Interest> shoppingItemList(int memberNo);

	/** 관심상품 삭제
	 * @param map
	 * @return
	 */
	int itemDelete(Map<String, Integer> map);
	
	/** 선택된 상품 전체 삭제
	 * @param map
	 * @return
	 */
	int checkListDelete(Map<String, Object> map);



}
