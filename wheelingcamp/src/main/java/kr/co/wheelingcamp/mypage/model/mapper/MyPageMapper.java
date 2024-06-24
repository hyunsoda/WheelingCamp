package kr.co.wheelingcamp.mypage.model.mapper;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.item.model.dto.Item;
import kr.co.wheelingcamp.member.model.dto.Member;

@Mapper
public interface MyPageMapper {

	/** 입력한 비밀번호와 현재 비밀번호가 같은지 확인
	 * @param memberNo
	 * @return
	 */
	String checkPw(int memberNo);

	/** 회원 탈퇴
	 * @param memberNo
	 * @return
	 */
	int secession(int memberNo);

	/** 비밀번호 변경
	 * @param member
	 * @return
	 */
	int changePw(Member member);

	
	/** 내 정보 수정
	 * @param inputMember
	 * @return
	 */
	int profile(Member inputMember);

	/** 프로필 사진 변경
	 * @param member
	 * @return
	 */
	int changeProfileImg(Member member);

	/** 로그인한 사람 주문내역 = 대여
	 * @param memberNo
	 * @return
	 */
	List<Item> myOrderListBorrow(int memberNo);

	/** 로그인한 사람 주문내역 = 구매
	 * @param memberNo
	 * @return
	 */
	List<Item> myOrderListPurchase(int memberNo);

	/** 대여 목록 취소하기
	 * @param rentDetailNo
	 * @param memberNo
	 * @return
	 */
	int borrowListCancle(int rentDetailNo);

	/** 구매 목록 취소하기
	 * @param purchaseDetailNo
	 * @return
	 */
	int purchaseListCancle(int purchaseDetailNo);

	List<Item> myOrderListRe(int memberNo);

	/** 대여 취소 목록 가져오기
	 * @param memberNo
	 * @return
	 */
	List<Item> itemListBorrowCancle(int memberNo);

	/** 구매 취소 목록
	 * @param memberNo
	 * @return
	 */
	List<Item> itemListPurchaseCancle(int memberNo);

	/** 대여 취소 철회
	 * @param rentDetailNo
	 * @return
	 */
	int borrowDeleteCancle(int rentDetailNo);

	/** 구매 취소 철회
	 * @param purchaseDetailNo
	 * @return
	 */
	int purchaseDeleteCancle(int purchaseDetailNo);

	/** 운전면허 데이터 insert
	 * @param map
	 * @return
	 */
	int insertLicenseData(Map<String, Object> map);

	/**로그인한 회원의 운전면허 정보 불러오기
	 * @param memberNo
	 * @return
	 */
	Member getMyLicense(int memberNo);

	/** 로그인한 회원의 운전면허 변경하기
	 * @param map
	 * @return
	 */
	int updateLicenseData(Map<String, Object> map);
	
}
