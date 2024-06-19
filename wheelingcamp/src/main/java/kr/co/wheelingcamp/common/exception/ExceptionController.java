package kr.co.wheelingcamp.common.exception;

import org.apache.coyote.BadRequestException;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.MethodNotAllowedException;

@ControllerAdvice
public class ExceptionController {
		
	   @ExceptionHandler(BadRequestException.class)
	    public String handleBadRequestException(BadRequestException e, Model model) {
//	        e.printStackTrace();
	        model.addAttribute("e", e.getMessage());
	        return "error/404"; // 404 에러 페이지 경로
	    }

	    @ExceptionHandler(MethodNotAllowedException.class)
	    public String handleMethodNotAllowedException(MethodNotAllowedException e, Model model) {
//	        e.printStackTrace();
	        model.addAttribute("e", e.getMessage());
	        return "error/405"; // 405 에러 페이지 경로
	    }

	    @ExceptionHandler(Exception.class)
	    public String handleAllExceptions(Exception e, Model model) {
//	        e.printStackTrace();
	        model.addAttribute("e", e);
	        return "error/500"; // 500 에러 페이지 경로
	    }
	
}
