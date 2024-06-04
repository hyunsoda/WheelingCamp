package kr.co.wheelingcamp.board.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import groovy.util.logging.Slf4j;
import kr.co.wheelingcamp.board.dto.Board;
import kr.co.wheelingcamp.board.service.BoardService;
import kr.co.wheelingcamp.board.service.EditBoardService;
import kr.co.wheelingcamp.member.model.dto.Member;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("editBoard")
@lombok.extern.slf4j.Slf4j
@SessionAttributes({"loginMember"})
public class EditBoardController {
		
	private final BoardService service;
	
	private final EditBoardService editBoardService;
	
	@GetMapping("update/{boardNo:[0-9]+}")
	public String boardUpdate(
			@PathVariable("boardNo") int boardNo,
			@RequestParam("cp") int cp,
			@SessionAttribute("loginMember") Member loginMember,
			Model model,
			RedirectAttributes ra
			) {
		
		Map<String , Integer> map = new HashMap<String, Integer>();
       map.put("boardNo", boardNo);
       
       Board board = service.selectOne(map);
       
       model.addAttribute("board", board);
       model.addAttribute("cp", cp);
       model.addAttribute("start", 0);
      model.addAttribute("memberNo", loginMember.getMemberNo());       
       return "board/boardUpdate";
	}
	
	/** 게시판 수정 완료 메서드
	 * @return
	 */
	@PostMapping("{boardNo:[0-9]+}")
	public String updateComplete(
			@PathVariable("boardNo") int boardNo,
	         @RequestParam("cp") int cp,
	         Board inputBoard,
         @SessionAttribute("loginMember") Member loginMember,
	         @RequestParam("images") List<MultipartFile> images,
	         RedirectAttributes ra,
	         @RequestParam(value = "deleteOrder", required=false) String deleteOrder,
	         @RequestParam(value = "queryString", required=false, defaultValue = "") String queryString
			) {
		
			inputBoard.setBoardNo(boardNo);
			inputBoard.setMemberNo(loginMember.getMemberNo());	      
	      log.debug("images :" + images);      
	      
	      int result = editBoardService.boardUpdate(inputBoard, images, deleteOrder) ;
	      
	      // 3. 서비스 결과에 따라 응답 제어
	      
	      String message = null;
	      String path = null;
	      
	      if(result > 0) {
	         message = "게시글이 수정 되었습니다";
	         path = String.format("/board/%d?cp=%d", boardNo,cp);// editBoard/50?cp=1
	      }else {
	         message = "수정 실패";
	         path = String.format("/board/%d?cp=%d", boardNo,cp);      }
	      
	      ra.addFlashAttribute("message", message);
	      
	      
	      return "redirect:" + path;
		
	}
}
