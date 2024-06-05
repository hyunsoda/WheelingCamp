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

	//비밀번호 변경
	@Override
	public int changePw(Member loginMember, String newPw) {
		// 현재 로그인한 회원의 암호화된 비밀번호를 DB에서 조회
		String currentPw = mapper.checkPw(loginMember.getMemberNo());
		// 현재 비밀번호와 입력한 비밀번호가 다른 경우 0반환
		if (bcrypt.matches(newPw,currentPw)) {
			return 2;	
		}
	
		// 새 비밀번호를 암호화 진행
		loginMember.setMemberPw(bcrypt.encode(newPw));
		
		Member member = new Member();
		
		member.setMemberNo(loginMember.getMemberNo());
		member.setMemberPw(loginMember.getMemberPw());
		
		return mapper.changePw(member);
	}

	// 내정보 수정
	@Override
	public int profile(Member inputMember) {
		

		return mapper.profile(inputMember);
	}


}
