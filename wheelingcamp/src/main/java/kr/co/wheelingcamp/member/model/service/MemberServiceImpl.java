package kr.co.wheelingcamp.member.model.service;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import kr.co.wheelingcamp.member.model.dto.Member;
import kr.co.wheelingcamp.member.model.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

	private final MemberMapper mapper;

  // 암호화 객체
  private final BCryptPasswordEncoder bcrypt;

	// 네이버 클라이언트 ID
    @Value("${naver.client_id}")
    private String naverClientId;
    
    // 네이버 클라이언트 redirect_uri
    @Value("${naver.redirect_uri}")
    private String naverRedirectUri;
    
    // 네이버 클라리언트 secret
    @Value("${naver.client_secret}")
    private String naverClientSecret;

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

    
	// 네이버 로그인 인가코드 요청
	@Override
	public String naverLoginUrl(HttpServletRequest request) {
		
		StringBuilder sb = new StringBuilder();
		
		// state값 설정
		String state = generateState();
		
		// naverLoginUrl  공통 부분
		String baseUrl = "https://nid.naver.com/oauth2.0/authorize?response_type=code";
		
		// naverLoginUrl 조립
		sb.append(baseUrl);
	    sb.append("?response_type=code");
	    sb.append("&client_id=" + naverClientId);
	    sb.append("&redirect_uri=" + naverRedirectUri);
	    sb.append("&state=" + state);
		
		
	    // 세션에 state 저장
	    request.getSession().setAttribute("state", state);
	    
		log.debug("state 값 확인" + state);
		return sb.toString();
	}
	
	// 네이버 state 랜덤값 얻어오기 
    public String generateState(){
        SecureRandom random = new SecureRandom();
        return new BigInteger(130, random).toString(32);
    }
	
    // 네이버 tocken 얻어오기 위한 body data 생성
	@Override
	public MultiValueMap<String, String> naverTockenUrl(String code, String state) {
		
		// body data 생성하기
		MultiValueMap<String, String> parameter = new LinkedMultiValueMap<>();
		parameter.add("grant_type", "authorization_code");
	    parameter.add("client_id", naverClientId);
	    parameter.add("client_secret", naverClientSecret);
	    parameter.add("code", code);
	    parameter.add("state", state);
		
		return parameter;
	}
	
	// 네이버 로그인 수행하기 
	@Override
	public Member naverLogin(Map<String, String> map) {
		
		// 아이디 중복 검사하기 
		String checkId = "naver" + map.get("id");
		int result = mapper.checkId(checkId);
		
		// map에 "naver"를 붙인 새로운 아이디 넣어주기
		map.put("checkId", checkId);
		
		// 전화번호 형식 수정 "- 부분 없애기"
		String PhoneNumber = (map.get("mobile").toString()).replaceAll("-", "");
        map.put("fixPhoneNumber", PhoneNumber);
		
        // 생년월일 형식 수정 "-부분 없애고 년도, 월일 이어붙이기"
        String monthDay = map.get("birthday").replaceAll("-", "");
        String fixBirthday = (map.get("birthyear") + monthDay);
        map.put("fixBirthday", fixBirthday);
        
        Member loginMember = null;
		
		// 아이디가 존재할 경우 로그인 진행
		if(result > 0) {
			
			loginMember = mapper.naverLoginMember(checkId);
			return loginMember;
			
		} else { // 아이디가 없는 경우 회원가입 진행
			
			int signUpResult = mapper.naverSignUp(map);
			
			
			if(signUpResult == 0) { // 회원가입 실패
				
				return null;
				
			} else { // 회원가입 성공인 경우 로그인진행
				
				loginMember = mapper.naverLoginMember(checkId);
				return loginMember;
			}
			
		}
	}

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

	// 일반 회원가입
	@Override
	public int signUp(Member member) {
		
		// 입력받은 비밀번호를 암호화한 문자열
		String bcryptPassword = bcrypt.encode(member.getMemberPw());
		
		// 입력 회원 정보의 비밀번호를 암호화 후 입력
		member.setMemberPw(bcryptPassword);
		
		return mapper.signUp(member);
	}

	// 카카오, 구글 로그인
	@Override
	public Member kakaoGoogleLogin(Map<String, String> userInfo, String snsName) {

		// 아이디 중복 검사
		
		String checkId = null;
		if(snsName.equals("kakao")) {
			checkId = "kakao" + userInfo.get("id");
		}else {
			checkId = "google" + userInfo.get("id");
		}
		
		userInfo.put("checkId", checkId);
		int result = mapper.checkId(checkId);
		
		Member loginMember = null;
		
		// 아이디가 존재할 경우 -> 로그인
		if(result > 0) {
			
			loginMember = mapper.naverLoginMember(checkId);
			
			return loginMember;
			
		}else { // 아이디가 존재하지 않는 경우 -> 회원가입
			
			// 회원가입 성공 유무 변수(1 - 성공)(0 - 실패)
			// 카카오로 회원 가입 할 시에는 고유키(id), 닉네임, 프로필 이미지를 넣어준다
			
			int signUp;
			
			if(snsName.equals("kakao")) {
				signUp = mapper.kakaoSignUp(userInfo);
			}else {
				signUp = mapper.googleSignUp(userInfo);
			}
			
			
			// 회원가입 성공하면 로그인
			if(signUp > 0) {
				
				////////////////////// 여기 고치기
				loginMember = mapper.naverLoginMember(checkId);
				return loginMember;
				
			}
			
		}
		
		return loginMember;
	}
	
}
