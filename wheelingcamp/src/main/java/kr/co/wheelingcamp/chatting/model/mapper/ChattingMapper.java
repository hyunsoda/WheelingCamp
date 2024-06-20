package kr.co.wheelingcamp.chatting.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.chatting.model.dto.ChattingRoom;
import kr.co.wheelingcamp.chatting.model.dto.Message;

@Mapper
public interface ChattingMapper {

	/** 채팅방 목록
	 * @return
	 */
	List<ChattingRoom> selectRoomList();

	/** 채팅 룸 찾기
	 * @param loginMemberNo
	 * @return
	 */
	int searchRoom(int loginMemberNo);

	/** 채팅 룸 만들기
	 * @param loginMemberNo
	 * @return
	 */
	int createChattingRoom(int loginMemberNo);

	/** 메세지 전송
	 * @param map
	 * @return
	 */
	int insertMessage(Map<String, Object> map);

	/** 채팅 룸 가져오기
	 * @param loginMemberNo
	 * @return
	 */
	ChattingRoom memberRoom(int loginMemberNo);

	/** 채팅방 로딩
	 * @param map
	 * @return
	 */
	List<Message> chatRoom(int chattingNo);

}
