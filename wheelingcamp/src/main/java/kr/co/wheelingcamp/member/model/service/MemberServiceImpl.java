package kr.co.wheelingcamp.member.model.service;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.wheelingcamp.member.model.dto.Member;
import kr.co.wheelingcamp.member.model.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

	private final MemberMapper mapper;

	// 네이버 클라이언트 ID
    @Value("${naver.client_id}")
    private String naverClientId;
    
    // 네이버 클라이언트 redirect_uri
    @Value("${naver.redirect_uri}")
    private String naverRedirectUri;
    
    // 네이버 클라리언트 secret
    @Value("${naver.client_secret}")
    private String naverClientSecret;
    
 

    
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
			
			loginMember = mapper.naverLoginMember(map);
			return loginMember;
			
		} else { // 아이디가 없는 경우 회원가입 진행
			
			int signUpResult = mapper.naverSignUp(map);
			
			
			if(signUpResult == 0) { // 회원가입 실패
				
				return null;
				
			} else { // 회원가입 성공인 경우 로그인진행
				
				loginMember = mapper.naverLoginMember(map);
				return loginMember;
			}
			
		}
	}
	
}
