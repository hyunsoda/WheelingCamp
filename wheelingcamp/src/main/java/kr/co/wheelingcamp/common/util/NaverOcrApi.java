package kr.co.wheelingcamp.common.util;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import jakarta.mail.internet.ParseException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class NaverOcrApi {

	@Value("${naver.service.url}")
	private String url;
	
//		@GetMapping("/licenseTest2")
//		@ResponseBody
//		public String checkLicense(String code) {
//
//			RestTemplate rt = new RestTemplate();
//
//			// 요청 헤더 설정
//			HttpHeaders headers = new HttpHeaders();
//			headers.add("Content-type", "application/json");
//			headers.add("X-OCR-SECRET", "eEh3bWJCY3hMdnhjWVd1TFB0VlRvaVhYTUlhSklTUms=");
//
//			// 요청 본문 설정
//			MultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
//			  
//			Map<String, Object> image = new HashMap<>();
//	        image.put("format", "png");
//	        image.put("name", "medium");
//	        image.put("data", null);
//	        image.put("url", "https://image.ajunews.com/content/image/2023/06/07/20230607083035644114.jpg");
//	        
//	        params.add("images", Collections.singletonList(image));
//			params.add(" lang", "ko");
//			params.add("requestId", "string");
//			params.add("resultType", "string");
//			params.add("timestamp","{{$timestamp}}");
//			params.add("version", "V1");
//
//			// 요청 헤더 + 본문
//			HttpEntity<MultiValueMap<String, Object>> checkLicense = new HttpEntity<>(params, headers);
//
//			// 응답 본문 받기
//			ResponseEntity<Map<String, Object>> response = rt.exchange("https://4wekbqwdra.apigw.ntruss.com/custom/v1/32001/d60df6998b195d6ffc6633b8c21e2f14aa40541587e24702a19db4f4fbde87de/general?=",
//					HttpMethod.POST, checkLicense, new ParameterizedTypeReference<Map<String, Object>>() {
//					});
//
//			// 받은 응답 본문을 map으로 변환
//			Map<String, Object> responseBody = response.getBody();
//			log.info("responseBody:{}",responseBody.toString());
//			// 토큰 리턴
//			return "";
//		}
	/**
     * 네이버 ocr api 호출한다
     * @param {string} type 호출 메서드 타입
     * @param {string} filePath 파일 경로
     * @param {string} naver_secretKey 네이버 시크릿키 값
     * @param {string} ext 확장자
     * @returns {List} 추출 text list
     */
    @SuppressWarnings("unchecked")
	public  List<String> callApi(String type, String filePath, String naver_secretKey, String ext) {
        String apiURL = url;
        String secretKey = naver_secretKey;
        String imageFile = filePath;
        List<String> parseData = null;

        log.info("callApi Start!");

        try {
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setUseCaches(false);
            con.setDoInput(true);
            con.setDoOutput(true);
            con.setReadTimeout(30000);
            con.setRequestMethod(type);
            String boundary = UUID.randomUUID().toString().replaceAll("-", "");
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty("X-OCR-SECRET", secretKey);

            JSONObject json = new JSONObject();
            json.put("version", "V1");
            json.put("requestId", "string");
            json.put("timestamp", "{{$timestamp}}");
            JSONObject image = new JSONObject();
            image.put("format", ext);
            image.put("name", "demo");
            JSONArray images = new JSONArray();
            ((List<String>) images).addAll((Collection<? extends String>) image);
            json.put("images", images);
            String postParams = json.toString();

            con.connect();
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            File file = new File(imageFile);
            writeMultiPart(wr, postParams, file, boundary);
            wr.close();

            int responseCode = con.getResponseCode();
            BufferedReader br;
            if (responseCode == 200) {
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();

            parseData = jsonparse(response);


        } catch (Exception e) {
            System.out.println(e);
        }
        return parseData;
    }

    /**
     * writeMultiPart
     * @param {OutputStream} out 데이터를 출력
     * @param {string} jsonMessage 요청 params
     * @param {File} file 요청 파일
     * @param {String} boundary 경계
     */
    private static void writeMultiPart(OutputStream out, String jsonMessage, File file, String boundary) throws
            IOException {
        StringBuilder sb = new StringBuilder();
        sb.append(boundary).append("\r\n");
        sb.append("Content-Disposition:form-data; name=\"message\"\r\n\r\n");
        sb.append(jsonMessage);
        sb.append("\r\n");

        out.write(sb.toString().getBytes("UTF-8"));
        out.flush();

        if (file != null && file.isFile()) {
            out.write(("--" + boundary + "\r\n").getBytes("UTF-8"));
            StringBuilder fileString = new StringBuilder();
            fileString
                    .append("Content-Disposition:form-data; name=\"file\"; filename=");
            fileString.append("\"" + file.getName() + "\"\r\n");
            fileString.append("Content-Type: application/octet-stream\r\n\r\n");
            out.write(fileString.toString().getBytes("UTF-8"));
            out.flush();

            try (FileInputStream fis = new FileInputStream(file)) {
                byte[] buffer = new byte[8192];
                int count;
                while ((count = fis.read(buffer)) != -1) {
                    out.write(buffer, 0, count);
                }
                out.write("\r\n".getBytes());
            }

            out.write((boundary + "--\r\n").getBytes("UTF-8"));
        }
        out.flush();
    }
    /**
     * 데이터 가공
     * @param {StringBuffer} response 응답값
     * @returns {List} result text list
     */
    private static List<String> jsonparse(StringBuffer response) throws ParseException {
        //json 파싱
//        JSONParser jp = new JSON;
//        JSONObject jobj = (JSONObject) jp.parse(response.toString());
//        //images 배열 obj 화
//        JSONArray JSONArrayPerson = (JSONArray)jobj.get("images");
//        JSONObject JSONObjImage = (JSONObject)JSONArrayPerson.get(0);
//        JSONArray s = (JSONArray) JSONObjImage.get("fields");
//        //
//        List<Map<String, Object>> m = JsonUtill.getListMapFromJsonArray(s);
        List<String> result = new ArrayList<>();
//        for (Map<String, Object> as : m) {
//            result.add((String) as.get("inferText"));
//        }

        return result;
//    }
}

	
	
	
	
	
	
	
	
}
