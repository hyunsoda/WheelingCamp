package kr.co.wheelingcamp.common.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class MainController {
	
	@RequestMapping("/")
	public String home() {
		return "pages/home";
	}


}
	