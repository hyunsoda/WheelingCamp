package kr.co.wheelingcamp.item.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import kr.co.wheelingcamp.item.model.dto.CampEquipment;
import kr.co.wheelingcamp.item.model.dto.Car;
import kr.co.wheelingcamp.item.model.dto.Item;
import kr.co.wheelingcamp.item.model.dto.Package;
import kr.co.wheelingcamp.item.model.dto.Review;

@Mapper
public interface ItemMapper {

	/**
	 * 차 하나 가져오기
	 * 
	 * @return
	 */
	Car selectOneCar(int itemNo);

	/**
	 * 캠핑용품 한 개 가져오기
	 * 
	 * @param itemNo
	 * @return
	 */
	CampEquipment selectOneEquipment(int itemNo);

	/**
	 * 패키지 한 개 가져오기
	 * 
	 * @param itemNo
	 * @return
	 */
	Package selectOnePackage(int itemNo);

	/**
	 * 모든 차 목록 가져오기
	 * 
	 * @param rowBounds
	 * 
	 * @param carLocationNo
	 * @param sortNo
	 * @param carGradeNo
	 * @param expectDate
	 * @param rentDate
	 * 
	 * @return
	 */
	List<Car> selectCarAll(Map<String, Object> map, RowBounds rowBounds);

	/**
	 * 모든 캠핑용품 목록 가져오기
	 * 
	 * @param rowBounds
	 * 
	 * @return
	 */
	List<CampEquipment> selectCampEquipmentAll(Map<String, Object> map, RowBounds rowBounds);

	/**
	 * 모든 패키지 목록 가져오기
	 * 
	 * @param rowBounds
	 * 
	 * @return
	 */
	List<Package> selectPackageAll(Map<String, Object> map, RowBounds rowBounds);

	/**
	 * 전체 상품 개수 가져오기
	 * 
	 * @param i
	 * 
	 * @return
	 */
	int getListCount(int categoryCode);

	/** 리뷰 가져오기
	 * @return
	 */
	List<Review> selectReview(int itemNo);

	/** 차 추천 상품
	 * @param itemNo
	 * @return
	 */
	List<Car> selectReccomendCar(int itemNo);
  
	/**
	 * 차급 목록 가져오기
	 * 
	 * @return
	 */
	List<String> selectCarGrade();

	/**
	 * 캠핑용품 카테고리 목록 가져오기
	 * 
	 * @return
	 */
	List<String> selectEquipmentCategory();

	/** 추천 패키지 리스트 가져오기
	 * @param itemNo
	 * @return
	 */
	List<Package> selectRecommendPackage(int itemNo);

}
