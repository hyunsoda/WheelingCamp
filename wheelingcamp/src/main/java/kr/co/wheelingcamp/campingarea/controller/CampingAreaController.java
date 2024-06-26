package kr.co.wheelingcamp.campingarea.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.wheelingcamp.campingarea.model.dto.CampingArea;
import kr.co.wheelingcamp.campingarea.model.service.CampingAreaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("campingArea")
public class CampingAreaController {

	private final CampingAreaService service;

	@GetMapping("test")
	public String test() {

		return "camparea/test";
	}

	@ResponseBody
	@GetMapping("urlThumbnail")
	public String urlThumbnail() {

		String url = "http://www.gumunsocamp.com";
		log.info("요청은 됬나?");

		try {
			URL requestUrl = new URL(url);
			HttpURLConnection urlConnection = (HttpURLConnection) requestUrl.openConnection();
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

			// log.info("성공");

			return resultUrl;

		} catch (Exception e) {
			System.out.println("요청 오류");
			System.out.println(e);
		}

		return "camparea/test";
	}

	@ResponseBody
	@GetMapping("deleteAll")
	public int deleteAll() {
		List<CampingArea> deleteList = new ArrayList<>();
		List<CampingArea> urlList = service.selectHompageAll();

		ExecutorService executor = Executors.newFixedThreadPool(10); // 스레드 풀 생성 (스레드 수는 필요에 따라 조정)

		for (CampingArea campArea : urlList) {
			executor.submit(() -> {
				try {
					URL requestUrl = new URL(campArea.getHomepage());
					HttpURLConnection urlConnection = (HttpURLConnection) requestUrl.openConnection();
					urlConnection.setRequestMethod("GET");
					urlConnection.setConnectTimeout(5000); // 연결 타임아웃 설정 (5초)
					urlConnection.setReadTimeout(5000); // 읽기 타임아웃 설정 (5초)

					int responseCode = urlConnection.getResponseCode();
					urlConnection.disconnect();

					if (responseCode != HttpURLConnection.HTTP_OK) {
						synchronized (deleteList) {
							deleteList.add(campArea);
						}
					}

				} catch (Exception e) {
					synchronized (deleteList) {
						deleteList.add(campArea);
					}
				}
			});
		}

		executor.shutdown();

		try {
			executor.awaitTermination(Long.MAX_VALUE, TimeUnit.NANOSECONDS);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		log.info("size : {}", deleteList.size());

		for (int i = 0; i < 20; i++) {
			deleteList.remove(deleteList.size() - 1);
		}

		int result = service.deleteAll(deleteList);

		return 1;
	}

	@ResponseBody
	@GetMapping("selectCampingAreaAll")
	public Map<String, Object> selectCampingArea(@RequestParam(value = "locationNo") int locationNo,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
		return service.selectCampingAreaAll(locationNo, cp);
	}

}
