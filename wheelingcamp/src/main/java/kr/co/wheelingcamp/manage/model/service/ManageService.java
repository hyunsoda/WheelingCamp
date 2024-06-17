package kr.co.wheelingcamp.manage.model.service;

import java.util.List;

import kr.co.wheelingcamp.member.model.dto.Member;
import java.util.Map;

import kr.co.wheelingcamp.member.model.dto.Member;

public interface ManageService {

	/**
	 * 관리자용 서버 주소 가져오기
	 * 
	 * @return
	 */
	String getUrl();

	/**
	 * 회원 정보 가져오기
	 * 
	 * @return
	 */
	List<Member> selectAllMember();

	/** 회원 정보 수정하기
	 * @param member
	 * @return
	 */
	int updateMember(Member member);

	int latestMemberNo();

//	/**
//	 * 상품 전체 목록 가져오기
//	 * 
//	 * @param cp
//	 * @param sortNo
//	 * @param categoryCode
//	 * @return
//	 */
//	Map<String, Object> selectAllItem(Map<String, Object> map);
	Map<String, Object> selectAllItem(int categoryCode);

	/**
	 * 상품 1개 가져오기
	 * 
	 * @param categoryCode
	 * @param itemNo
	 * @return
	 */
	Map<String, Object> selectOneItem(int categoryCode, int itemNo);

	/** 멤버 삭제하기
	 * @param memberNo
	 * @return
	 */
	int deleteMember(int memberNo);

	/** 멤버 생성하기
	 * @param member
	 * @return
	 */
	int insertMember(Member member);

	// --------------------------------------------------------------------------------------
}
