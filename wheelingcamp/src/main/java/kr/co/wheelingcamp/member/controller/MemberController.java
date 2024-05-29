package kr.co.wheelingcamp.member.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.wheelingcamp.member.model.dto.Member;
import kr.co.wheelingcamp.member.model.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@SessionAttributes({"loginMember"})
@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("member")
public class MemberController {

	private final MemberService service;
	
	
	
	/** 로그인 페이지 redirect
	 * @return
	 */
	@GetMapping("login")
	public String loginView() {
		return "member/login";
	}
	
	/** 로그인 페이지 redirect
	 * @return
	 */
	@GetMapping("signUp")
	public String signUpView() {
		return "member/signUp";
	}
	
	@PostMapping("signup")
	public String postMethodName() {
		//TODO: process POST request
		
		return "";
	}
	
	
	/** 네이버 로그인 페이지 redirect
	 * @return naverLoginUrl
	 */
	@GetMapping("loginNaver")
	public String loginNaverView(HttpServletRequest request) {
		
		String naverLoginUrl = service.naverLoginUrl(request);
		
		return "redirect:" + naverLoginUrl;
	}
	
	
	/** 네이버 로그인 callBack
	 * @return
	 */
	@GetMapping("naverCallBack")
	public String naverCallBack(HttpServletRequest request, RedirectAttributes ra, Model model) {
		
		// 네이버에서 전달받은 code, state값 가져오기
		String code = request.getParameter("code");
		String state = request.getParameter("state");
		
		// 세션에 저장해둔 state값 가져오기
		String sessionState = request.getSession().getAttribute("state").toString();
		
		
		// CSRF 공격 방지를 위해 state 값 비교하기
		if(!state.equals(sessionState)) {
			request.getSession().removeAttribute("state");
			return "redirect:/";
		}
		
		
		// 기본 tokenURL 주소 
		String tokenUrl = "https://nid.naver.com/oauth2.0/token";
		
		// body data 생성
		MultiValueMap<String, String> parameter = service.naverTockenUrl(code, state);
		
		
		// request header 설정하기
		HttpHeaders headers = new HttpHeaders();
		
		// Content-type 설정
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
		
		// header와 body로 Request 생성
		HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(parameter,headers);
		
		
		try {
			
			RestTemplate restTemplate = new RestTemplate();
			
			// 응답 데이터(json)을 Map으로 받을 수 있도록 관련 메시지 컨버터 추가하기
			restTemplate.getMessageConverters().add(new StringHttpMessageConverter());
			
			// Post 방식으로 Http 요청하기
			// 응답 데이터 형식은 Hashmap
			ResponseEntity<HashMap> result = restTemplate.postForEntity(tokenUrl, entity, HashMap.class);
			
			// result의 body 꺼내오기
			Map<String, String> resMap = result.getBody();
			
			// accessToken 가져오기
			String accessToken = resMap.get("access_token");
			
			
			// userinfo 가져오는 base url
			String userInfoUrl = "https://openapi.naver.com/v1/nid/me";
			
			// Header에 accessToken 삽입
			headers.set("Authorization", "Bearer "+accessToken);
			
			// Request entity 생성하기
			HttpEntity<?> userInfoEntity = new HttpEntity<>(headers);
			
			
			// Post 방식으로 Http 요청
			// 응답 데이터 형식은 Hashmap
			ResponseEntity<HashMap> userResult = restTemplate.postForEntity(userInfoUrl, userInfoEntity,HashMap.class);
			Map<String, Map<String, String>> userResultMap = userResult.getBody();
			
			
			// Member 객체에 값 세팅해서 회원가입 or 로그인 수행하기
			Member naverMember = service.naverLogin(userResultMap.get("response"));
			
			// 로그인 실패인 경우
			if(naverMember == null) {
				
				String message = "회원가입 실패";
				ra.addFlashAttribute("message", message);
				
				return "member/login";
				
			} 
			
			// session scope에 loginMember 넣기
			model.addAttribute("loginMember", naverMember);
			
			// 세션에 저장된 state값 삭제
			request.getSession().removeAttribute("state");
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return "member/loginComplete";
	}
	

	
	
	
}
