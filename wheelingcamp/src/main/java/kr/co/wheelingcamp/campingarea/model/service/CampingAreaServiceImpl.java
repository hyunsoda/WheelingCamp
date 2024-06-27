package kr.co.wheelingcamp.campingarea.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import kr.co.wheelingcamp.campingarea.model.dto.CampingArea;
import kr.co.wheelingcamp.campingarea.model.mapper.CampingAreaMapper;
import kr.co.wheelingcamp.common.util.Pagination;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CampingAreaServiceImpl implements CampingAreaService {

	private final CampingAreaMapper mapper;

	private static int limit = 10;
	private static int pageSize = 10;

	private String locationList[] = { "전국", "서울", "경기", "인천", "강원", "충청남도", "대전", "충청북도", "세종", "부산", "울산", "대구",
			"경상북도", "경상남도", "전라남도", "광주", "전라북도", "제주" };

	@Override
	public List<CampingArea> selectHompageAll() {
		return mapper.selectHompageAll();
	}

	@Override
	public int deleteAll(List<CampingArea> deleteList) {
		return mapper.deleteAll(deleteList);
	}

	@Override
	public Map<String, Object> selectCampingAreaAll(int locationNo, int cp) {

		int listCount = mapper.getListCount(locationList[locationNo]);

		Pagination pagination = new Pagination(cp, listCount, limit, pageSize);

		int offset = (cp - 1) * limit;
		RowBounds rowBounds = new RowBounds(offset, limit);

		Map<String, Object> map = new HashMap<>();
		map.put("campingAreaList", mapper.selectCampingAreaAll(locationNo, rowBounds));
		map.put("pagination", pagination);

		return map;
	}
}
