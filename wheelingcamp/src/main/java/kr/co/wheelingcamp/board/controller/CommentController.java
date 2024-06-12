package kr.co.wheelingcamp.board.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.wheelingcamp.board.dto.Comment;
import kr.co.wheelingcamp.board.service.CommentService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("comment")
@RequiredArgsConstructor
public class CommentController {
 private final CommentService service;
 
 /** 댓글 목록 조회
  * @param boardNo
  * @return
  */
 @GetMapping("")     // /comment
 public List<Comment> select(@RequestParam("boardNo") int boardNo){
    
    // HttpMessageConverter가 
    // List -> JSON (문자열)로 변환해서 응답
    
    return service.select(boardNo);
    
 }
 
 
 
 /** 댓글/답글 등록
  * @return
  */
 @PostMapping("")
 public int insert(@RequestBody Comment comment) { // 보낸 데이터들과 DTO의 이름이 같음
    
    
    return service.insert(comment);
    
 }
 
 
 /**  댓글 수정
  * @param comment
  * @return
  */
 @PutMapping("")
 public int update(@RequestBody Comment comment) {
    
    return service.update(comment);
 }
 
 @DeleteMapping("")
 public int delete(@RequestBody int commentNo) {
    
	 System.out.println("댓글 ㅎ안들어오너요 : " + commentNo);
	 
    return service.delete(commentNo);
 }
 
}
