package kr.co.wheelingcamp.manage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.wheelingcamp.manage.model.service.ManageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("manage")
public class ManageController {

	private final ManageService service;

	/**
	 * React 관리자 페이지 호출
	 * 
	 * @return
	 */
	@GetMapping("info")
	public String info() {

		String manageUrl = service.getUrl();

		log.info(manageUrl);

		return "redirect:" + manageUrl;
	}

	@ResponseBody
	@GetMapping("apiTest")
	public String getMethodName(@RequestParam("string") String param) {

		log.info("리액트 문자 :  {}", param);

		String test = "테스트 입니다.";

		return test;
	}

}
