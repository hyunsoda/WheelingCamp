package kr.co.wheelingcamp.item.model.service;

import java.util.Map;

import kr.co.wheelingcamp.item.model.dto.Item;

public interface ItemService {

	/**
	 * 상품 하나 가져오기
	 * 
	 * @param categoryCode, itemNo
	 * @return
	 */
	Item selectOne(int categoryCode, int itemNo);

	/**
	 * 상품 목록 가져오기
	 * 
	 * @param categoryCode
	 * @param carLocationNo
	 * @param expectDate
	 * @param rentDate
	 * @param carGradeNo
	 * @param sortNo
	 * 
	 * @return
	 */
	Map<String, Object> selectCategoryAll(Map<String, Object> map);
}
