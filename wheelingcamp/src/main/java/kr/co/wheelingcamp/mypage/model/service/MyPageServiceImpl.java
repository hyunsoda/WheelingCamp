package kr.co.wheelingcamp.mypage.model.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import kr.co.wheelingcamp.member.model.dto.Member;
import kr.co.wheelingcamp.mypage.model.mapper.MyPageMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{

	private final MyPageMapper mapper;
	private final BCryptPasswordEncoder bcrypt;
	
	// 입력한 비밀번호와 현재 비밀번호가 같은지 확인
	@Override
	public int checkPw(int memberNo, String inputPw) {
		
		String currentPw = mapper.checkPw(memberNo);
			
		if(!bcrypt.matches(inputPw,currentPw)) {
			
			System.out.println(currentPw);
			System.out.println(inputPw);
		return 0;
		}
		return 1;
	}

	// 회원 탈퇴
	@Override
	public int secession(int memberNo) {
		
		return mapper.secession(memberNo);
	}

	// 비밀번호 변경
	@Override
	public int changePw(Member loginMemeber, String newPw) {
		
		// 현재 비밀번호가 같은지 보기
		String currentPw = mapper.checkPw(loginMemeber.getMemberNo());

		if (bcrypt.matches(newPw, currentPw)) {
			return 2;
		}
		

		// 변경한 비밀번호 암호화 처리해주기
		loginMemeber.setMemberPw(bcrypt.encode(newPw));

		Member member = new Member();

		member.setMemberNo(loginMemeber.getMemberNo());
		member.setMemberPw(loginMemeber.getMemberPw());
		
		return mapper.changePw(member);
	}

	// 내정보 수정
	@Override
	public int profile(Member inputMember) {
		

		return mapper.profile(inputMember);
	}
	
	

}
