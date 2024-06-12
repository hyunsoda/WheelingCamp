package kr.co.wheelingcamp.cart.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.wheelingcamp.cart.model.dto.Cart;
import kr.co.wheelingcamp.cart.model.mapper.CartMapper;
import kr.co.wheelingcamp.member.model.dto.Member;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor=Exception.class)
public class CartServiceImpl implements CartService{

	private final CartMapper mapper;

	// 로그인 한 회원의 장바구니 정보 불러오기
	@Override
	public Map<String, List<Cart>> getCartList(int memberNo) {

		/////////////////////////////////////////////// 대여용 ///////////////////////////////////////////////
		// 1. 차, 2. 캠핑 용품, 3. 패키지 순으로 불러와서 list에 저장
		// 1. 차 리스트
		List<Cart> rentalCarList = mapper.getRentalCarList(memberNo);
		// 2. 캠핑용품 치스트
		List<Cart> rentalEquipmentList = mapper.getRentalEquipmentList(memberNo);
		// 3. 패키지 리스트
		List<Cart> rentalPackageList = mapper.getRentalPackageList(memberNo);
		
		
		/// 전체 대여 리스트
		List<Cart> rentalList = new ArrayList<>();
		rentalList.addAll(rentalCarList);
		rentalList.addAll(rentalEquipmentList);
		rentalList.addAll(rentalPackageList);
		
		
		
		/////////////////////////////////////////////// 구매용 ///////////////////////////////////////////////
		// 1.캠핑 용품
		// 1. 캠핑용품 리스트
		List<Cart> shoppingEquipmentList = mapper.getShoppingEquipmentList(memberNo);

		
		// 전체 장바구니에 저장
		Map<String, List<Cart>> cartMap = new HashMap<>();
		
		cartMap.put("rentalList", rentalList);
		cartMap.put("shoppingList", shoppingEquipmentList);
		
		return cartMap;
	}

	// 장바구니 아이템 증감
	@Override
	public int itemCount(Map<String, Integer> map) {
		
		int result = 0;
		
		// 감소
		if(map.get("math") == 1) {
			result = mapper.itemMinus(map);
		}else { // 증가
			result = mapper.itemPlus(map);
		}
		

		return result;
	}


	// 장바구니 상품 삭제
	@Override
	public int itemDelete(Map<String, Integer> map) {
		
		return mapper.itemDelete(map);
	}

	
	// 장바구니 상품 추가
	@Override
	public int appendCart(Map<String, Integer> map) {
		
		// 장바구니에 존재하는지 확인
		int isAppend = mapper.searchItem(map);
		int result = 0;
		
		// 존재하면 갯수 늘리기
		if(isAppend > 0) {
			result = mapper.updateCart(map);
		}else { // 아니면 추가
			result = mapper.insertCart(map);
		}
		
		return result;
	}


	
}
