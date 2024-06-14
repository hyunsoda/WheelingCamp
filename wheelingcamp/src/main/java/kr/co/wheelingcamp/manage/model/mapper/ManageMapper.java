package kr.co.wheelingcamp.manage.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.item.model.dto.CampEquipment;
import kr.co.wheelingcamp.item.model.dto.Car;
import kr.co.wheelingcamp.item.model.dto.Package;
import kr.co.wheelingcamp.member.model.dto.Member;

@Mapper
public interface ManageMapper {

	/**
	 * 회원정보 전체 가져오기
	 * 
	 * @return
	 */
	List<Member> selectAllMember(int sortNo);

	/**
	 * 회원 한 명 정보 가져오기
	 * 
	 * @param memberNo
	 * @return
	 */
	Member selectOneMember(String memberNo);

	// ---------------------------------------------------------------------
	// -----------------------------------------------------------------------------------

	/**
	 * 모든 차 목록 가져오기
	 * 
	 * @param map
	 * @param rowBounds
	 * @return
	 */
	List<Car> selectCarAll();

	/**
	 * 모든 캠핑용품 목록 가져오기
	 * 
	 * @param map
	 * @param rowBounds
	 * @return
	 */
	List<CampEquipment> selectCampEquipmentAll();

	/**
	 * 모든 패키지 목록 가져오기
	 * 
	 * @param map
	 * @param rowBounds
	 * @return
	 */
	List<Package> selectPackageAll();

	// -----------------------------------------------------------------------------------
}
