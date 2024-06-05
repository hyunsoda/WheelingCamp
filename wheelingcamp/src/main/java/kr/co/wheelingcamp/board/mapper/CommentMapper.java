package kr.co.wheelingcamp.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.board.dto.Comment;

@Mapper
public interface CommentMapper {

	List<Comment> select(int boardNo);

	int insert(Comment comment);

	int update(Comment comment);

	int delete(int commentNo);

}
