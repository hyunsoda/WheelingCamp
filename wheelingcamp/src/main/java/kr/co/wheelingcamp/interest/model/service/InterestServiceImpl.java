package kr.co.wheelingcamp.interest.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.wheelingcamp.interest.model.dto.Interest;
import kr.co.wheelingcamp.interest.model.mapper.InterestMapper;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackFor=Exception.class)
@RequiredArgsConstructor
public class InterestServiceImpl implements InterestService{

	private final InterestMapper mapper;

	
	// 관심상품 목록 불러오기
	@Override
	public Map<String, List<Interest>> interestList(int loginMemberNo) {
		
		int memberNo = loginMemberNo;
		
		Map<String, List<Interest>> interestMap = new HashMap<>();
		
		// 1. 대여 차량 목록 불러오기
		List<Interest> rentalCarList = mapper.rentalCarList(memberNo);
		
		// 2. 대여 상품 목록 불러오기
		List<Interest> rentalList1 = mapper.rentalList1(memberNo);
		
		// 3. 대여 패키지 목록 불러오기
		List<Interest> rentalList2 = mapper.rentalList2(memberNo);
		
		// 2, 3 번 리스트를 합치기
		List<Interest> rentalItemList = new ArrayList<>();
		rentalItemList.addAll(rentalList2);
		rentalItemList.addAll(rentalList1);
		
		interestMap.put("rentalCarList", rentalCarList);
		interestMap.put("rentalItemList", rentalItemList);
		
		
		return interestMap;
	}
	
	// 관심상품 삭제
	@Override
	public int itemDelete(Map<String, Integer> map) {
		
		return mapper.itemDelete(map);
	}
	
	// 선택된 상품 전체 삭제
	@Override
	public int checkListDelete(Map<String, Object> map) {
		
		return mapper.checkListDelete(map);
	}

	// 관심상품 추가 / 삭제
	@Override
	public int interest(Map<String, Integer> map) {
		
		int result = 0;	// sql 실행 완료 여부
		int check = mapper.itemInterest(map); // 관심상품 존재 여부
		
		
		// check가 0 이면 찜하기, 1이면 찜 취소
		if(check == 0) {
			result = mapper.interestAdd(map);
			if(result > 0) result = 1;
		}else {
			result = mapper.interestDelete(map);
			if(result > 0) result = 2;
		}

		return result;
	}

	// 관심상품 여부 확인
	@Override
	public int itemInterestCheck(Map<String, Integer> map) {
		
		return mapper.itemInterest(map);
	}

	// 관심상품 리스트
	@Override
	public List<Integer> interestArrayList(int memberNo) {
		
		// 1. 대여 차량 목록 불러오기
		List<Integer> rentalCarNoList = mapper.rentalCarNoList(memberNo);
		
		// 2. 대여 상품 목록 불러오기
		List<Integer> rentalNoList1 = mapper.rentalNoList1(memberNo);
		
		// 3. 대여 패키지 목록 불러오기
		List<Integer> rentalNoList2 = mapper.rentalNoList2(memberNo);
		
		// 2, 3 번 리스트를 합치기
		List<Integer> rentalItemList = new ArrayList<>();
		
		rentalItemList.addAll(rentalCarNoList);
		rentalItemList.addAll(rentalNoList1);
		rentalItemList.addAll(rentalNoList2);
		


		return rentalItemList;
	}

	
}
