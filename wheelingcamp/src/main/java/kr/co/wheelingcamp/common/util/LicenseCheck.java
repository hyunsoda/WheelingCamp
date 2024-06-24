package kr.co.wheelingcamp.common.util;

import java.io.File;
import java.io.IOException;
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
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("validateLicense")
@PropertySource("classpath:/config.properties")
public class LicenseCheck {

	@Value("${naver.clova.ocr.url}")
	private String apiURL;

	@Value("${naver.clova.ocr.secret}")
	private String secretKey;

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
}