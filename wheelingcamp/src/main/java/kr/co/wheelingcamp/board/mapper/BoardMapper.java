package kr.co.wheelingcamp.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import kr.co.wheelingcamp.board.dto.Board;

@Mapper
public interface BoardMapper {

	/** 삭제되지 않은 게시판 조회
	 * @return
	 */
	int getListCount();

	/** 게시판 내용 가져오기
	 * @param rowBounds
	 * @return
	 */
	List<Board> selectBoardList(RowBounds rowBounds);

}
