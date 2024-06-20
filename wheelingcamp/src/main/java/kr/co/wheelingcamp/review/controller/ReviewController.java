package kr.co.wheelingcamp.review.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import kr.co.wheelingcamp.member.model.dto.Member;
import kr.co.wheelingcamp.review.model.dto.Review;
import kr.co.wheelingcamp.review.model.service.ReviewService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("review")
public class ReviewController {

	private final ReviewService service;
	
	
	/** 특정 아이템 리뷰 가져오기
	 * @param map
	 * @return
	 */
	@PostMapping("selectReview")
	public List<Review> selectReview(@RequestBody Map<String, Integer> map) {
		
		return service.selectReview(map.get("itemNo"));
	}
	
	/** 리뷰 등록
	 * @param map
	 * @return
	 */
	@PostMapping("addReview")
	public int addReview(@RequestBody Map<String, Object> map, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		
		map.put("memberNo", ((Member)session.getAttribute("loginMember")).getMemberNo());
		
		return service.addReview(map);
	}
	
	/** 리뷰 삭제
	 * @param map
	 * @return
	 */
	@DeleteMapping("deleteReview")
	public int deleteReview(@RequestBody Map<String, Integer> map) {
		
		return service.deleteReview(map);
	}
	
	
	/** 리뷰 수정
	 * @param map
	 * @return
	 */
	@PutMapping("updateReview")
	public int updateReview(@RequestBody Map<String, Object> map) {
		
		return service.updateReview(map);
	}
	
}
