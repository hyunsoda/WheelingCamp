package kr.co.wheelingcamp.common.util;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class LicenseCheck {

		@GetMapping("/licenseTest2")
		@ResponseBody
		public String checkLicense(String code) {

			RestTemplate rt = new RestTemplate();

			// 요청 헤더 설정
			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-type", "application/json");
			headers.add("X-OCR-SECRET", "eEh3bWJCY3hMdnhjWVd1TFB0VlRvaVhYTUlhSklTUms=");

			// 요청 본문 설정
			MultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
			  
			Map<String, Object> image = new HashMap<>();
	        image.put("format", "png");
	        image.put("name", "medium");
	        image.put("data", null);
	        image.put("url", "https://image.ajunews.com/content/image/2023/06/07/20230607083035644114.jpg");
	        
	        params.add("images", Collections.singletonList(image));
			params.add(" lang", "ko");
			params.add("requestId", "string");
			params.add("resultType", "string");
			params.add("timestamp","{{$timestamp}}");
			params.add("version", "V1");

			// 요청 헤더 + 본문
			HttpEntity<MultiValueMap<String, Object>> checkLicense = new HttpEntity<>(params, headers);

			// 응답 본문 받기
			ResponseEntity<Map<String, Object>> response = rt.exchange("https://4wekbqwdra.apigw.ntruss.com/custom/v1/32001/d60df6998b195d6ffc6633b8c21e2f14aa40541587e24702a19db4f4fbde87de/general?=",
					HttpMethod.POST, checkLicense, new ParameterizedTypeReference<Map<String, Object>>() {
					});

			// 받은 응답 본문을 map으로 변환
			Map<String, Object> responseBody = response.getBody();
			log.info("responseBody",responseBody.toString());
			// 토큰 리턴
			return "";
		}
}
