package kr.co.wheelingcamp.file.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface FileMapper {

	int uploadImageList(@Param("uploadList") List uploadList, @Param("type") String type);

}
