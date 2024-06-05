package kr.co.wheelingcamp.board.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import groovy.util.logging.Slf4j;
import kr.co.wheelingcamp.board.dto.Comment;
import kr.co.wheelingcamp.board.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;


public interface CommentService {

	List<Comment> select(int boardNo);

	int insert(Comment comment);

	int update(Comment comment);

	int delete(int commentNo);

}
