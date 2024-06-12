package kr.co.wheelingcamp.manage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.wheelingcamp.manage.model.service.ManageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("manage")
public class ManageController {

	private final ManageService service;

	@GetMapping("info")
	public String info() {

		String manageUrl = service.getUrl();

		return "redirect:" + manageUrl;
	}

}
