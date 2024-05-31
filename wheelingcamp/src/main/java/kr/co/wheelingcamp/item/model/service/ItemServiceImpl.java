package kr.co.wheelingcamp.item.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.wheelingcamp.item.model.dto.Car;
import kr.co.wheelingcamp.item.model.dto.Item;
import kr.co.wheelingcamp.item.model.mapper.ItemMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class ItemServiceImpl implements ItemService {

	private final ItemMapper mapper;

	// 상품 하나 가져오기
	@Override
	public Item selectOne(int categoryCode, int itemNo) {
		
		Item item = null;
		
		if(categoryCode == 1) { // 차인 경우
			
			item = mapper.selectOneCar(itemNo);
      
		} else if (categoryCode == 2) { // 캠핑용품인 경우
			
			item = mapper.selectOneEquipment(itemNo);
			
		} else { // 패키지인 경우
			
			// item = mapper.selectOnePackage(itemNo);
		}

		return item;
	}

	@Override
	public List<Item> selectCategoryAll(Map<String, Object> map) {

		List<Item> itemList = null;

		switch ((int) map.get("categoryCode")) {
		case 1: // 자동차 목록 호출
			itemList = new ArrayList<>(mapper.selectCarAll(map));
			break;
		case 2: // 캠핑용품 목록 호출
			itemList = new ArrayList<>(mapper.selectCampEquipmentAll(map));
			break;
		case 3: // 패키지 목록 호출
			itemList = new ArrayList<>(mapper.selectPackageAll(map));
			break;
		}

		return itemList;
	}
}
