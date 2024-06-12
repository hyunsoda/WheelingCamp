package kr.co.wheelingcamp.interest.model.service;

import java.util.List;
import java.util.Map;

import kr.co.wheelingcamp.interest.model.dto.Interest;

public interface InterestService {

	/** 관심상품 목록 불러오기
	 * @param map
	 * @return
	 */
	Map<String, List<Interest>> interestList(Map<String, Integer> map);
	
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
}
