package kr.co.wheelingcamp.review.model.service;

import java.util.List;
import java.util.Map;

import kr.co.wheelingcamp.review.model.dto.Review;



public interface ReviewService {
	
	
	/**
	 * review 가져오기
	 * 
	 * @param itemNo
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
	
	

}
