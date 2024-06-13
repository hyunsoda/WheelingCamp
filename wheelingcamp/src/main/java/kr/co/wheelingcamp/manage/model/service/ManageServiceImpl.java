package kr.co.wheelingcamp.manage.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import kr.co.wheelingcamp.manage.model.mapper.ManageMapper;
import kr.co.wheelingcamp.member.model.dto.Member;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ManageServiceImpl implements ManageService {

	private final ManageMapper mapper;

   private static final int limit = 10; // 한 페이지 목록에 보여지는 상품 수
   private static final int pageSize = 10; // 보여질 페이지 번호 개수
	   
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
	
	//---------------------------------------------------------------------
}
