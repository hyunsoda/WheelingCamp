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


}
