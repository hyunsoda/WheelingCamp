package kr.co.wheelingcamp.item.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.item.model.dto.Item;

@Mapper
public interface ItemMapper {

	/** 차 하나 가져오기
	 * @return
	 */
	Item selectOneCar(int itemNo);



}
