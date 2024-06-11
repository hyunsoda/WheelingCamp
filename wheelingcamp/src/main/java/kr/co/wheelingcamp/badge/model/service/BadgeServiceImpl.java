package kr.co.wheelingcamp.badge.model.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.wheelingcamp.badge.model.mapper.BadgeMapper;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class BadgeServiceImpl implements BadgeService{

	private final BadgeMapper mapper;
}
