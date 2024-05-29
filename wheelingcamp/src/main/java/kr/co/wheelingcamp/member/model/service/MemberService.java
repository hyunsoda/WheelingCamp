package kr.co.wheelingcamp.member.model.service;

import kr.co.wheelingcamp.member.model.dto.Member;

public interface MemberService {

	/** 일반 회원가입
	 * @param member : 가입 회원 정보
	 * @return
	 */
	int signUp(Member member);

}
