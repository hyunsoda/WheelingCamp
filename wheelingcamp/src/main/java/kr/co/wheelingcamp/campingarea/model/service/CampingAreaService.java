package kr.co.wheelingcamp.campingarea.model.service;

import java.util.List;
import java.util.Map;

import kr.co.wheelingcamp.campingarea.model.dto.CampingArea;

public interface CampingAreaService {

	List<CampingArea> selectHompageAll();

	int deleteAll(List<CampingArea> deleteList);

	/**
	 * 지역별 캠핑장 목록 탐색
	 * 
	 * @param locationNo
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectCampingAreaAll(int locationNo, int cp);

}
