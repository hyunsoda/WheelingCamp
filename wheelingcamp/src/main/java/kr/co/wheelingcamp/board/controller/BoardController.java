package kr.co.wheelingcamp.board.controller;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Arrays;
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
import kr.co.wheelingcamp.board.dto.Comment;
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
	    
	    // 1. 로그인이 되어있을 때만 map에 맴버 번호 넣기
	    if (loginMember != null) {
	        map.put("memberNo", loginMember.getMemberNo());
	    }
	    
	    // 2) 서비스 호출
	    Board board = service.selectOne(map);
	    
	    String path = null;
	    
	    if (board == null) {
	        path = "redirect:/board/boardInfo";
	        ra.addFlashAttribute("message", "게시글이 존재하지 않습니다");
	    } else {
	        // 여러 작업 추가
	        // 1. 비회원 또는 로그인한 회원의 글이 아닌 경우
	        if (loginMember == null || loginMember.getMemberNo() != board.getMemberNo()) {
	            Cookie[] cookies = req.getCookies();
	            
	            if (cookies != null) {  // 쿠키가 null인지 확인
	                Cookie c = null;
	                
	                for (Cookie temp : cookies) {
	                    if (temp.getName().equals("readBoardNo")) {
	                        c = temp;
	                        break;
	                    }
	                }
	                
	                int result = 0;
	                
	                if (c == null) {
	                    // 새 쿠키 생성
	                    c = new Cookie("readBoardNo", "[" + boardNo + "]");
	                    result = service.updateReadCount(boardNo);
	                } else {
	                    // readBoardNo가 쿠키에 있을 때
	                    if (c.getValue().indexOf("[" + boardNo + "]") == -1) {
	                        c.setValue(c.getValue() + "[" + boardNo + "]");
	                        result = service.updateReadCount(boardNo);
	                    }
	                }
	                
	                if (result > 0) {
	                    board.setReadCount(result);
	                    c.setPath("/");
	                    
	                    LocalDateTime now = LocalDateTime.now();
	                    LocalDateTime nextDateMidnight = now.plusDays(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
	                    long secondsUntilNextDay = Duration.between(now, nextDateMidnight).getSeconds();
	                    
	                    c.setMaxAge((int) secondsUntilNextDay);
	                    resp.addCookie(c);
	                }
	            }
	        }

	        path = "board/boardDetail";
	        model.addAttribute("board", board);
	        
	        if (!board.getImgList().isEmpty()) {
	            model.addAttribute("start", 0);
	        }
	    }
	    
	    model.addAttribute("cp", cp);
	    
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
	   
	   
	   @GetMapping("myPosts")
	   public String getMyPosts(Model model, @SessionAttribute("loginMember") Member loginMember,
			   @RequestParam(value="cp", required=false, defaultValue="1") int cp) {
	       if (loginMember != null) {
	           // 로그인된 사용자의 ID를 가져옴
	           String memberId = loginMember.getMemberId();
	           // memberId를 사용하여 해당 사용자가 작성한 글을 DB에서 조회
	           Map<String , Object> map = new HashMap<String, Object>();
	           map.put("memberId", memberId);
	           map.put("cp", cp);
	           
	     
	           Map<String , Object>  myPosts = service.getMyPosts(map);
	           
	            System.out.println(myPosts.get("pagination"));
	           
	           model.addAttribute("boardList", myPosts.get("boardList"));
	           model.addAttribute("pagination", myPosts.get("pagination"));
	           return "/board/my_posts"; // my_posts.html로 이동
	       } else {
	    	   return "redirect:/"; // 
	       }
	   }
	   
	   @GetMapping("myComments")
	   public String getComments(Model model, @SessionAttribute("loginMember") Member loginMember,
			   @RequestParam(value="cp", required=false, defaultValue="1") int cp) {
		   
		   if(loginMember != null) {
			   Map<String , Object> map = new HashMap<String, Object>();
			   map.put("memberNo", loginMember.getMemberNo());
			   map.put("cp", cp);
			   
			   Map<String , Object> maps = service.getComments(map);
			   
			   model.addAttribute("CommentList", maps.get("CommentList"));
	           model.addAttribute("pagination", maps.get("pagination"));
	           
	           return "/board/myCommentList";
			   
		   }else {
			   return "redirect:/";
		   }
		   
		   
		   
		   
		   
		   
		   
		  
		   
	   }

}
