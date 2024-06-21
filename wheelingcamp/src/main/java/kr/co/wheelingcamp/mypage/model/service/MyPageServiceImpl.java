package kr.co.wheelingcamp.mypage.model.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.co.wheelingcamp.badge.model.dto.Badge;
import kr.co.wheelingcamp.common.util.RenameFile;
import kr.co.wheelingcamp.member.model.dto.Member;
import kr.co.wheelingcamp.mypage.model.mapper.MyPageMapper;
import lombok.RequiredArgsConstructor;


@Service
@Transactional(rollbackFor=Exception.class) 
@PropertySource("classpath:/config.properties")
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{

	private final MyPageMapper mapper;
	private final BCryptPasswordEncoder bcrypt;
	
	@Value("${member.web-path}")
	private String profileWebPath; //image/member/

	@Value("${member.folder-path}")
	private String profileFolderPath; //C:/uploadFiles/member/

	
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
	public int profile(Member inputMember,String[] memberAddress) {
		
		if(inputMember.getMemberAddress().equals(",,")) {
			inputMember.setMemberAddress(null);
		}else {
			String address = String.join("^^^",memberAddress);
			inputMember.setMemberAddress(address);
		}
		return mapper.profile(inputMember);
	}

	//프로필 이미지 변경
	@Override
	public int changeProfileImg(MultipartFile profileImg, Member loginMember) throws Exception{
		
		
        Path uploadPath = Paths.get(profileFolderPath);

        
        try {
        	// 디렉토리가 존재하지 않으면 생성
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
        }catch(Exception e) {
        	e.printStackTrace();
        	System.out.println("디렉토리 생성 오류");
        }
		
		// 수정할 경로
		String updatePath= null;
		
		// 변경명 저장
		String rename = null;
		// 업로드한 이미지가 있을 경우
		// - 있을 경우 : 수정할 경로 조합 (Rename한 파일명, 클라이언트에서 접근할 수 있는 경로)
		if(!profileImg.isEmpty()) {
			//updatePath 조합
			
			// 1. 파일명 변경
			rename = RenameFile.fileRename(profileImg.getOriginalFilename());
			
			// 2. / myPage/profile/변경된 파일명
			updatePath = profileWebPath +rename;
		}
		
			// 수정된 프로필 이미지 경로  + 회원 번호를 저장할 DTO 객체
			Member member = Member.builder()
					.memberNo(loginMember.getMemberNo())
					.profileImg(updatePath)
					.build();
		
			// UPDATE 수행
			int result = mapper.changeProfileImg(member);
					
			if(result > 0) { // DB에 수정 성공 시

				// 프로필 이미지를 없앤 경우(NULL 로 수정한 경우)를 제외
				// -> 업로드한 이미지가 있을 경우
				if(!profileImg.isEmpty()) {
					//파일을 서버 지정된 폴더에 저장
					profileImg.transferTo(new File(profileFolderPath + rename));
				}

				
				// 세션 회원 정보에서 프로필 이미지 경로를 업데이트한 경로로 변경
				loginMember.setProfileImg(updatePath);
			}
			
			return result;
		
	}
	// 소셜 로그인인지 일반 로그인인지 확인하기
	@Override
	public int checkingLogin(int memberNo) {
		String result = mapper.checkPw(memberNo);
		System.out.println("service쪽 result :"+result);
		if(result == null) {
			return 0;
		}
		return 1;
	}


}
