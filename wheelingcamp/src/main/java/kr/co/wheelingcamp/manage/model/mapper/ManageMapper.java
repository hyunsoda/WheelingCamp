package kr.co.wheelingcamp.manage.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.member.model.dto.Member;

@Mapper
public interface ManageMapper {

	
	/** 회원정보 전체 가져오기
	 * @return
	 */
	List<Member> selectAllMember(int sortNo);

	/** 회원 한 명 정보 가져오기
	 * @param memberNo
	 * @return
	 */
	Member selectOneMember(String memberNo);
	
	//---------------------------------------------------------------------
}
