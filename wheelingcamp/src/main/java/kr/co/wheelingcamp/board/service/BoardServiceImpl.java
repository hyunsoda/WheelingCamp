package kr.co.wheelingcamp.board.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import groovy.util.logging.Slf4j;
import kr.co.wheelingcamp.board.dto.Board;
import kr.co.wheelingcamp.board.mapper.BoardMapper;
import kr.co.wheelingcamp.common.util.Pagination;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
@Slf4j
public class BoardServiceImpl implements BoardService{
	
	private final BoardMapper mapper;
	
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

}
