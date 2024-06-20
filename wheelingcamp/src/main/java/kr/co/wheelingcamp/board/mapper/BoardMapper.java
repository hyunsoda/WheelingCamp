package kr.co.wheelingcamp.board.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import kr.co.wheelingcamp.board.dto.Board;
import kr.co.wheelingcamp.board.dto.Comment;
import kr.co.wheelingcamp.file.model.dto.BoardImage;

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

	/** 내가 선택한 게시글 하나 목록 불러오기
	 * @param map
	 * @return
	 */
	Board selectOne(Map<String, Integer> map);

	/** 게시글 조회수 증가
	 * @param boardNo
	 * @return
	 */
	int updateReadCount(int boardNo);

	/** 게시글 조회수 증가 2
	 * @param boardNo
	 * @return
	 */
	int selectReadCount(int boardNo);

	/** 게시글 작성하기
	 * @param boardInfo
	 * @return
	 */
	int boardWrite(Board inputBoard);

	/** 이미지 삽입
	 * @param uploadImgList
	 * @return
	 */
	int insertUploadImgList(List<BoardImage> uploadImgList);

	/** 좋아요 삭제
	 * @param map
	 * @return
	 */
	int deleteBoardLike(Map<String, Integer> map);

	/** 좋아요 등록
	 * @param map
	 * @return
	 */
	int insertBoardLike(Map<String, Integer> map);

	/** 좋아요 다시 반환
	 * @param integer
	 * @return
	 */
	int selectLikeCount(Integer integer);

	int getSearchCount(Map<String, Object> paramMap);

	List<Board> selectSearchList(Map<String, Object> paramMap, RowBounds rowBounds);

	List<Board> getMyPosts(RowBounds rowbounds, String memberId);

	int getListMyBoard(String memberId);

	int getCommentCount(int memberNo);

	List<Comment> getMyCommentLists(RowBounds rowBounds, int memberNo);

	/** 게시물 업로드 횟수 
	 * @param memberNo
	 * @return
	 */
	int boardCount(int memberNo);
	
	/** 첫 게시물 작성 시 2번 뱃지 수여
	 * @param memberNo
	 */
	void updateFirstBoardBadge(int memberNo);

	/** 50번째 게시물 작성시 3번 뱃지 수여
	 * @param memberNo
	 */
	void updateBoardBadge(int memberNo);

	/** 1개 좋아요 획득 시 4번 뱃지 수여
	 * @param boardNo
	 */
	void updateFirstLikeCountBadge(Integer boardNo);

	/** 100개 좋아요 획득 시 5번 뱃지 수여
	 * @param integer
	 */
	void update100LikeCountBadge(Integer integer);

	/** 조회수 100회시 6번 뱃지 수여
	 * @param boardNo
	 */
	void update100ReadCountBadge(int boardNo);

	/** 조회수 300회시 7번 뱃지 수여
	 * @param boardNo
	 */
	void update300ReadCountBadge(int boardNo);

}
