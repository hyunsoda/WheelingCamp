package kr.co.wheelingcamp.item.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.item.model.dto.Item;

@Mapper
public interface ItemMapper {

	/** 차 하나 가져오기
	 * @return
	 */
	Item selectOneCar(int itemNo);

	/**
	 * 모든 차 목록 가져오기
	 * 
	 * @return
	 */
	List<Item> selectCarAll();

	/**
	 * 모든 캠핑용품 목록 가져오기
	 * 
	 * @return
	 */
	List<Item> selectCampEquipmentAll();

	/**
	 * 모든 패키지 목록 가져오기
	 * 
	 * @return
	 */
	List<Item> selectPackageAll();

}
