package kr.co.wheelingcamp.board.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.wheelingcamp.board.service.BoardService;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("board")
@RequiredArgsConstructor
public class BoardController {
	
	private final BoardService service;

	/**board test중(민경)
	 * @return
	 */
//	@RequestMapping("update")
//	public String board() {
//		return "smarteditor/updateBoard";
//	}
	
	
	@GetMapping("boardList")
	public String boardList(
			@RequestParam(value="cp", required=false, defaultValue="1") int cp,
			Model model
			) {
		
		Map<String, Object> map = null;
		
		map = service.selectBoardList(cp);
		
		model.addAttribute("pagination", map.get("pagination"));
		model.addAttribute("boardList", map.get("boardList"));
		
		
		
		
		return "board/boardInfo";
	}

}
