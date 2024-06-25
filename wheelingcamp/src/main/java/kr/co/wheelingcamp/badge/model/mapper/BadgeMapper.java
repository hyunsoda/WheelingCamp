package kr.co.wheelingcamp.badge.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import kr.co.wheelingcamp.badge.model.dto.Badge;

@Mapper
public interface BadgeMapper {

	// 로그인한 회원의 뱃지 목록 조회
	List<Badge> selectBadgeList(int memberNo);

	// 로그인한 회원의 뱃지 수 조회
	int getBadgeCount(int memberNo);

	// 모든 뱃지의 SELECTED_BADGE 값을 'N'으로 초기화
	int resetSelectedBadge(int memberNo);

	// 선택한 뱃지의 SELECTED_BADGE 값을 'Y'로 설정
	int selectedBadge(@Param("memberNo") int memberNo, @Param("badgeNo") int badgeNo);

	//  대표뱃지 마이페이지에서 보여주기
	Badge showSelectedBadge(int memberNo);

	// 댓글 수 조회하기
	int countComment(int memberNo);

	// 댓글 50개작성시 8번뱃지 수여
	void updateComment50thBadge(int memberNo);

	// 댓글 100개 작성시 9번뱃지 수여
	void updateComment100thBadge(int memberNo);


	


}
