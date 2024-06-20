package kr.co.wheelingcamp.chatting.controller;

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

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import kr.co.wheelingcamp.chatting.model.dto.ChattingRoom;
import kr.co.wheelingcamp.chatting.model.dto.Message;
import kr.co.wheelingcamp.chatting.model.service.ChattingService;
import kr.co.wheelingcamp.member.model.dto.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("chat")
@RequiredArgsConstructor
@Slf4j
@Transactional(rollbackFor = Exception.class)
public class ChattingController {

	private final ChattingService service;
	
	/** 채팅방으로 이동 (관리자라면 회원 채팅방 목록을 들고 감)
	 * @param request
	 * @param model
	 * @return
	 */
	@GetMapping("liveChat")
	public String liveChat(HttpServletRequest request, Model model) {
		
		HttpSession session = request.getSession();
		
		Member loginMember = (Member)session.getAttribute("loginMember");
		int loginMemberNo = loginMember.getMemberNo();
		
		// 관리자면 회원 목록을 보여줘야함
		if(loginMemberNo == 1) {
			List<ChattingRoom> roomList = managerRoomList();
			model.addAttribute("roomList", roomList);
			
		}else { // 회원이라면 관리자와 말할 수 있는 채팅방을 보여줌, 없음 만들어
			ChattingRoom chat = service.searchRoom(loginMemberNo);
			List<Message> messageList = service.chatRoom(chat.getChattingNo());
			
			model.addAttribute("messageList", messageList);
			model.addAttribute("chatRoom", chat);
			
		}
		
		
		
		return "pages/liveChat";
	}
	
	
	/** 관리자의 채팅방 목록 리턴
	 * @return
	 */
	public List<ChattingRoom> managerRoomList() {
		
		return service.selectRoomList();
	}
	
	
	/** 채팅방 목록
	 * @return
	 */
	@ResponseBody
	@GetMapping("roomList")
	public List<ChattingRoom> roomList() {
		
		return managerRoomList();
	}
	
	/** 메세지 전송
	 * @param map 
	 * @return
	 */
	@ResponseBody
	@PostMapping("insertMessage")
	public int insertMessage(@RequestBody Map<String, Object> map) {
		
		int result = service.insertMessage(map);
		
		return result;
	}
	
	/** 채팅방 로딩
	 * @param map
	 * @return
	 */
	@ResponseBody
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
	@ResponseBody
	@PutMapping("readTalk")
	public int readTalk(@RequestBody Map<String, Integer> map) {
		
		return service.readTalk(map);
	}
	
}
