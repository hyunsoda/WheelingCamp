package kr.co.wheelingcamp.chatting.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {
	
	private int messageNo;		// 메세지 번호
	private String messageContent;	// 메세지 내용
	private int senderNo;		// 보내는 사람 번호
	private String senderName;	// 보내는 사람 이름
	private int targetNo;		// 받는 사람 번호
	private int chattingNo;		// 채팅방 번호
	private String sendTime;	// 메세지 보낸 시간
	
}
