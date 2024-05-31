package kr.co.wheelingcamp.item.model.service;

import java.util.List;

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
