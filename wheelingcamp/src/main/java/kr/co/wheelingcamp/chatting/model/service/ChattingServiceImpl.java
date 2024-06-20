package kr.co.wheelingcamp.chatting.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import kr.co.wheelingcamp.chatting.model.dto.ChattingRoom;
import kr.co.wheelingcamp.chatting.model.dto.Message;
import kr.co.wheelingcamp.chatting.model.mapper.ChattingMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChattingServiceImpl implements ChattingService{
	
	private final ChattingMapper mapper;

	// 채팅방 목록
	@Override
	public List<ChattingRoom> selectRoomList() {
		
		return mapper.selectRoomList();
	}

	// 채팅 룸 찾기
	@Override
	public ChattingRoom searchRoom(int loginMemberNo) {
		
		int isRoom = mapper.searchRoom(loginMemberNo);

		ChattingRoom chatRoom = null;
		
		// 만약 chatRoom이 null이면 새로 만들기
		if(isRoom == 0) {
			int result = mapper.createChattingRoom(loginMemberNo);

			if(result == 1) {
				chatRoom = mapper.memberRoom(loginMemberNo);
				log.info("채팅 방 생성!");
			}else {
				log.info("채팅 방 생성 중 에러");
			}

		}else {
			chatRoom = mapper.memberRoom(loginMemberNo);
		}
		
		log.info("chatRoom = {}",chatRoom);
		
		return chatRoom;
	}


	// 메세지 전송
	@Override
	public int insertMessage(Map<String, Object> map) {
		
		return mapper.insertMessage(map);
	}

	// 채팅방 로딩
	@Override
	public List<Message> chatRoom(int chattingNo) {
		
		return mapper.chatRoom(chattingNo);
	}

}
