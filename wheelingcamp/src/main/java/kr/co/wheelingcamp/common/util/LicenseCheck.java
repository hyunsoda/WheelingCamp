package kr.co.wheelingcamp.common.util;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import kr.co.wheelingcamp.member.model.dto.Member;
import kr.co.wheelingcamp.mypage.model.service.MyPageService;
import lombok.RequiredArgsConstructor;
@SessionAttributes({ "loginMember"})
@RestController
@RequestMapping("validateLicense")
@RequiredArgsConstructor
@PropertySource("classpath:/config.properties")
public class LicenseCheck {

	@Value("${naver.clova.ocr.url}")
	private String apiURL;

	@Value("${naver.clova.ocr.secret}")
	private String secretKey;

	private final MyPageService myPageService;
	
	@PostMapping("uploadImage")
	public ResponseEntity<?> sendRequest(@RequestPart("image") MultipartFile image) throws JSONException, IOException {
		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-type", "multipart/form-data");
		headers.add("X-OCR-SECRET", secretKey);

		JSONObject json = new JSONObject();
		json.put("version", "V2");
		json.put("requestId", UUID.randomUUID().toString());
		json.put("timestamp", System.currentTimeMillis());
		
		
		JSONObject imageJson = new JSONObject();
		imageJson.put("format", "jpg");
		imageJson.put("name", "demo");
		
		JSONArray template = new JSONArray();
		template.put(30441);
		imageJson.put("templateIds", template);
		
		JSONArray images = new JSONArray();
		images.put(imageJson);
		json.put("images", images);
		
		
		LinkedMultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
		params.add("message", json.toString());

		File tempFile = File.createTempFile("upload", "tmp");
		image.transferTo(tempFile);
		params.add("file", new FileSystemResource(tempFile));

		HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(params, headers);

		return restTemplate.exchange(apiURL, HttpMethod.POST, requestEntity, String.class);
	}
	
	/**운전면허 데이터 insert
	 * @param loginMember
	 * @param map
	 * @param ra
	 * @param status
	 * @return
	 */
	@PostMapping("insertLicenseData")
	public ResponseEntity<String> insertLicenseData(@SessionAttribute("loginMember")Member loginMember,@RequestBody Map<String, Object> map,RedirectAttributes ra) {
		
		int memberNo = loginMember.getMemberNo();
		map.put("memberNo",memberNo);
		
		if (loginMember == null) { // 세션은 존재하지만 로그인한 회원은 존재하지 않을 경우
			ra.addFlashAttribute("message", "로그인한 유저가 존재하지 않습니다");

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오류");
		}
		
		int result = myPageService.insertLicenseData(map);
	
		if(result == 0) {
			ra.addFlashAttribute("message", "실패");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오류");
		}


		ra.addFlashAttribute("message", "성공적으로 탈퇴가 완료되었습니다");

				
		
		return ResponseEntity.ok("성공");
	}
}