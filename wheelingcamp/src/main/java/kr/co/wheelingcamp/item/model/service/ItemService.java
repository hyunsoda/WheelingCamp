package kr.co.wheelingcamp.item.model.service;

import java.util.Map;

import kr.co.wheelingcamp.item.model.dto.Item;

public interface ItemService {


	/** 상품 하나 가져오기
	 * @param itemMap
	 * @return
	 */
	Item selectOne(int categoryCode, int itemNo);

}
