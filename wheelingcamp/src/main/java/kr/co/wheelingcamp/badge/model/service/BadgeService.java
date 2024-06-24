package kr.co.wheelingcamp.badge.model.service;

import java.util.Map;

import kr.co.wheelingcamp.badge.model.dto.Badge;

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

	
	/** 대표뱃지 마이페이지에서 보여주기
	 * @param memberNo
	 * @return
	 */
	Badge showSelectedBadge(int memberNo);

}
