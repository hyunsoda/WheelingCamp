package kr.co.wheelingcamp.common.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;

import jakarta.annotation.PostConstruct;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

@PropertySource("classpath:/config.properties")
public class SmsUtil {
	// 인증 API Key
	@Value("${util.coolsms.key}")
	private String apiKey;
	// 인증 API Secret
	@Value("${util.coolsms.secret}")
	private String apiSecret;

	private DefaultMessageService messageService;

	@PostConstruct // 의존성 주입 후 초기화하는 메서드
	private void init() {
		this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
	}

	// 단일 메시지 발송 예제
	public SingleMessageSentResponse sendOne(String to, String verificationCode) {
		Message message = new Message();
		// 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
		message.setFrom("01012341234");
		message.setTo(to);
		message.setText("안녕?\n" + verificationCode);

		SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
		return response;
	}
}
