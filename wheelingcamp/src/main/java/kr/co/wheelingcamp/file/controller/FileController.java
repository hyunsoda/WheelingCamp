package kr.co.wheelingcamp.file.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.wheelingcamp.file.model.service.FileService;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("file")
public class FileController {
	private final FileService service;

	/**
	 * 상품 이미지 추가
	 * 
	 * @param itemNo    : 상품 번호
	 * @param imageList : 업로드 된 이미지 파일
	 * @return
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	@PostMapping("uploadImage")
	public String uploadItemImage(@RequestParam(value = "itemNo", required = false, defaultValue = "0") int itemNo,
			@RequestParam(value = "memberNo", required = false, defaultValue = "0") int memberNo,
			@RequestParam(value = "boardNo", required = false, defaultValue = "0") int boardNo,
			@RequestParam("imageList") List<MultipartFile> imageList, RedirectAttributes ra, HttpServletRequest request)
			throws IllegalStateException, IOException {

		int result = 0;

		if (itemNo != 0) { // 상품인 경우
			result = service.uploadImageList(itemNo, imageList, "item");

		} else if (memberNo != 0) { // 회원인 경우
			result = service.uploadImageList(memberNo, imageList, "member");

		} else if (boardNo != 0) { // 게시판인 경우
			result = service.uploadImageList(boardNo, imageList, "board");

		}

		// 결과
		if (result > 0) {
			// 성공 시
		} else {
			// 실패 시
		}

		// 요청 페이지로 반환
		return "redirect:" + request.getHeader("REFERER");
	}

}
