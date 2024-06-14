package kr.co.wheelingcamp.manage.model.service;

import java.util.List;

import kr.co.wheelingcamp.member.model.dto.Member;

public interface ManageService {

	/**
	 * 관리자용 서버 주소 가져오기
	 * 
	 * @return
	 */
	String getUrl();

	/** 회원 정보 가져오기
	 * @return
	 */
	List<Member> selectAllMember(int sortNo);
	
	/** 회원 한 명 정보 조회
	 * @param memberNo
	 * @return
	 */
	Member selectOneMember(String memberNo);
	
	
//---------------------------------------------------------------------

	
}
