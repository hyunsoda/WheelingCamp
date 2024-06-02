package kr.co.wheelingcamp.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("board")
public class BoardController {

	/**board test중(민경)
	 * @return
	 */
	@RequestMapping("update")
	public String board() {
		return "smarteditor/updateBoard";
	}

}
