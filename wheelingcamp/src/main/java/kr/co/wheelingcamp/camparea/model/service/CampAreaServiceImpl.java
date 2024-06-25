package kr.co.wheelingcamp.camparea.model.service;

import org.springframework.stereotype.Service;

import kr.co.wheelingcamp.camparea.model.mapper.CampAreaMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CampAreaServiceImpl implements CampAreaService{

	private final CampAreaMapper mapper;
}
