package kr.co.wheelingcamp.board.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import kr.co.wheelingcamp.board.dto.Board;

public interface EditBoardService {

	/** 게시글 수정하러 가기 메서드
	 * @param inputBoard
	 * @param images
	 * @param deleteOrder
	 * @return
	 */
	int boardUpdate(Board inputBoard, List<MultipartFile> images, String deleteOrder);

}
