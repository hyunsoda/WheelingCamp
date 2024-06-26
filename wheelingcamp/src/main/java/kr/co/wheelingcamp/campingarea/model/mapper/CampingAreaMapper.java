package kr.co.wheelingcamp.campingarea.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import kr.co.wheelingcamp.campingarea.model.dto.CampingArea;

@Mapper
public interface CampingAreaMapper {

	List<CampingArea> selectHompageAll();

	int deleteAll(@Param("deleteList") List<CampingArea> deleteList);

	int getListCount(String location);

	List<CampingArea> selectCampingAreaAll(int locationNo, RowBounds rowBounds);

}
