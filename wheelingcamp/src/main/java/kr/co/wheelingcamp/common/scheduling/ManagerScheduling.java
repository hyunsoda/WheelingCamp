package kr.co.wheelingcamp.common.scheduling;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import kr.co.wheelingcamp.manage.model.mapper.ManageMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component  // Bean 등록 
@RequiredArgsConstructor
public class ManagerScheduling {


	private final ManageMapper mapper;
	
	@Scheduled(cron = "0 0 9 * * *")
	public void scheduling() {
		log.info("확인");
		int carResult = mapper.insertCarView();
		int campEquipmentResult = mapper.insertEquipmentView();
		int packageResult = mapper.insertPackageView();
	}
	
}
