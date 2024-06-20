package kr.co.wheelingcamp.common.exception;

import java.io.PrintWriter;
import java.io.StringWriter;

import org.apache.coyote.BadRequestException;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.MethodNotAllowedException;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class ExceptionController {
		
	   @ExceptionHandler(BadRequestException.class)
	    public String handleBadRequestException(BadRequestException e, Model model) {
          StringWriter sw = new StringWriter();
	        PrintWriter pw = new PrintWriter(sw);
	        e.printStackTrace(pw);
	        String stackTrace = sw.toString();

	        model.addAttribute("e", e);
	        return "error/404"; // 404 에러 페이지 경로
	    }

	    @ExceptionHandler(MethodNotAllowedException.class)
	    public String handleMethodNotAllowedException(MethodNotAllowedException e, Model model) {
	       StringWriter sw = new StringWriter();
	        PrintWriter pw = new PrintWriter(sw);
	        e.printStackTrace(pw);
	        String stackTrace = sw.toString();

	        model.addAttribute("e", e);
	        return "error/405"; // 405 에러 페이지 경로
	    }

//	    @ExceptionHandler(Exception.class)
//	    public String handleAllExceptions(Exception errorMessage, Model model) {
////	        e.printStackTrace();
//	        model.addAttribute("errorMessage", errorMessage.getMessage());
//	        return "error/errormessage"; // 500 에러 페이지 경로
//	   }
	    
	    @ExceptionHandler(Exception.class)
	    public String handleError(Exception e, Model model) {
	        StringWriter sw = new StringWriter();
	        PrintWriter pw = new PrintWriter(sw);
	        e.printStackTrace(pw);
	        String stackTrace = sw.toString();

	        model.addAttribute("e", e);
	        return "error/500";
	    }
	
}
