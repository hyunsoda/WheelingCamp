package kr.co.wheelingcamp.badge.model.service;

import java.util.Map;

public interface BadgeService {

	
	/** 뱃지 목록 조회
	 * @param memberNo
	 * @return
	 */
	Map<String, Object> selectBadgeList(int memberNo);

	/** 대표뱃지 선택
	 * @param memberNo
	 * @param badge == badgeNo 
	 * @return
	 */
	int selectedBadge(int memberNo, int badgeNo);

}
