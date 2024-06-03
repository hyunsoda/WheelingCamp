package kr.co.wheelingcamp.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("editBoard")
@lombok.extern.slf4j.Slf4j
public class EditBoardController {
		
	@GetMapping("update/{boardNo:[0-9]+}")
	public String boardUpdate(
			@PathVariable("boardNo") int boardNo,
			@RequestParam("cp") int cp
			) {
		
		log.info("cp:" + cp);
		log.info("boardNo:" + boardNo);
		
		return "board/boardUpdate";
	}
}
