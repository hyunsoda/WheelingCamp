package kr.co.wheelingcamp.item.model.service;

import java.util.List;

public interface ItemService {

	/**
	 * 상품 목록 가져오기
	 * 
	 * @return
	 */
	List<?> selectCategoryAll();

}
