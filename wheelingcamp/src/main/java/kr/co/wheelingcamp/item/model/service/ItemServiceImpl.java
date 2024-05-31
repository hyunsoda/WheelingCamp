package kr.co.wheelingcamp.item.model.service;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
		
		Item item = new Item();
		
		if(categoryCode == 1) { // 차인 경우
			
			item = mapper.selectOneCar(itemNo);
			
		} else if (categoryCode == 2) { // 캠핑용품인 경우
			return null;
		} else { // 패키지인 경우
			return null;
		}
		
		return item;
	}
	
}
