package kr.co.wheelingcamp.common.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;

import jakarta.annotation.PostConstruct;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Controller
@Configuration
@PropertySource("classpath:/config.properties")
public class SmsUtil {
	// 인증 API Key
	@Value("${util.coolsms.key}")
	private String apiKey;
	// 인증 API Secret
	@Value("${util.coolsms.secret}")
	private String apiSecret;

	private DefaultMessageService messageService;

	@PostConstruct // 의존성 주입전 실행되는 코드
	private void init() {
		this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
	}

	// 단일 메시지 발송 예제
	/**
	 * 문자로 인증번호 1회 발송
	 * 
	 * @param to               : 송신 전화번호
	 * @param verificationCode : 인증번호
	 * @return
	 */
	public SingleMessageSentResponse sendOne(String to, String verificationCode) {
		Message message = new Message();

		// 발신번호 및 수신번호는 반드시 01012345678 형태로 입력.
		message.setFrom("01038070614"); // 발송 번호
		message.setTo(to); // 송신 번호
		message.setText("[WheelingCamp] 인증번호는\n[" + verificationCode + "] 입니다"); // 인증번호 출력

		SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
		return response;
	}
}
