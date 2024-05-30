package kr.co.wheelingcamp.item.model.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.wheelingcamp.item.model.mapper.ItemMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class ItemServiceImpl implements ItemService {

	private final ItemMapper mapper;

}
