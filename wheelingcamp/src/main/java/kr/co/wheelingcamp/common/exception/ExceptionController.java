package kr.co.wheelingcamp.common.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;

import lombok.extern.slf4j.Slf4j;

//@ControllerAdvice
//@Slf4j
public class ExceptionController {

//	@ExceptionHandler(BadRequestException.class)
//	public String handleBadRequestException(BadRequestException e, Model model) {
//		StringWriter sw = new StringWriter();
//		PrintWriter pw = new PrintWriter(sw);
//		e.printStackTrace(pw);
//		String stackTrace = sw.toString();
//
//		model.addAttribute("e", e);
//		return "error/404"; // 404 에러 페이지 경로
//	}
//
//	@ExceptionHandler(MethodNotAllowedException.class)
//	public String handleMethodNotAllowedException(MethodNotAllowedException e, Model model) {
//		StringWriter sw = new StringWriter();
//		PrintWriter pw = new PrintWriter(sw);
//		e.printStackTrace(pw);
//		String stackTrace = sw.toString();
//
//		model.addAttribute("e", e);
//		return "error/405"; // 405 에러 페이지 경로
//	}
//
//	@ExceptionHandler(Exception.class)
//	public String handleError(Exception e, Model model) {
//		StringWriter sw = new StringWriter();
//		PrintWriter pw = new PrintWriter(sw);
//		e.printStackTrace(pw);
//		String stackTrace = sw.toString();
//
//		model.addAttribute("e", e);
//		return "error/500";
//	}

//	 @ExceptionHandler(BadRequestException.class)
//	    public String handleBadRequestException(BadRequestException e, Model model) {
//	        e.printStackTrace();
//	        model.addAttribute("e", e);
//	        return "error/404"; // 혹은 적절한 에러 페이지 경로
//	    }
//
//	    @ExceptionHandler(MethodNotAllowedException.class)
//	    public String handleMethodNotAllowedException(MethodNotAllowedException e, Model model) {
//	        e.printStackTrace();
//	        model.addAttribute("e", e);
//	        return "error/405"; // 혹은 적절한 에러 페이지 경로
//	    }
//
//    @ExceptionHandler({ Exception.class })
//    protected String handleServerException(Exception ex) {
////        return new ResponseEntity(new ErrorDto(INTERNAL_SERVER_ERROR.getStatus(), INTERNAL_SERVER_ERROR.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
//    	return "error/sum";

//    @ExceptionHandler(Exception.class)
//    public String AllException(Exception e, Model model) {
//    	e.printStackTrace();
//        model.addAttribute("e", e);
//        return "error/sum"; // 혹은 적절한 에러 페이지 경로
//    }

}
