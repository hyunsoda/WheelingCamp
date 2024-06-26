package kr.co.wheelingcamp.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

	@RequestMapping("/")
	public String home() {
		return "pages/home";
	}

	@GetMapping("/aiRecomm")
	public String aiRecomm() {
		return "pages/aiRecomm";
	}
	
	@GetMapping("/licenseTest")
	public String licenseTest() {
		return "licenseTest";
	}
	
	@GetMapping("/terms/personalTerms")
	public String personalTerms() {
		return "terms/personalTerms";
	}
	
	@GetMapping("/terms/webSiteTerms")
	public String webSiteTerms() {
		return "terms/webSiteTerms";
	}

}
