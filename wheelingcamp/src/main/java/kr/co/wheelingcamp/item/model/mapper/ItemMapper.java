package kr.co.wheelingcamp.item.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.item.model.dto.CampEquipment;
import kr.co.wheelingcamp.item.model.dto.Car;
import kr.co.wheelingcamp.item.model.dto.Item;
import kr.co.wheelingcamp.item.model.dto.Package;


@Mapper
public interface ItemMapper {

	/** 차 하나 가져오기
	 * @return
	 */
	Car selectOneCar(int itemNo);

	/** 캠핑용품 한 개 가져오기
	 * @param itemNo
	 * @return
	 */
	CampEquipment selectOneEquipment(int itemNo);
	
	
	/** 패키지 한 개 가져오기
	 * @param itemNo
	 * @return
	 */
	Package selectOnePackage(int itemNo);
	
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
