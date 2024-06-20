package kr.co.wheelingcamp.chatting.model.service;

import java.util.List;
import java.util.Map;

import kr.co.wheelingcamp.chatting.model.dto.ChattingRoom;
import kr.co.wheelingcamp.chatting.model.dto.Message;

public interface ChattingService {

	/** 채팅방 목록 불러오기
	 * @return
	 */
	List<ChattingRoom> selectRoomList();

	/** 채팅 룸 찾기
	 * @return
	 */
	ChattingRoom searchRoom(int loginMemberNo);

	/** 메세지 전송
	 * @param map
	 * @return
	 */
	int insertMessage(Map<String, Object> map);

	/** 채팅방 로딩
	 * @param map
	 * @return
	 */
	List<Message> chatRoom(int chattingNo);

}
