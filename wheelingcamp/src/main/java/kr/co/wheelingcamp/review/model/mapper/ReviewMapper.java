package kr.co.wheelingcamp.review.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.review.model.dto.Review;



@Mapper
public interface ReviewMapper {
	
	/**
	 * 리뷰 가져오기
	 * 
	 * @return
	 */
	List<Review> selectReview(int itemNo);

	/** 리뷰 등록
	 * @param map
	 * @return
	 */
	int addReview(Map<String, Object> map);

	/** 리뷰 삭제
	 * @param map
	 * @return
	 */
	int deleteReview(Map<String, Integer> map);

	/** 리뷰 수정
	 * @param map
	 * @return
	 */
	int updateReview(Map<String, Object> map);

	/** 작성한 리뷰 카운트 하기
	 * @param object
	 * @return
	 */
	int reviewCount(Object object);

	/** 첫 리뷰 등록 시 8번뱃지 수여
	 * @param object
	 */
	void RegisterFirstReview(Object object);

	/** 50번째 리뷰 등록시 9번 뱃지 수여
	 * @param object
	 */
	void Register50thReview(Object object);

}
