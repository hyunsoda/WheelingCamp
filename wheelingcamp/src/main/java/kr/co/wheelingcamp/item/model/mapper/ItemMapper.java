package kr.co.wheelingcamp.item.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.item.model.dto.Car;

@Mapper
public interface ItemMapper {

	/**
	 * 상품 목록 가져오기
	 * 
	 * @return
	 */
	List<Car> selectCategoryAll();

}
