package kr.co.wheelingcamp.item.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.wheelingcamp.common.util.Pagination;
import kr.co.wheelingcamp.item.model.dto.Car;
import kr.co.wheelingcamp.item.model.dto.Item;
import kr.co.wheelingcamp.item.model.dto.Review;
import kr.co.wheelingcamp.item.model.mapper.ItemMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class ItemServiceImpl implements ItemService {

	private final ItemMapper mapper;

	// Pagination 용 변수 선언
	private static final int limit = 18; // 한 페이지 목록에 보여지는 상품 수
	private static final int pageSize = 10; // 보여질 페이지 번호 개수

	// 상품 하나 가져오기
	@Override
	public Item selectOne(int categoryCode, int itemNo) {

		Item item = null;

		if (categoryCode == 1) { // 차인 경우

			item = mapper.selectOneCar(itemNo);

		} else if (categoryCode == 2) { // 캠핑용품인 경우

			item = mapper.selectOneEquipment(itemNo);

		} else { // 패키지인 경우

			item = mapper.selectOnePackage(itemNo);
		}

		return item;
	}

	// 상품 전체 목록 가져오기
	@Override
	public Map<String, Object> selectCategoryAll(Map<String, Object> map) {

		// 페이지네이션용 전체 상품 개수 탐색
		int listCount = mapper.getListCount((int) map.get("categoryCode"));

		Pagination pagination = new Pagination((int) map.get("cp"), listCount, limit, pageSize);
		int offset = ((int) map.get("cp") - 1) * limit;
		RowBounds rowBounds = new RowBounds(offset, limit);

		Map<String, Object> resultMap = new HashMap<>();

		switch ((int) map.get("categoryCode")) {
		case 1: // 자동차 목록 호출
			resultMap.put("itemList", mapper.selectCarAll(map, rowBounds));
			break;
		case 2: // 캠핑용품 목록 호출
			resultMap.put("itemList", mapper.selectCampEquipmentAll(map, rowBounds));
			break;
		case 3: // 패키지 목록 호출
			resultMap.put("itemList", mapper.selectPackageAll(map, rowBounds));
			break;
		}

		resultMap.put("pagination", pagination);

		return resultMap;
	}
	
	
	// 후기 가져오기
	@Override
	public List<Review> selectReview(int itemNo) {
		
		List<Review> review = new ArrayList<>();
		review = mapper.selectReview(itemNo);
		
		if(review == null) { // review없으면 null보내기
			return null;
			
		} else { // 있으면 review 보내기
			return review;
		}

	}
	
	
	// 차 추천 가져오기
	@Override
	public List<Car> selectRecommendCar(int itemNo) {
		
		return mapper.selectReccomendCar(itemNo);
	}

	// 차급 목록 가져오기
	@Override
	public List<String> selectCarGrade() {
		return mapper.selectCarGrade();
	}

	// 캠핑용품 카테고리 목록 가져오기
	@Override
	public List<String> selectEquipmentCategory() {
		return mapper.selectEquipmentCategory();
	}

}
