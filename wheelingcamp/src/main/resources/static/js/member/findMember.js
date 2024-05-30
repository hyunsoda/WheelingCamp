// // // console.log("아이디,비밀번호찾기 js 연결");



// 인증 방법을 나타내는 변수
// 1은 휴대폰, 2는 이메일
let idAuth = 1;
let pwAuth = 1;

// 인증 방법 나타내는 변수 복제
let cloneAuth = 0;
let responseAuth = 0;
//                     입력할 input,   다른 input,   인증수단, inputradio, 찾을 정보 1은 아이디 2는 비밀번호
const radioDisabled = (inputElement, otherElement, checkAuth, radio, find) => {

    radio.addEventListener("click", () => {

        // 아이디 찾기

        // 찾을 정보가 1 아이디라면 idAuth 변수 사용
        if(find == 1){
            cloneAuth = idAuth;
            responseAuth = 1;

        // 찾을 정보가 1 아이디라면 pwAuth 변수 사용
        }else{
            cloneAuth = pwAuth;
            responseAuth = 2;
        }

        // 복제한 인증방법 변수와 클릭한 인증 수단을 비교해서 같지 않으면 인증수단 변경(휴대폰 <-> 이메일)
        if(checkAuth != cloneAuth){
            otherElement.value = "";
            otherElement.disabled = true;
            inputElement.disabled = false;
            inputElement.focus();
            
            if(responseAuth == 1){
                idAuth = checkAuth;
            }else{
                pwAuth = checkAuth;
            }
        }

    })

}; 




//// 인증번호 요청을 눌렀을때 input에 입력한 휴대폰/이메일 유효성 검사 하기
const requestAuthNumber = (buttonElement, inputElement, checkAuth) => {
    buttonElement.addEventListener("click", () => {

        let req = "";

        // checkAuth -> 인증 수단 1은 휴대폰, 2는 이메일
        if(checkAuth == 1){
            req = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;
        }else{
            req = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
        }

        // 입력한 인증수단 input 유효성 검사를 통과 못했을 경우
        if(!req.test(inputElement.value)){
            if(checkAuth == 1){
                alert("휴대폰 번호를 확인해주세요.");
            }else{
                alert("이메일 형식을 확인해주세요.");
            }
        };

    })
}





// 아이디 찾기/비밀번호 찾기 버튼을 눌렀을때 이름/아이디를 입력하고 인증번호를 입력했는지, 그 전에 인증번호를 요청했는지 확인
//                  찾기버튼, 회원 정보, 인증번호input, 찾는 정보 1은 아이디, 2는 비밀번호
const findUserInfo = (button, userInfo, inputElement, checkAuth, radios, phoneNo, email) => {
    button.addEventListener("click", (e) => {


        // 들어온 회원 정보(아이디-이름/비밀번호-아이디)가 빈칸일 때
        if(userInfo.value == ""){
            if(checkAuth == 1){
                alert("이름을 입력해주세요");
            }else{
                alert("아이디를 입력해주세요");
            }

            e.preventDefault();
            return;

        }

        // 인증번호 input이 빈칸일때
        if(inputElement.value == ""){
            alert("인증번호를 입력해주세요");

            e.preventDefault();
            return;
        }



        // 인증 번호를 요청 한 뒤에 휴대폰/이메일 입력 을 변경할 수 있으므로 다시 한번 유효성 검사
        let req = "";
        let methodAuth = 0; // 인증 수단
        
        if(radios[0].checked == true){
            req = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;
            methodAuth = 1;
        }else{
            req = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
            methodAuth = 2;
        }


        // 
        if(methodAuth == 1){
            if(!req.test(phoneNo.value)){
                alert("휴대폰 번호를 확인해주세요.");
                e.preventDefault();
                return;
            }
        }else{
            if(!req.test(email.value)){
                alert("이메일 형식을 확인해주세요.");
                e.preventDefault();
                return;
            }
        }

        

    })
}






// 아이디 관련 요소들
const idMemberPhoneNo = document.getElementById("idMemberPhoneNo");
const idMemberEmail = document.getElementById("idMemberEmail");
const idRadios = document.getElementsByName("idRadio");
const idTelRequestAuth = document.getElementById("idTelRequestAuth");
const idEmailRequestAuth = document.getElementById("idEmailRequestAuth");
const memberName = document.querySelector("[name=memberName]");
const findIdButton = document.getElementById("findIdButton");
const idAuthNum = document.getElementById("idAuthNum");

// 비밀번호 관련 요소들
const pwMemberPhoneNo = document.getElementById("pwMemberPhoneNo");
const pwMemberEmail = document.getElementById("pwMemberEmail");
const pwRadios = document.getElementsByName("pwRadio");
const pwTelRequestAuth = document.getElementById("pwTelRequestAuth");
const pwEmailRequestAuth = document.getElementById("pwEmailRequestAuth");
const memberId = document.querySelectorAll("[name=memberId]");
const findPwButton = document.getElementById("findPwButton");
const pwAuthNum = document.getElementById("pwAuthNum");





// 아이디 관련 이벤트 리스너 추가
radioDisabled(idMemberPhoneNo, idMemberEmail, 1 , idRadios[0], 1);
radioDisabled(idMemberEmail, idMemberPhoneNo, 2 , idRadios[1], 1);
requestAuthNumber(idTelRequestAuth, idMemberPhoneNo, 1);
requestAuthNumber(idEmailRequestAuth, idMemberEmail, 2);
findUserInfo(findIdButton, memberName, idAuthNum, 1, idRadios, idMemberPhoneNo, idMemberEmail);

// 비밀번호 관련 이벤트 리스너 추가
radioDisabled(pwMemberPhoneNo, pwMemberEmail, 1, pwRadios[0] ,2);
radioDisabled(pwMemberEmail, pwMemberPhoneNo, 2, pwRadios[1], 2);
requestAuthNumber(pwTelRequestAuth, pwMemberPhoneNo, 1);
requestAuthNumber(pwEmailRequestAuth, pwMemberEmail, 2);
findUserInfo(findPwButton, memberId[1], pwAuthNum, 2, pwRadios, pwMemberPhoneNo, pwMemberEmail);



