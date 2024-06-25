package kr.co.wheelingcamp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.CrossOrigin;

@EnableScheduling
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@CrossOrigin(origins = "https://wheelingcamp-manager.vercel.app/")
public class WheelingcampApplication {

	public static void main(String[] args) {
		SpringApplication.run(WheelingcampApplication.class, args);
	}

}
