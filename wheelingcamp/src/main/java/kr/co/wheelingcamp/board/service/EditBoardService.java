package kr.co.wheelingcamp.board.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import kr.co.wheelingcamp.board.dto.Board;
import kr.co.wheelingcamp.common.exception.ImageDeleteException;
import kr.co.wheelingcamp.common.exception.ImageUpdateExceptption;

public interface EditBoardService {

	/** 게시글 수정하러 가기 메서드
	 * @param inputBoard
	 * @param images
	 * @param deleteOrder
	 * @return
	 * @throws ImageUpdateExceptption 
	 * @throws ImageDeleteException 
	 */
	int boardUpdate(Board inputBoard, List<MultipartFile> images, String deleteOrder) throws ImageUpdateExceptption, ImageDeleteException;

	int deleteBoard(Map<String, Integer> map);

}
