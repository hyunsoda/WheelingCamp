package kr.co.wheelingcamp.board.service;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import groovy.util.logging.Slf4j;
import kr.co.wheelingcamp.board.dto.Board;
import kr.co.wheelingcamp.board.mapper.EditBoardMapper;
import kr.co.wheelingcamp.common.exception.ImageDeleteException;
import kr.co.wheelingcamp.common.exception.ImageUpdateException;
import kr.co.wheelingcamp.common.exception.ImageUpdateExceptption;
import kr.co.wheelingcamp.common.util.RenameFile;
import kr.co.wheelingcamp.file.model.dto.BoardImage;
import lombok.RequiredArgsConstructor;
import lombok.Value;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
@PropertySource("classpath:/config.properties")
public class EditBoardServiceImpl implements EditBoardService{
	
	
	
	private final EditBoardMapper editBoardMapper;
	

	


	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public int boardUpdate(Board inputBoard, List<MultipartFile> images, String deleteOrder) throws ImageUpdateExceptption, ImageDeleteException {
	    // 1. 게시글 (제목/내용) 부분 수정 
	    int result = editBoardMapper.boardUpdate(inputBoard);

	    // 수정 실패 시 바로 리턴
	    if(result == 0) return 0;

	    // -----------------------------------------------------------------------------------------

	    // 2. 기존 O -> 삭제된 이미지(deleteOrder) 가 있는 경우
	    if(deleteOrder != null && !deleteOrder.equals("")) {
	        Map<String, Object> map = new HashMap<>();
	        map.put("deleteOrder", deleteOrder);
	        map.put("boardNo", inputBoard.getBoardNo());

	        // 성공하면 삭제된 행의 개수 리턴
	        result = editBoardMapper.deleteImage(map);

	        // 삭제 실패한 경우(부분 실패 포함) -> 롤백
	        if(result == 0) {
	            throw new ImageDeleteException("예외 처리 발생");
	        }
	    }

	    // 3. 선택한 파일이 존재할 경우
	    //    해당 파일 정보만 모아두는 List 객체 생성
	    List<BoardImage> uploadLList = new ArrayList<>(); 

	    // images 리스트에서 하나씩 꺼내어 선택된 파일이 있는지 검사
	    for(int i = 0; i < images.size(); i++) {
	        if(!images.get(i).isEmpty()) {
	            // 원본명
	            String originalName = images.get(i).getOriginalFilename();
	            // 변경명
	            String rename = RenameFile.fileRename(originalName);

	            // 모든 값을 저장할 DTO 생성 (BoardImage)
	            BoardImage img = BoardImage.builder()
	                                       .imgPath("/image/board/")
	                                       .imgOriginalName(originalName)
	                                       .imgRename(rename)
	                                       .boardNo(inputBoard.getBoardNo())
	                                       .imgOrder(i)
	                                       .uploadFile(images.get(i))
	                                       .build();

	            uploadLList.add(img);

	            // 4. 업로드 하려는 이미지 정보(img)를 이용해서
	            // 수정 또는 삽입 수행
	            int result2 = editBoardMapper.updateImage(img);

	            if(result2 == 0) {
	                insertImageList(img);
	            }
	        }

	        if(result == 0) {
	            throw new ImageUpdateExceptption("이미지 삽입 안됨"); // 예외 발생 -> 롤백
	        }
	    }

	    // 선택된 파일이 없을 경우
	    if(uploadLList.isEmpty()) {
	        return result;
	    }

	    // 수정, 새 이미지 파일을 서버에 저장
	    for(BoardImage img : uploadLList) {
	        try {
	            img.getUploadFile().transferTo(new File("C:/uploadFiles/board/" + img.getImgRename()));
	        } catch(Exception e) {
	            e.printStackTrace();
	        }
	    }

	    return result;
	}

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public int insertImageList(BoardImage img) {
	    // 이미지가 기존에 존재하는지 확인하는 로직 필요
	    // 예를 들어, imgOrder와 boardNo를 기준으로 이미지가 있는지 확인
	    // int count = editBoardMapper.checkImageExists(img);
	    // 이미지가 존재하지 않으면 삽입 수행
	    return editBoardMapper.insertImage(img);
	}



	/**
	 * 게시글 삭제
	 */
	@Override
	public int deleteBoard(Map<String, Integer> map) {
		
		
		return editBoardMapper.deleteBoard(map);
	}
	
	 
	
	
}
