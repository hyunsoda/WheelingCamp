package kr.co.wheelingcamp.manage.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.item.model.dto.CampEquipment;
import kr.co.wheelingcamp.item.model.dto.Car;
import kr.co.wheelingcamp.item.model.dto.Package;
import kr.co.wheelingcamp.member.model.dto.Member;

@Mapper
public interface ManageMapper {

	List<Member> selectAllMember();

	int updateMember(Member member);

	// ---------------------------------------------------------------------
	// -----------------------------------------------------------------------------------

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
	int latestMemberNo();

	/**
	 * 회원 삭제하기
	 * 
	 * @param memberNo
	 * @return
	 */
	int deleteMember(int memberNo);

	/**
	 * 회원 생성하기
	 * 
	 * @param member
	 * @return
	 */
	int insertMember(Member member);

	/**
	 * 차 데이터 수정
	 * 
	 * @return
	 */
	int updateCar(Map<String, Object> item);

	/**
	 * 캠핑용품 데이터 수정
	 * 
	 * @return
	 */
	int updateCampEquipment(Map<String, Object> item);

	/**
	 * 패키지 데이터 수정
	 * 
	 * @return
	 */
	int updatePackage(Map<String, Object> item);
}
