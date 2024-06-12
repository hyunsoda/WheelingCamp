package kr.co.wheelingcamp.badge.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.badge.model.dto.Badge;

@Mapper
public interface BadgeMapper {

	// 로그인한 회원의 뱃지 목록 조회
	List<Badge> selectBadgeList(int memberNo);

	// 로그인한 회원의 뱃지 수 조회
	int getBadgeCount(int memberNo);

}
