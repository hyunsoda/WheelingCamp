package kr.co.wheelingcamp.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

//	@Override
//	public void addCorsMappings(CorsRegistry registry) {
////		registry.addMapping("/**")
////				.allowedOrigins("origin", "http://localhost:3000", "https://wheelingcamp-manager.vercel.app",
////						"http://localhost:80")
////				.allowedMethods("GET", "POST", "PUT", "DELETE").allowedHeaders("*").allowCredentials(true);
//
//		registry.addMapping("/**").allowedOriginPatterns("*").allowedMethods("*").allowedHeaders("*")
//				.allowCredentials(true).maxAge(3600);
//		;
//
//	}

}