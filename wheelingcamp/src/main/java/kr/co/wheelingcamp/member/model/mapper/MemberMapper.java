package kr.co.wheelingcamp.member.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.member.model.dto.Member;

@Mapper
public interface MemberMapper {

	/** 일반 회원가입
	 * @param member
	 * @return
	 */
	int signUp(Member member);

}
