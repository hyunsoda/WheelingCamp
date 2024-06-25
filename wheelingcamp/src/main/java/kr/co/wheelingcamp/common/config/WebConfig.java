package kr.co.wheelingcamp.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("https://wheelingcamp-manager.vercel.app",
				"https://wheelingcamp.store", "http://3.36.201.18", "http://localhost:3000")
				.allowedMethods("GET", "POST", "PUT", "DELETE");

	}

}