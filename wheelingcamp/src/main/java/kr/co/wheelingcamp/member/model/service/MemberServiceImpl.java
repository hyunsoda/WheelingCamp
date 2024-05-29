package kr.co.wheelingcamp.member.model.service;

import org.springframework.stereotype.Service;

import kr.co.wheelingcamp.member.model.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

	private final MemberMapper mapper;
	
}
