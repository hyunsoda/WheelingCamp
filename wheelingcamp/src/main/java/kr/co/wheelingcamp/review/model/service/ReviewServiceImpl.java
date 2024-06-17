package kr.co.wheelingcamp.review.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.wheelingcamp.review.model.dto.Review;
import kr.co.wheelingcamp.review.model.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{
	
	private final ReviewMapper mapper;

	
	// 후기 가져오기
	@Override
	public List<Review> selectReview(int itemNo) {

		List<Review> review = new ArrayList<>();
		review = mapper.selectReview(itemNo);

		return review;
	}
	
	
	// 리뷰 등록
	@Override
	public int addReview(Map<String, Object> map) {
		
		return mapper.addReview(map);
	}


	// 리뷰 삭제
	@Override
	public int deleteReview(Map<String, Integer> map) {
		
		return mapper.deleteReview(map);
	}


	// 리뷰 수정
	@Override
	public int updateReview(Map<String, Object> map) {
		
		return mapper.updateReview(map);
	}

}
