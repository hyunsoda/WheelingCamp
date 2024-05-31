package kr.co.wheelingcamp.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BoardController {

	/**board test중(민경)
	 * @return
	 */
	@RequestMapping("board")
	public String board() {
		return "smarteditor/updateBoard";
	}

}
