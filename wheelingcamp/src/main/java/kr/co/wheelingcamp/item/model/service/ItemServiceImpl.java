package kr.co.wheelingcamp.item.model.service;

import java.util.Map;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.wheelingcamp.item.model.dto.Car;
import kr.co.wheelingcamp.item.model.dto.Item;
import kr.co.wheelingcamp.item.model.mapper.ItemMapper;
import lombok.RequiredArgsConstructor;

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
	public List<Item> selectCategoryAll(int categoryCode) {

		List<Item> itemList = null;

		switch (categoryCode) {
		case 1:
			itemList = mapper.selectCarAll();
			break;
		case 2:
			itemList = mapper.selectCampEquipmentAll();
			break;
		case 3:
			itemList = mapper.selectPackageAll();
			break;
		}

		return itemList;
	}
}
