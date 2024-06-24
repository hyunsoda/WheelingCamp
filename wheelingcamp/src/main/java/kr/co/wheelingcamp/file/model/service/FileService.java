package kr.co.wheelingcamp.file.model.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {

	/**
	 * @param objectNo  : 객체 번호
	 * @param imageList : 이미지 저장 리스트
	 * @param type      : 업로드 하고자 하는 객체 ("member", "item", "board")
	 * @return
	 * @throws IOException
	 * @throws IllegalStateException
	 */
	int uploadImageList(int objectNo, List<MultipartFile> imageList, String type)
			throws IllegalStateException, IOException;

	/**
	 * 상품의 모든 사진 삭제
	 * 
	 * @return
	 */
	int deleteImageAll(int objectNo, String type);

}
