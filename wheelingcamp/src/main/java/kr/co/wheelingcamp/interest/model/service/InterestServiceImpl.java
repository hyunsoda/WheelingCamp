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
	public Map<String, List<Interest>> interestList(Map<String, Integer> map) {
		
		int memberNo = map.get("memberNo");
		
		Map<String, List<Interest>> interestMap = new HashMap<>();
		
		// 1. 대여 차량 목록 불러오기
		List<Interest> rentalCarList = mapper.rentalCarList(memberNo);
		
		// 2. 대여 상품 목록 불러오기
		List<Interest> rentalList1 = mapper.rentalList1(memberNo);
		
		// 3. 대여 패키지 목록 불러오기
		List<Interest> rentalList2 = mapper.rentalList2(memberNo);
		
		// 2, 3 번 리스트를 합치기
		List<Interest> rentalItemList = new ArrayList<>();
		rentalItemList.addAll(rentalList1);
		rentalItemList.addAll(rentalList2);
		
		// 4. 구매 상품 목록 불러오기
		List<Interest> shoppingItemList = mapper.shoppingItemList(memberNo);
		
		interestMap.put("rentalCarList", rentalCarList);
		interestMap.put("rentalItemList", rentalItemList);
		interestMap.put("shoppingItemList", shoppingItemList);
		
		
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
	
}
