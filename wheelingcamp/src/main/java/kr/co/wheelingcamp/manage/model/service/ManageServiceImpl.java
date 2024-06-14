package kr.co.wheelingcamp.manage.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

	// 회원 전체 목록 가져오기
	@Override
	public List<Member> selectAllMember(int sortNo) {
		return mapper.selectAllMember(sortNo);
	}

	// 회원 한 명 조회하기
	@Override
	public Member selectOneMember(String memberNo) {
		return mapper.selectOneMember(memberNo);
	}

	// ---------------------------------------------------------------------
	// -------------------------------------------------------------------------------------------

	@Override
	public Map<String, Object> selectAllItem(int categoryCode) {

		Map<String, Object> resultMap = new HashMap<>();

		switch (categoryCode) {
		case 0: // 전체 목록 호출

			break;
		case 1: // 자동차 목록 호출
			resultMap.put("itemList", mapper.selectCarAll());
			break;
		case 2: // 캠핑용품 목록 호출
			resultMap.put("itemList", mapper.selectCampEquipmentAll());
			break;
		case 3: // 패키지 목록 호출
			resultMap.put("itemList", mapper.selectPackageAll());
			break;
		}

		return resultMap;
	}

	// -------------------------------------------------------------------------------------------
}
