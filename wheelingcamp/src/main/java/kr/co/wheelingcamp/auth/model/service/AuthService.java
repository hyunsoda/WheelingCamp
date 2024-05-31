package kr.co.wheelingcamp.auth.model.service;

import java.util.Map;

public interface AuthService {

	/** 이메일 인증번호 발급
	 * @param string
	 * @param email
	 * @return
	 */
	int sendEmail(String string, String email);

	/** 인증번호가 맞는지 확인
	 * @param userInfo
	 * @return
	 */
	int checkAuth(Map<String, String> userInfo);
	
}
