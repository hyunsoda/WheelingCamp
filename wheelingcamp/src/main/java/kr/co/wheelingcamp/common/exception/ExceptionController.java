package kr.co.wheelingcamp.common.exception;

import java.io.IOException;
import java.sql.SQLException;

import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.MethodNotAllowedException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@ControllerAdvice
public class ExceptionController {
		
	 @ExceptionHandler(BadRequestException.class)
	    public String handleBadRequestException(BadRequestException e, Model model) {
	        e.printStackTrace();
	        model.addAttribute("e", e);
	        return "error/404"; // 혹은 적절한 에러 페이지 경로
	    }

	    @ExceptionHandler(MethodNotAllowedException.class)
	    public String handleMethodNotAllowedException(MethodNotAllowedException e, Model model) {
	        e.printStackTrace();
	        model.addAttribute("e", e);
	        return "error/405"; // 혹은 적절한 에러 페이지 경로
	    }

    @ExceptionHandler({ Exception.class })
    protected String handleServerException(Exception ex) {
//        return new ResponseEntity(new ErrorDto(INTERNAL_SERVER_ERROR.getStatus(), INTERNAL_SERVER_ERROR.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    	return "error/sum";
    }
	
}
