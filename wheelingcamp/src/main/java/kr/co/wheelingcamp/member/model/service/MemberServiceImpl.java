package kr.co.wheelingcamp.member.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import kr.co.wheelingcamp.member.model.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

	private final MemberMapper mapper;
	
	// 카카오 로그인 restapi 앱키
	@Value("${login.kakao.rest_api}")
	private String kakaoRestApiKey;
	
	// 카카오 리다이렉트 uri
	@Value("${login.kakao.redirect_uri}")
	private String kakaoRedirectUri;
	
	// 구글 클라이언트 id
	@Value("${login.google.client_id}")
	private String googleClientId;
	
	// 구글 클라이언트 secret
	@Value("${login.google.client_secret}")
	private String googleClientSecret;
	
	// 구글 리다이렉트 uri
	@Value("${login.google.redirect_uri}")
	private String googleRedirectUri;

	// 카카오 로그인 페이지 이동
	@Override
	public String kakaoLoginUrl() {
		
		// 리다이렉트uri에 파라미터를 추가
		StringBuilder sb = new StringBuilder();
		
		sb.append("https://kauth.kakao.com/oauth/authorize?client_id=")
		.append(kakaoRestApiKey)
		.append("&redirect_uri=")
		.append(kakaoRedirectUri)
		.append("&response_type=code");

		return sb.toString();
	}

	// 카카오 토큰 발급
	@Override
	public String getKakaoToken(String code) {

		RestTemplate rt = new RestTemplate();
		
		// 요청 헤더 설정
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
		
		// 요청 본문 설정
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "authorization_code");
		params.add("client_id", kakaoRestApiKey);
		params.add("redirect_uri", kakaoRedirectUri);
		params.add("code", code);
		
		// 요청 헤더 + 본문
		HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = 
				new HttpEntity<>(params, headers);
		
		// 응답 본문 받기
		ResponseEntity<Map<String, String>> response = rt.exchange(
				"https://kauth.kakao.com/oauth/token",
				HttpMethod.POST,
				kakaoTokenRequest,
				new ParameterizedTypeReference<Map<String, String>>() {}
				);
		
		// 받은 응답 본문을 map으로 변환
		Map<String, String> responseBody = response.getBody();

		// 토큰 리턴
		return responseBody.get("access_token");
	}

	// 카카오 토큰으로 해당하는 유저의 정보를 받기
	@Override
	public Map<String, String> getKakaoUserInfo(String kakaoToken) {
		
		HashMap<String, String> userInfo = new HashMap<>();

		RestTemplate rt = new RestTemplate();
		
		// 요청 헤더
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + kakaoToken);
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
		
		// 요청 헤더를 오브젝트에 담기
		HttpEntity<MultiValueMap<String, String>> kakaoUserInfoRequest = 
				new HttpEntity<>(headers);
		
		// POST 방식으로 요청하기
		ResponseEntity<Map<String, Object>> response = rt.exchange(
				"https://kapi.kakao.com/v2/user/me",
				HttpMethod.POST,
				kakaoUserInfoRequest,
				new ParameterizedTypeReference<Map<String, Object>>() {}
				);
		
		// 요청 본문을 responseBody에 저장
		Map<String, Object> responseBody = response.getBody();
		
		// 요청 본문 안에 JSON으로 저장된 properties를 한번 더 user라는 map에 저장
		Map<String, String> user = (Map<String, String>) responseBody.get("properties");

		// userInfo에 고유키(id), 닉네임, 프로필 이미지 저장
		userInfo.put("id", String.valueOf(responseBody.get("id")));
		userInfo.put("nickname", user.get("nickname"));
		userInfo.put("profile_image", user.get("profile_image"));

		return userInfo;
	}

	// 구글 로그인 페이지 이동
	@Override
	public String googleLoginUrl() {

		// 리다이렉트uri에 파라미터를 추가
		StringBuilder sb = new StringBuilder();
		
		sb.append("https://accounts.google.com/o/oauth2/v2/auth?client_id=")
		.append(googleClientId)
		.append("&redirect_uri=")
		.append(googleRedirectUri)
		.append("&response_type=code&scope=email profile");

		return sb.toString();
	}

	// 구글 토큰 발급
	@Override
	public String getGoogleToken(String code) {
		
		RestTemplate rt = new RestTemplate();
		
		HttpHeaders headers = new HttpHeaders();
		
		// 요청 본문 설정
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "authorization_code");
		params.add("client_id", googleClientId);
		params.add("client_secret", googleClientSecret);
		params.add("code", code);
		params.add("redirect_uri", googleRedirectUri);
		
		// 요청 헤더 + 본문으로 오브젝트 생성
		HttpEntity<MultiValueMap<String, String>> googleTokenRequest = 
				new HttpEntity<>(params, headers);
		
		// 응답 본문 받기
        ResponseEntity<Map<String, Object>> response = rt.exchange(
                "https://oauth2.googleapis.com/token",
                HttpMethod.POST,
                googleTokenRequest,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );

        // 받은 응답 본문을 map으로 변환
        Map<String, Object> responseBody = response.getBody();
		
        // 토큰 리턴
        return (String)responseBody.get("access_token");
	}

	
	// 구글 토큰으로 해당하는 유저의 정보를 받기
	@Override
	public Map<String, String> getGoogleUserInfo(String googleToken) {
		
		HashMap<String, String> userInfo = new HashMap<>();

		RestTemplate rt = new RestTemplate();
		
		HttpHeaders header = new HttpHeaders();
		header.add("Authorization", "Bearer " + googleToken);
		
		
		HttpEntity<MultiValueMap<String, String>> googleUserRequest = 
				new HttpEntity<>(header);
		
		 ResponseEntity<Map<String, String>> googleUserInfo = rt.exchange(
				"https://www.googleapis.com/oauth2/v2/userinfo",
				HttpMethod.GET,
				googleUserRequest,
				new ParameterizedTypeReference<Map<String, String>>() {}
				);
		 
		 Map<String, String> responseBody = googleUserInfo.getBody();
		 
		 userInfo.put("id", responseBody.get("id"));
		 userInfo.put("email", responseBody.get("email"));
		 userInfo.put("profile_image", responseBody.get("picture"));
		 userInfo.put("name", responseBody.get("name"));
		
		return userInfo;
	}
	
}
