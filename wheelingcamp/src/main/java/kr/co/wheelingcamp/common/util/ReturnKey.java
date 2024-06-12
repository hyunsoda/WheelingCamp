package kr.co.wheelingcamp.common.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("returnKey")
@PropertySource("classpath:/config.properties")
public class ReturnKey {

	// ChatGPT API Key
	@Value("${util.chat-gpt.key}")
	private String chatGPTKey;
	

	/**
	 * Chat GPT API 인증번호 반환
	 * 
	 * @return
	 */
	@GetMapping("chatGPTKey")
	@ResponseBody
	public String chatGPT() {

		return chatGPTKey;
	}
	
	
	

}
