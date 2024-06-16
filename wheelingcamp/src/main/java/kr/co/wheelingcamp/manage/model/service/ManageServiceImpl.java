package kr.co.wheelingcamp.manage.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import kr.co.wheelingcamp.manage.model.mapper.ManageMapper;
import kr.co.wheelingcamp.member.model.dto.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ManageServiceImpl implements ManageService {

	private final ManageMapper mapper;

	// config.propertis에서 관리자용 주소
	@Value("${manage.user.url}")
	private String manageUrl;

	// 관리자용 주소 가져오기
	@Override
	public String getUrl() {
		return manageUrl;
	}

	@Override
	public List<Member> selectAllMember() {
		return mapper.selectAllMember();
	}

	@Override
	public int updateMember(Member member) {
		return mapper.updateMember(member);
	}

	@Override
	public int latestMemberNo() {
		return mapper.latestMemberNo();
	}

//	@Override
//	public Map<String, Object> selectAllItem(Map<String, Object> map) {
//
//		// 페이지네이션용 전체 상품 개수 탐색
//		int listCount = mapper.getItemCount(map);
//
//		// 페이지네이션 설정
//		Pagination pagination = new Pagination((int) map.get("cp"), listCount, limit, pageSize);
//		int offset = ((int) map.get("cp") - 1) * limit;
//
//		RowBounds rowBounds = new RowBounds(offset, limit);
//
//		Map<String, Object> resultMap = new HashMap<>();
//
//		switch ((int) map.get("categoryCode")) {
//		case 0: // 전체 목록 호출
//
//			break;
//		case 1: // 자동차 목록 호출
//			resultMap.put("itemList", mapper.selectCarAll(map, rowBounds));
//			break;
//		case 2: // 캠핑용품 목록 호출
//			resultMap.put("itemList", mapper.selectCampEquipmentAll(map, rowBounds));
//			break;
//		case 3: // 패키지 목록 호출
//			resultMap.put("itemList", mapper.selectPackageAll(map, rowBounds));
//			break;
//		}
//
//		resultMap.put("pagination", pagination);
//
//		return resultMap;
//	}

}
