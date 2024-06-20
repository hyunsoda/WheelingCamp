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

	//모든 뱃지의 SELECTED_BADGE 값을 'N'으로 초기화
	int resetSelectedBadge(int memberNo);

	// 선택한 뱃지의 SELECTED_BADGE 값을 'Y'로 설정
	int selectedBadge(@Param("memberNo") int memberNo, @Param("badgeNo") int badgeNo);

	


}
