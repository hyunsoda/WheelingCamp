package kr.co.wheelingcamp.campingarea.model.service;

import org.springframework.stereotype.Service;

import kr.co.wheelingcamp.campingarea.model.mapper.CampingAreaMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CampingAreaServiceImpl implements CampingAreaService {

	private final CampingAreaMapper mapper;
}
