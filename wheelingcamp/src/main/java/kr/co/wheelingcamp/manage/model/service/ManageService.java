package kr.co.wheelingcamp.manage.model.service;

import java.util.List;

import kr.co.wheelingcamp.item.model.dto.Item;
import kr.co.wheelingcamp.member.model.dto.Member;
import kr.co.wheelingcamp.pay.model.dto.Pay;
import kr.co.wheelingcamp.pay.model.dto.PayDetail;

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

	/**
	 * 회원 정보 수정하기
	 * 
	 * @param member
	 * @return
	 */
	int updateMember(Member member);


	/**
	 * 상품 전체 목록 가져오기
	 * 
	 * @param cp
	 * @param sortNo
	 * @param categoryCode
	 * @return
	 */
	Map<String, Object> selectAllItem(int categoryCode);

	/**
	 * 상품 1개 가져오기
	 * 
	 * @param categoryCode
	 * @param itemNo
	 * @return
	 */
	Map<String, Object> selectOneItem(int categoryCode, int itemNo);

	/**
	 * 멤버 삭제하기
	 * 
	 * @param memberNo
	 * @return
	 */
	int deleteMember(int memberNo);

	/**
	 * 멤버 생성하기
	 * 
	 * @param member
	 * @return
	 */
	int insertMember(Member member);

	/**
	 * 상품 정보 수정
	 * 
	 * @param item
	 * @return
	 */
	int updateItem(Map<String, Object> item);
  
	//-------------------------------------- 주문조회
	
	/** 전체 주문조회
	 * @return
	 */
	Map<String, Object> selectAllOrder(int payCode);

	/** 주문 삭제
	 * @param payCode
	 * @param payNo
	 * @return
	 */
	int deleteOrder( int payNo);

	/** 주문 수정
	 * @param pay
	 * @return
	 */
	int updateOrder(Pay pay, int payCode);

	/** 주문 하나 조회
	 * @param payCode
	 * @param payNo
	 * @return
	 */
	Map<String, Object> selectOneOrder(int payCode, int payNo);

	/** pay Detail 수정
	 * @param payDetail
	 * @return
	 */
	int updateOrderDetail(PayDetail payDetail);
	//-----------------------------------------------------------------------------------------
	/** 멤버 가입자 수 가져오기
	 * @return
	 */
	List<Member> memberCount();

	/** 아이템 뷰카운트 가져오기
	 * @return
	 */
	List<Item> itemViewCount(int categoryCode);

	// --------------------------------------------------------------------------------------
}
