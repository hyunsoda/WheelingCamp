package kr.co.wheelingcamp.mypage.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import kr.co.wheelingcamp.badge.model.dto.Badge;
import kr.co.wheelingcamp.item.model.dto.Item;
import kr.co.wheelingcamp.member.model.dto.Member;

public interface MyPageService {
	
	/** 입력한 비밀번호가 현재비밀번호와 같은지 확인
	 * @param memberNo
	 * @param inputPw
	 * @return
	 */
	int checkPw(int memberNo, String inputPw);

	/** 회원 탈퇴
	 * @param memberNo
	 * @return
	 */
	int secession(int memberNo);

	/** 비밀번호 변경
	 * @param loginMember
	 * @param newPw
	 * @return
	 */
	int changePw(Member loginMember, String newPw);

	/** 내 정보 수정
	 * @param inputMember
	 * @param memberAddress 
	 * @return
	 */
	int profile(Member inputMember, String[] memberAddress);

	/** 프로필 이미지 변경
	 * @param profileImg
	 * @param loginMember
	 * @return
	 * @throws Exception 
	 */
	int changeProfileImg(MultipartFile uploadFile, Member loginMember) throws Exception;

	/** 소셜 로그인인지 일반로그인인지확인하기
	 * @param memberNo
	 * @return
	 */
	int checkingLogin(int memberNo);

	/** 로그인한 맴버 주문내역 대여 목록
	 * @param memberNo
	 * @return
	 */
	List<Item> myOrderListBorrow(int memberNo);

	/** 로그인한 맴버 구매목록 
	 * @param memberNo
	 * @return
	 */
	List<Item> myOrderListPurchase(int memberNo);

	/** 대여 취소하기
	 * @param rentDetailNo
	 * @param memberNo
	 * @return
	 */
	int borrowListCancle(int rentDetailNo);

	/** 구매 취소하기
	 * @param purchaseDetailNo
	 * @return
	 */
	int purchaseListCancle(int purchaseDetailNo);

	List<Item> myOrderListRe(int memberNo);

	/** 대여 취소 목록 
	 * @param memberNo
	 * @return
	 */
	List<Item> itemListBorrowCancle(int memberNo);

	/** 구매 취소 목록
	 * @param memberNo
	 * @return
	 */
	List<Item> itemListPurchaseCancle(int memberNo);

	/** 대여 철회
	 * @param rentDetailNo
	 * @return
	 */
	int borrowDeleteCancle(int rentDetailNo);

	/** 구매 취소 철회
	 * @param purchaseDetailNo
	 * @return
	 */
	int purchaseDeleteCancle(int purchaseDetailNo);

	int insertLicenseData(Map<String, Object> map);

	/** 로그인한 회원의 운전면허 정보 가져오기
	 * @param memberNo
	 * @return
	 */
	Member getMyLicense(int memberNo);

	






}
