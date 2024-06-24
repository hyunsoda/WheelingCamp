package kr.co.wheelingcamp.manage.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import kr.co.wheelingcamp.item.model.dto.Item;
import kr.co.wheelingcamp.item.model.dto.Package;
import kr.co.wheelingcamp.item.model.mapper.ItemMapper;
import kr.co.wheelingcamp.manage.model.mapper.ManageMapper;
import kr.co.wheelingcamp.member.model.dto.Member;
import kr.co.wheelingcamp.pay.model.dto.Pay;
import kr.co.wheelingcamp.pay.model.dto.PayDetail;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ManageServiceImpl implements ManageService {

	private final ManageMapper mapper;

	private final ItemMapper itemMapper;

	// config.propertis에서 관리자용 주소
	@Value("${manage.user.url}")
	private String manageUrl;

	// 관리자용 주소 가져오기
	@Override
	public String getUrl() {
		return manageUrl;
	}

	// 회원 전체 목록 가져오기
	@Override
	public List<Member> selectAllMember() {
		return mapper.selectAllMember();
	}

	// 회원 한 명 수정하기
	@Override
	public int updateMember(Member member) {
		return mapper.updateMember(member);
	}

	// 회원 삭제하기
	@Override
	public int deleteMember(int memberNo) {

		return mapper.deleteMember(memberNo);
	}

	// 회원 생성하기
	@Override
	public int insertMember(Member member) {
		return mapper.insertMember(member);
	}

	// ------------------------------------주문조회---------------------------------
	@Override
	public Map<String, Object> selectAllOrder(int payCode) {

		Map<String, Object> resultMap = new HashMap<>();

		switch (payCode) {

		case 1:
			resultMap.put("payList", mapper.selectAllPurchase(payCode));
			log.info("확인 " + resultMap.get("payList"));
			break;
		case 2:
			resultMap.put("payList", mapper.selectAllRent(payCode));
			log.info("확인222 " + resultMap.get("payList"));
			break;

		}

		return resultMap;

	}

	// 주문 삭제
	@Override
	public int deleteOrder(int payNo) {

		return mapper.deletePay(payNo);
	}

	// 주문 수정
	@Override
	public int updateOrder(Pay pay, int payCode) {

		int result = 0;

		result = mapper.updatePay(pay);

		switch (payCode) {
		case 1:
			result += mapper.updatePurchase(pay);
			log.info("업데이트 확인" + result);
			break;

		case 2:
			result += mapper.updateRent(pay);
			break;
		}

		return result;
	}

	// 주문 하나 조회
	@Override
	public Map<String, Object> selectOneOrder(int payCode, int payNo) {

		Map<String, Object> resultMap = new HashMap<>();

		switch (payCode) {
		case 1:
			resultMap.put("payDetail", mapper.selectOnePurchase(payNo));
			log.info("오나?" + resultMap.get("payDetail"));
			break;

		case 2:
			resultMap.put("payDetail", mapper.selectOneRent(payNo));
			break;
		}

		return resultMap;
	}

	// 주문 디테일 수정
	@Override
	public int updateOrderDetail(PayDetail payDetail) {		
		String purchaseDelFl = payDetail.getPurchaseDetailDelFl();
		
		if(purchaseDelFl==null) {
			
			return mapper.updateOrderRentDetail(payDetail);
		}else {
			return mapper.updateOrderPurchaseDetail(payDetail);
		}
	}
	// -------------------------------------------------------------------------------------------

	// 상품 전체 목록 가져오기
	@Override
	public Map<String, Object> selectAllItem(int categoryCode) {

		Map<String, Object> resultMap = new HashMap<>();

		switch (categoryCode) {
		case 0: // 전체 목록 호출

			break;
		case 1: // 자동차 목록 호출
			resultMap.put("itemList", mapper.selectCarAll());
			break;
		case 2: // 캠핑용품 목록 호출
			resultMap.put("itemList", mapper.selectCampEquipmentAll());
			break;
		case 3: // 패키지 목록 호출
			resultMap.put("itemList", mapper.selectPackageAll());
			break;
		}

		return resultMap;
	}

	// 상품 1개 가져오기
	@Override
	public Map<String, Object> selectOneItem(int categoryCode, int itemNo) {

		Map<String, Object> resultMap = new HashMap<>();
		switch (categoryCode) {
		case 1:
			resultMap.put("item", itemMapper.selectOneCar(itemNo));
			resultMap.put("carGradeList", itemMapper.selectCarGrade());
			break;
		case 2:
			resultMap.put("item", itemMapper.selectOneEquipment(itemNo));
			resultMap.put("equipmentCategoryList", itemMapper.selectEquipmentCategory());
			break;
		case 3:
			Package item = itemMapper.selectOnePackage(itemNo);
			item.setItemNo(item.getPackageNo());
			resultMap.put("item", item);
			break;
		}

		return resultMap;
	}

	@Override
	public int updateItem(Map<String, Object> item) {
		int result = 0;

		switch (Integer.parseInt(item.get("categoryCode").toString())) {
		case 1:
			result = mapper.updateCar(item);
			break;
		case 2:
			result = mapper.updateCampEquipment(item);
			break;
		case 3:
			result = mapper.updatePackage(item);
			break;

		}

		return result;
	}

	//------------------------------------------------------------------
	
	// 가입자수 가져오기
	@Override
	public List<Member> memberCount() {
		return mapper.memberCount();
	}

	// 아이템 뷰카운트
	@Override
	public List<Item> itemViewCount(int categoryCode) {
		return mapper.itemViewCount(categoryCode);
	}



}
