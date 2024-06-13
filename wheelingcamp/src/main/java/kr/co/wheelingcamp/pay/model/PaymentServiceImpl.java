package kr.co.wheelingcamp.pay.model;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService{
  
	
	 private PaymentMapper mapper;

	@Override
	public int setPayList(Map<String, Object> map) {
		
		
		
		
		return mapper.setPayList(map);
	}
	 
}
