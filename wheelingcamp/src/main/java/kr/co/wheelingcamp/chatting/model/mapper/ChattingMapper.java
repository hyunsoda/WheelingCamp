package kr.co.wheelingcamp.chatting.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.chatting.model.dto.ChattingRoom;

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
	ChattingRoom searchRoom(int loginMemberNo);

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

}
