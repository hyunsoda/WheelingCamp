package kr.co.wheelingcamp.item.model.service;

import java.util.List;

import kr.co.wheelingcamp.item.model.dto.Item;

public interface ItemService {

	/**
	 * 상품 목록 가져오기
	 * 
	 * @param categoryCode
	 * 
	 * @return
	 */
	List<Item> selectCategoryAll(int categoryCode);

}
