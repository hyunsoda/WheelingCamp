package kr.co.wheelingcamp.manage.model.service;

import java.util.Map;

public interface ManageService {

	/**
	 * 관리자용 서버 주소 가져오기
	 * 
	 * @return
	 */
	String getUrl();

	// --------------------------------------------------------------------------------------

	/**
	 * 상품 전체 목록 가져오기
	 * 
	 * @param cp
	 * @param sortNo
	 * @param categoryCode
	 * @return
	 */
	Map<String, Object> selectAllItem(Map<String, Object> map);

	// --------------------------------------------------------------------------------------
}
