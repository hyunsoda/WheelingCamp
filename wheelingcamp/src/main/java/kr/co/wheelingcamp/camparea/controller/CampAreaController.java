package kr.co.wheelingcamp.camparea.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("camparea")
@Slf4j
public class CampAreaController {

	@GetMapping("test")
	public String test() {

		return "camparea/test";
	}

	@ResponseBody
	@GetMapping("urlThumbnail")
	public String urlThumbnail() {

		String url = "http://www.yangchoncamp.co.kr/";

		try {
			URL requestUrl = new URL(url);
			HttpsURLConnection urlConnection = (HttpsURLConnection) requestUrl.openConnection();
			urlConnection.setRequestMethod("GET");

			BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
			String line = null;
			String resultUrl = null;
			while ((line = br.readLine()) != null) {
				if (line.indexOf("og:image") != -1) {

					String trimLine = line.trim();

					resultUrl = trimLine.substring(trimLine.indexOf("content=\"") + 9, trimLine.lastIndexOf("\""));

				}
			}

			br.close();
			urlConnection.disconnect();

			
			
			return resultUrl;

		} catch (Exception e) {
			System.out.println("요청 오류");
			System.out.println(e);
		}

		return "camparea/test";
	}
}
