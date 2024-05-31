package kr.co.wheelingcamp.auth.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.ISpringTemplateEngine;

import groovy.util.logging.Slf4j;
import jakarta.mail.internet.MimeMessage;
import kr.co.wheelingcamp.auth.model.mapper.AuthMapper;
import kr.co.wheelingcamp.common.util.CreateAuthKey;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService{

	private final AuthMapper mapper;
	
	// 메일 객체
	private final JavaMailSender mailSender;
	
	private final ISpringTemplateEngine templateEngine;
	
	// 이메일 인증번호 발급
		@Override
		public int sendEmail(String html, String email) {
			
			CreateAuthKey createAuthKey = new CreateAuthKey();
			String authKey =  createAuthKey.createAuthKey();
			
			
			try {
				MimeMessage mail = mailSender.createMimeMessage();
				
				MimeMessageHelper helper = new MimeMessageHelper(mail, true, "UTF-8");
				
				
				
				helper.setTo(email); // 받는 사람 이메일
				helper.setSubject("[WheelingCamp] 인증번호"); // 이메일 제목
				helper.setText( loadHtml(authKey, html), true);
				
				mailSender.send(mail);
				
				
			}catch(Exception e) {
				e.printStackTrace();
				return 0;
			}
			
			Map<String, String> map = new HashMap<>();
			map.put("authKey", authKey);
			map.put("email", email);
			
			int result = mapper.updateAuthKey(map);
			
			if(result == 0) {
				result = mapper.insertAuthkey(map);
			}
			
			if(result == 0) return 0;
			
			return 1;
		}
		
		// HTML 파일을 읽어와 String 으로 변환
		private String loadHtml(String authKey, String html) {
			
			Context context = new Context();
			
			context.setVariable("authKey", authKey);
			
			return templateEngine.process("email/" + html, context);
		}

		// 인증번호 확인하기
		@Override
		public int checkAuth(Map<String, String> userInfo) {

			return mapper.checkAuth(userInfo);
		}

	
}
