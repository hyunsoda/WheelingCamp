package kr.co.wheelingcamp.board.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import groovy.util.logging.Slf4j;
import kr.co.wheelingcamp.board.dto.Comment;
import kr.co.wheelingcamp.board.mapper.BoardMapper;
import kr.co.wheelingcamp.board.mapper.CommentMapper;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService{
     private final CommentMapper mapper;

  // 댓글 목록 조회
     @Override
     public List<Comment> select(int boardNo) {
        
        return mapper.select(boardNo);
     }
     
     // 댓글 등록
     @Override
     public int insert(Comment comment) {
        return mapper.insert(comment);
     }
     
     
     @Override
     public int update(Comment comment) {

        return mapper.update(comment);
     }
     
     
     @Override
     public int delete(int commentNo) {

        return mapper.delete(commentNo);
     }
}
