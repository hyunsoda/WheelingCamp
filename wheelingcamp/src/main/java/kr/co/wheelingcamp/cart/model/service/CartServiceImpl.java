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
		
		
		/////////////////////////////////////////////// 구매용 ///////////////////////////////////////////////
		// 1.캠핑 용품, 2. 패키지 순으로 불러와서 list에 저장
		// 1. 캠핑용품 치스트
		List<Cart> shoppingEquipmentList = mapper.getShoppingEquipmentList(memberNo);
		// 2. 패키지 리스트
		List<Cart> shoppingPackageList = mapper.getShoppingPackageList(memberNo);
		
		
		// 렌트용 상품 리스트
		List<Cart> rentalList = new ArrayList<>();
		rentalList.addAll(rentalCarList);
		rentalList.addAll(rentalEquipmentList);
		
		
		
		// 전체 장바구니에 저장
		Map<String, List<Cart>> cartMap = new HashMap<>();
		
		cartMap.put("rentalList", rentalList);	// 렌트 상품 리스트 (렌트는 차, 상품, 패키지 대여 가능)
		cartMap.put("rentalPackageList", rentalPackageList);	// 렌트 패키지 리스트
		cartMap.put("shoppingEquipmentList", shoppingEquipmentList);	// 구매 상품 리스트 (구매는 상품, 패키지만 구매 가능) 
		cartMap.put("shoppingPackageList", shoppingPackageList);	// 구매 패키지 리스트
		
		return cartMap;
	}

	// 장바구니 아이템 감소
	@Override
	public int itemMinus(int cartNo) {
		
		int result = mapper.itemMinus(cartNo);
		
		if(result > 0) {
			return 1;
		}

		return 0;
	}

	
}
