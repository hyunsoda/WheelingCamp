package kr.co.wheelingcamp.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class MainController {

	@RequestMapping("/")
	public String home() {
		return "sampleJJ";
		
	}

}
