package kr.co.wheelingcamp.chatting.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import kr.co.wheelingcamp.chatting.model.dto.ChattingRoom;
import kr.co.wheelingcamp.chatting.model.dto.Message;
import kr.co.wheelingcamp.chatting.model.service.ChattingService;
import kr.co.wheelingcamp.member.controller.MemberController;
import kr.co.wheelingcamp.member.model.dto.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("chat")
@RequiredArgsConstructor
@Slf4j
@Transactional(rollbackFor = Exception.class)
public class ChattingController {

	private final ChattingService service;
	

	
	
	/** 관리자의 채팅방 목록 리턴
	 * @return
	 */
	public List<ChattingRoom> managerRoomList() {
		
		return service.selectRoomList();
	}
	
	
	/** 채팅방 목록
	 * @return
	 */
	@GetMapping("roomList")
	public List<ChattingRoom> roomList() {
		
		return managerRoomList();
	}
	
	/** 메세지 전송
	 * @param map 
	 * @return
	 */
	@PostMapping("insertMessage")
	public int insertMessage(@RequestBody Map<String, Object> map) {
		
		int result = service.insertMessage(map);
		
		return result;
	}
	
	/** 채팅방 로딩
	 * @param map
	 * @return
	 */
	@PostMapping("chatRoom")
	public List<Message> chatRoom(@RequestBody Map<String, Integer> map) {
		
		int chattingNo = map.get("chattingNo");
		
		List<Message> list = service.chatRoom(chattingNo);
		
		log.info("list = {}", list);
		
		return list;
		
	}
	
	/** 읽음 처리
	 * @param map
	 * @return
	 */
	@PutMapping("readTalk")
	public int readTalk(@RequestBody Map<String, Integer> map) {
		
		return service.readTalk(map);
	}
	
	
	/** 채팅 리스트
	 * @param map
	 * @return
	 */
	@PostMapping("getChatList")
	public Map<String, Object> getChatList(@RequestBody Map<String, Integer> map){
		
		Map<String, Object> returnMap = new HashMap<>();
		
		if(map.get("memberNo") == 1) {
			returnMap.put("roomList", service.selectRoomList());
		}else {
			ChattingRoom chat = service.searchRoom(map.get("memberNo"));
			List<Message> messageList = service.chatRoom(chat.getChattingNo());
			
			returnMap.put("messageList", messageList);
			returnMap.put("chatRoom", chat);

		}

		return returnMap;
		
	}
	
	/** 로그인 한 회원의 채팅 방 새로고침
	 * @param map
	 * @return
	 */
	@PostMapping("userChatRoom")
	public List<Message> userChatRoom(@RequestBody Map<String, Integer> map) {
		
		return service.chatRoom(map.get("chattingNo"));
		
	}
	
}
