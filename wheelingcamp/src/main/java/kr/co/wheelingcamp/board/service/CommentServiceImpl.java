package kr.co.wheelingcamp.board.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import groovy.util.logging.Slf4j;
import kr.co.wheelingcamp.badge.model.mapper.BadgeMapper;
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
     private final BadgeMapper badgeMapper;

  // 댓글 목록 조회
     @Override
     public List<Comment> select(int boardNo) {
        
        return mapper.select(boardNo);
     }
     
     // 댓글 등록
     @Override
     public int insert(Comment comment) {
        int result= mapper.insert(comment);
        
        if(result > 0) {
        	
        	int memberNo=comment.getMemberNo();
        	// 댓글 수 조회하기
        	int commentCount= badgeMapper.countComment(memberNo);    	

        	// 댓글 수 50개 이상인경우 8번뱃지 수여
        	if(commentCount >=50) {
        		badgeMapper.updateComment50thBadge(memberNo);
        	}
        	// 댓글 수 100개 이상인경우 9번 뱃지 수여
        	if(commentCount >= 100) {
        		badgeMapper.updateComment100thBadge(memberNo);
        	}
        		
        	}

        return -1;
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
