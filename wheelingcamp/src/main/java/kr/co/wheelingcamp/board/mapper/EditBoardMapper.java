package kr.co.wheelingcamp.board.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import kr.co.wheelingcamp.board.dto.Board;
import kr.co.wheelingcamp.file.model.dto.BoardImage;

@Mapper
public interface EditBoardMapper {

	int boardUpdate(Board inputBoard);

	int deleteImage(Map<String, Object> map);

	int updateImage(BoardImage img);

	int insertImage(BoardImage img);

}
