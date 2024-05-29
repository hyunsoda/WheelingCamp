package kr.co.wheelingcamp.member.model.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.member.model.dto.Member;

@Mapper
public interface MemberMapper {

	/** 아이디 중복 검사
	 * @param checkId
	 * @return
	 */
	int checkId(String checkId);

	/** 네이버 로그인하기
	 * @param map
	 * @return
	 */
	Member naverLoginMember(Map<String, String> map);

	/** 네이버 회원가입 하기
	 * @param map
	 * @return
	 */
	int naverSignUp(Map<String, String> map);

}
