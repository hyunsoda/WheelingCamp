package kr.co.wheelingcamp.board.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import groovy.util.logging.Slf4j;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.wheelingcamp.board.dto.Board;
import kr.co.wheelingcamp.board.exception.BoardInsertException;
import kr.co.wheelingcamp.board.mapper.BoardMapper;
import kr.co.wheelingcamp.common.util.Pagination;
import kr.co.wheelingcamp.common.util.RenameFile;
import kr.co.wheelingcamp.file.model.dto.BoardImage;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
@Slf4j
public class BoardServiceImpl implements BoardService{
	
	private final BoardMapper mapper;
	
	@Value("${board.web-path}")
	private String webPath;
	
	@Value("${board.folder-path}")
	private String folderPath;
	
	/**
	 * 게시판 내용 조회 메서드
	 */
	@Override
	public Map<String, Object> selectBoardList(int cp) {
		
		
		// 삭제 안된 게시판만 가져오기 
		
		int listCount = mapper.getListCount();
		
		
		Pagination pagination = new Pagination(cp, listCount);
	
		
		int limit = pagination.getLimit();
	      
	      int offset = (cp - 1) * limit;
	      
	      RowBounds rowBounds = new RowBounds(offset, limit);
	      
	      List<Board> boardList = mapper.selectBoardList(rowBounds);
	      
	      Map<String, Object> map = new HashMap<>();
	      
	      map.put("pagination", pagination);
	      map.put("boardList", boardList);
		
		
		
		return map;
	}

	
	
	
	/**
	 * 게시판 상세 조회 메서드(내가 선택한 게시글 하나 불러오기)
	 */
	@Override
	public Board selectOne(Map<String, Integer> map) {
		
		return mapper.selectOne(map);
	}




	/**
	 *  게시글 읽었을때 조회수 증가시키기
	 */
	@Override
	public int updateReadCount(int boardNo) {
		
		 int result = mapper.updateReadCount(boardNo);
	      
	      
		   if(result >0) {
		         return mapper.selectReadCount(boardNo);
		   }
		      
		      return -1;
		
		
	}



	// 게시글 작성하기
	@Override
	public int boardWrite(Board inputBoard, List<MultipartFile> imgFiles) throws IllegalStateException, IOException {
		
		// 게시글을 먼저 작성한다.
		int result = mapper.boardWrite(inputBoard);
		
		// 작성 실패하면 0 리턴
		if(result == 0) return 0;
		
		// 작성한 게시글 번호 받아오기
		int boardNo = inputBoard.getBoardNo();
		
		// 업로드할 이미지 리스트 생성
		List<BoardImage> uploadImgList = new ArrayList<>();
		
		
		// 이미지 리스트 사이즈 만큼 반복문을 돌리면서
		// 비어있지 않으면 가공해서 업로드할 이미지에 추가
		for(int i = 0; i < imgFiles.size(); i++) {
			
			if( !imgFiles.get(i).isEmpty()) {
				
				String originalName = imgFiles.get(i).getOriginalFilename(); // 원본명
				
				String rename = RenameFile.fileRename(originalName); // 변경명
				
				BoardImage img = BoardImage.builder()
								.boardNo(boardNo)
								.imgOriginalName(originalName)
								.imgRename(rename)
								.imgOrder(i)
								.imgPath(webPath)
								.uploadFile(imgFiles.get(i))
								.build();
				
				System.out.println("uploadFile" + imgFiles.get(i));
				
				uploadImgList.add(img);
			}
			
		}
		
		// 이미지 업로드 리스트가 비어있을때 (업로드를 안했을 때)
		if(uploadImgList.isEmpty()) {
			return boardNo;
		}
		
		// 이미지 업로드 삽입
		// insert = 성공 개수
		result = mapper.insertUploadImgList(uploadImgList);
		
		if(result == uploadImgList.size()) {
			
			for(BoardImage img : uploadImgList) {
				
				// 
				img.getUploadFile().transferTo(new File(folderPath + img.getImgRename()));
				
			}
			
		}else {
			// 하나라도 실패하면 정상 작동한게 아니므로
			// 삽입했던 내용 모두 rollback -> 에러 강제 발생
			throw new BoardInsertException("이미지가 정상 삽입되지 않음");
		}
		
		
		return boardNo;
	}




	/**
	 * 좋아요 
	 */
	@Override
	public int boardLike(Map<String, Integer> map) {
		   int result = 0;
		      
		      // 1. 좋아요가 체크된 상태인 경우 (likeCheck == 1)
		      //   -> BOARD_LIKE 테이블에 DELETE
		      if(map.get("likeCheck")==1) {
		         
		         result = mapper.deleteBoardLike(map);
		         
		      } else {
		         // 2. 좋아요가 해제된 상태인 경우 (likeCheck == 0)
		         //     -> BOARD_LIKE 테이블에 INSERT
		         result = mapper.insertBoardLike(map);
		         
		      }
		      
		      // 3. 다시 해당 게시글의 좋아요 개수 조회해서 반환
		      if(result > 0) {
		         
		         return mapper.selectLikeCount(map.get("boardNo"));
		         
		      }

		      // 실패 시
		      return -1;
	}
	
	
	

}
