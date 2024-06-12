package kr.co.wheelingcamp.manage.model.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

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

}
