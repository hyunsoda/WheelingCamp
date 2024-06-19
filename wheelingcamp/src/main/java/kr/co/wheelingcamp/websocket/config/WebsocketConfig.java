package kr.co.wheelingcamp.websocket.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import kr.co.wheelingcamp.websocket.handler.WebsocketHandler;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSocket	// 웹소켓 활성화
@RequiredArgsConstructor
public class WebsocketConfig implements WebSocketConfigurer{

	private final WebsocketHandler websocketHandler;
	
	// 특정 엔드포인트를 정의한 뒤 도메인이 다른 서버에서도 접속 가능하도록 모든 가능성을 열어둠(보안성 취약)
	// 웹소켓 핸들러 등록 메서드
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(websocketHandler, "/webSock")
		// ws://localhost/webSock 으로
		// 클라이언트가 요청을 하면
		// WebsocketHandler가 처리하도록 등록
		.setAllowedOrigins("*"); // 모든 도메인을 허용
		// 웹소켓 요청이 허용되는 ip/도메인 지정
		
	}
	
	

}
