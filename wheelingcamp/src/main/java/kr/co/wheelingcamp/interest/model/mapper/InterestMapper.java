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

	/** 관심상품 추가
	 * @param map
	 * @return
	 */
	int interestAdd(Map<String, Integer> map);

	/** 찜 취소
	 * @param map
	 * @return
	 */
	int interestDelete(Map<String, Integer> map);

	/** 관심상품 확인 여부
	 * @param map
	 * @return
	 */
	int itemInterest(Map<String, Integer> map);

	
	/////////////////////// 관심 상품 넘버 리스트
	List<Integer> rentalCarNoList(int memberNo);

	List<Integer> rentalNoList1(int memberNo);

	List<Integer> rentalNoList2(int memberNo);



}
