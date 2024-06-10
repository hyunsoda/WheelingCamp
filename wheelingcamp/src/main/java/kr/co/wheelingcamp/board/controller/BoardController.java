package kr.co.wheelingcamp.board.controller;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.angus.mail.imap.Utility;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.wheelingcamp.board.dto.Board;
import kr.co.wheelingcamp.board.service.BoardService;
import kr.co.wheelingcamp.member.model.dto.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("board")
@RequiredArgsConstructor
@SessionAttributes({"loginMember"})
@Slf4j
public class BoardController {
	
	private final BoardService service;

	/**board test중(민경)
	 * @return
	 */
//	@RequestMapping("update")
//	public String board() {
//		return "smarteditor/updateBoard";
//	}
	
//	@GetMapping("boardSearch")
//	public String boardSearch(
//			
//			) {
//		
//		
//		return "";
//	}
//	
	
	@GetMapping("boardList")
	public String boardList(
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			@RequestParam Map<String, Object> paramMap,
			Model model
			) {
		
		
		Map<String, Object> map = null;
		
		if(paramMap.get("key") == null) {
			map = service.selectBoardList(cp);
		}else {
			

			
			paramMap.put("cp", cp);
			System.out.println("parammap : " + paramMap);
			map = service.searchList(paramMap, cp);
		}
		
		
		
		model.addAttribute("pagination", map.get("pagination"));
		model.addAttribute("boardList", map.get("boardList"));
		
		
		
		
		return "board/boardInfo";
	}
	
	/** 게시판 상세조회 
	 * @param boardCode
	 * @param boardNo
	 * @param model
	 * @param ra
	 * @param loginMember
	 * @param req
	 * @param resp
	 * @return
	 */
	@GetMapping("{boardNo:[0-9]+}")
	public String boardDetail(
			@PathVariable("boardNo") int boardNo,
	         Model model,
	         RedirectAttributes ra,
	         @SessionAttribute(value="loginMember" , required=false) Member loginMember,
	         HttpServletRequest req,
	         HttpServletResponse resp,
	         @RequestParam(value="cp", required=false, defaultValue="1") int cp
			) {
	
		
		Map<String, Integer> map = new HashMap<>();
	      map.put("boardNo", boardNo);
	      
	      // 1. 로그인이 되어있을때만 map 에 맴버넘버넣기
	      
	      if(loginMember != null) {
	         map.put("memberNo", loginMember.getMemberNo());
	      }
	      
	      // 2) 서비스 호출 
	      
	      // map 에다가 현재 게시글 no 실어서 보내서 게시글 내용 조회해오기
	      
//	      SELECT BOARD_NO, BOARD_TITLE, BOARD_CONTENT, BOARD_WRITE_DATE, BOARD_UPDATE_DATE, READ_COUNT, MEMBER_NO, MEMBER_NAME
//	      FROM "BOARD"
//	      JOIN "MEMBER" USING (MEMBER_NO)
//	      WHERE BOARD_NO = #{boardNo}
//	      AND BOARD_DEL_FL ='N'
	       Board board = service.selectOne(map);
	       
//	     System.out.println(board);
	       
	      String path = null;
	      
	      if(board == null) {
	         path = "redirect:/board/boardInfo";
	         ra.addFlashAttribute("message", "게시글이 존재하지 않습니다");
	      }else {
	         
	         //이것저것 추가
	         
	         // 1. 비회원 또는 로그인한 회원의 글이 아닌 경우
	         
	         if(loginMember == null || loginMember.getMemberNo() !=  board.getMemberNo() ) {
	               
	            
	            Cookie[] cookies = req.getCookies();
	            
	            
	            
	            Cookie c = null;
	            
	            for(Cookie temp : cookies) {
	               if(temp.getName().equals("readBoardNo") ) {
	                   c = temp;
	                   break;
	               }
	            }
	            
	            int result = 0;
	            
	            if(c == null) {
	               // 새 쿠키 생성 
	               
	               c = new Cookie("readBoardNo", "[" + boardNo + "]");
	                               //"readBoardNo" , "[50]"
	               result = service.updateReadCount(boardNo);
	               
	            }else {
	               //readBoardNo 가 쿠키에 있을 때
	               // "readBoardNo" 가 쿠키에 있을 때
	               // "readBoardNo" : [2][30][400][2000][4000]
	               
	               // 글을 처음 읽는 경우
	               //찾지 못하면 
	               if(c.getValue().indexOf("[" + boardNo + "]") == -1) {
	                  c.setValue(c.getValue() + "[" + boardNo + "]");
	                  result = service.updateReadCount(boardNo);
	               }
	               
	               // 먼저 조회된 board의 readCount 값을
	               // result 값으로 변환
	               
	            
	               
	               if( result > 0) {
	                  board.setReadCount(result);
	                  
	                  // 적용 경로 설정
	                  c.setPath("/");
	                  
	                  LocalDateTime now = LocalDateTime.now();
	                  
	                  // 다음날 자정
	                  
	                  LocalDateTime nextDateMidnight = now.plusDays(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
	                  
	                  
	                  // 다음날 자정까지 남은 시간 계산 (초 단위)
	                  long secondUntileNextDay = Duration.between(now, nextDateMidnight).getSeconds();
	                  
	                  c.setMaxAge((int)secondUntileNextDay);
	                  
	                  resp.addCookie(c);
	               }
	            }
	           
	         }

         // 쿠키 이용한 증가하기
       
	         path = "board/boardDetail";
	         
	         // board - 게시글 일반내용 + imgList + commentList
	         model.addAttribute("board", board);
	     
	         // 조회된 이미지 목록 (imageList) 가 있을 경우
	         if(!board.getImgList().isEmpty()) {
	            
//	            BoardImg thumbnail = null;
	            // imageList 의 0번 인덱스 == 가장 빠른 순서 (imgOrder)
	            // 이미지 목록의 첫번째 행이 순서 0 == 썸네일 인 경우 
	               model.addAttribute("start", 0);
	         }
	      }
	      model.addAttribute("cp",cp);
	      
	      
	      
	      return path;
	}
	
	/** 게시글 작성 페이지 이동
	 * @return
	 */
	@GetMapping("write")
	public String boardWrite(@RequestParam(value="cp", required=false, defaultValue = "1")int cp,
							Model model) {
		
		model.addAttribute("cp", cp);
		
		return "board/boardWrite";
		
	}
	
	/** 게시글 작성
	 * @param board
	 * @return
	 */
	@PostMapping("write")
	public String boardWrite(Board inputBoard,
							@SessionAttribute("loginMember") Member loginMember,
							@RequestParam("imgFiles")List<MultipartFile> imgFiles,
							RedirectAttributes ra) throws IllegalStateException, IOException {
		
		// 회원 번호 , 제목, 내용 넣기
		inputBoard.setMemberNo(loginMember.getMemberNo());
		
		// 게시글 작성
		int boardNo = service.boardWrite(inputBoard, imgFiles);
		
		
		// 3. 서비스 결과에 따라 message, 리다이렉트 경로 지정
		String path = null;
		String message = null;
		
		if(boardNo > 0) {
			path = "/board/" + boardNo;
			message = boardNo + "번 게시글이 작성 되었습니다!";
		
		} else {
			path = "write";
			message = "게시글 작성 실패..";
	
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:" + path;
	}
	
	
	/** 게시글 좋아요 체크/해제
	    * @param map
	    * @return count
	    */
	   @ResponseBody
	   @PostMapping("like")
	   public int boardLike(@RequestBody Map<String, Integer> map) {
	      
	      return service.boardLike(map);
	      
	   }

}
