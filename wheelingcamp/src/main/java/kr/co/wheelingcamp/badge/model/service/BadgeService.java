package kr.co.wheelingcamp.badge.model.service;

import java.util.Map;

public interface BadgeService {

	
	/** 뱃지 목록 조회
	 * @param memberNo
	 * @return
	 */
	Map<String, Object> selectBadgeList(int memberNo);

}
