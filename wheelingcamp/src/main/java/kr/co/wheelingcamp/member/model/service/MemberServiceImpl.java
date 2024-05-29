package kr.co.wheelingcamp.member.model.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import kr.co.wheelingcamp.member.model.dto.Member;
import kr.co.wheelingcamp.member.model.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

	private final MemberMapper mapper;
	
	// 암호화 객체
	private final BCryptPasswordEncoder bcrypt;

	// 일반 회원가입
	@Override
	public int signUp(Member member) {
		
		// 입력받은 비밀번호를 암호화한 문자열
		String bcryptPassword = bcrypt.encode(member.getMemberPw());
		
		// 입력 회원 정보의 비밀번호를 암호화 후 입력
		member.setMemberPw(bcryptPassword);
		
		return mapper.signUp(member);
	}
	
}
