package kr.co.wheelingcamp.board.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import kr.co.wheelingcamp.board.dto.Board;

public interface BoardService {

	Map<String, Object> selectBoardList(int cp);

	Board selectOne(Map<String, Integer> map);

	int updateReadCount(int boardNo);

	/** 게시글 작성
	 * @param inputBoard (memberNo, boardTitle, boardContent)
	 * @param thumbnail 
	 * @param imgFiles(첨부파일 최대 3개)
	 * @return
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	int boardWrite(Board inputBoard, List<MultipartFile> imgFiles) throws IllegalStateException, IOException;

	/** 좋아요
	 * @param map
	 * @return
	 */
	int boardLike(Map<String, Integer> map);

}
