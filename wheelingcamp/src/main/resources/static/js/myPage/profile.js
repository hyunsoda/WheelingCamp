// 필수 유효성 검사를 위한 객체
const checkObj = {
    memberEmail: false, // 이메일
    memberNickName: false, // 닉네임
    memberName: false, // 실명
    memberPhoneNo: false, // 휴대폰 번호
    memberBirth: false, // 생년월일
  };
  
  // 입력받은 회원 정보 (input) 객체
  const inputObj = {

      memberEmail : document.getElementById("memberEmail"), // 입력 이메일
      memberNickName : document.getElementById("memberNickName"), // 입력 닉네임
      memberName : document.getElementById("memberName"), // 입력 실명
      memberPhoneNo : document.getElementById("memberPhoneNo"), // 입력 휴대폰 번호
      memberBirth : document.getElementById("memberBirth") // 입력 생년월일
  }; 
  
  // 메시지 출력용 span
  const messageObj = {
      memberEmail : document.getElementById("emailMessage"), // 이메일 유효성 검사 메시지
      memberNickName : document.getElementById("nickNameMessage"), // 닉네임 유효성 검사 메시지
      memberName : document.getElementById("nameMessage"), // 실명 유효성 검사 메시지
      memberPhoneNo : document.getElementById("phoneNoMessage"), // 휴대폰 번호 유효성 검사 메시지
      memberBirth : document.getElementById("birthMessage") // 생년월일 유효성 검사 메시지
  }; 
  
  // 유효성 검사용 정규식
  const reqObj = {
    memberEmail:
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
    memberNickName: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/, // 닉네임 유효성 검사
    memberName: /^[가-힣]{2,6}$/, // 이름 유효성 검사
    memberPhoneNo: /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/, // 전화번호 유효성 검사
    memberBirth:
      /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/, // 생년월일 유효성 검사
  };
  
  for (const key in inputObj) {
    inputObj[key].addEventListener('input', e => {
        
      // 빈칸 입력시 공백 제거
      if(e.target.value.trim().length === 0) {
          
          if(messageObj[key] != null) {
              messageObj[key].innerText = "";
          }
  
          e.target.value = "";
  
          return;
      }
  
      if (reqObj[key] != null) {
        // 유효성 검사를 해야하는 요소일 때
        // 유효성 검사 실행
        if (!reqObj[key].test(e.target.value)) {
          // 유효하지 않을 때
          messageObj[key].innerText = "유효한 형식이 아닙니다.";
          checkObj[key] = false;
          return;
        }
  
        // 유효성 검사 성공 메시지를 띄움
        messageObj[key].innerText = '유효한 형식입니다.';
  
        // 유효성 검사 객체의 값을 변경
        checkObj[key] = true;
  
      } 
    });
  }
  
  // 회원가입 데이터 form 요소
  document.getElementById('signUpForm').addEventListener('submit', (e) => {
  
    // 유효성 검사 객체의 요소들이 모두 true 인지 검사
    for (const key in checkObj) {
      // 1개라도 유효성 검사 실패 시 submit 막기
      if (checkObj[key] == false) {
        let str;
        switch (key) {
          case 'memberEmail':
            str = '이메일을';
            break;
          case 'memberNickName':
            str = '닉네임을';
            break;
          case 'memberName':
            str = '이름을';
            break;
          case 'memberPhoneNo':
            str = '전화번호를';
            break;
          case 'memberBirth':
            str = '생년월일을';
            break;
        }
  
        alert(str + ' 확인해 주세요');
        inputObj[key].focus();
        e.preventDefault();
  
        return;
      }
    }
  });
  
  
  //====================================================================
  //비밀번호 변경
  const newPw = document.querySelector('#newPw');
  const newPwConfirm = document.querySelector('#newPwConfirm');
  const updatePwMessage = document.querySelector('#updatePwMessage');
  const currentPw = document.querySelector('#currentPw');
  
  const checkUpdatePw = () => {
    if (newPw.value == newPwConfirm.value) {
      updatePwMessage.innerText = '';
      updatePwMessage.innerText = '비밀번호가 일치합니다';
      return;
    }
    updatePwMessage.innerText = '비밀번호가 일치하지 않습니다';
  };
  
  newPw.addEventListener('input', (e) => {
    const inputNewPw = e.target.value;
  
    if (inputNewPw.trim().length == 0) {
      updatePwMessage.innerText =
        '비밀번호는 최소 6자에서 16자까지, 영문자,숫자,특수문자를 포함해야합니다.';
      newPw.value = '';
      return;
    }
  
    if (newPwConfirm.value.trim().length == 0) {
      updatePwMessage.innerText = '변경할 비밀번호를 한번 더 입력해주세요';
      return;
    }
    const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{6,16}$/;
  
    if (!regExp.test(inputNewPw)) {
      updatePwMessage.innerText = '비밀번호가 유효하지 않습니다.';
  
      return;
    }
  
    updatePwMessage.innerText = '유효한 비밀번호 형식입니다';
    if (newPwConfirm.value.length > 0) {
      checkUpdatePw();
    }
  });
  
  newPwConfirm.addEventListener('input', () => {
    if (newPw.value.length !== 0) {
      checkUpdatePw();
      return;
    }
  });
  
  // 비밀번호 변경 ajax
  const updatePwForm = document.querySelector('#updatePwForm');
  
  updatePwForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    if (currentPw.value.trim() == 0) {
      alert('현재 비밀번호를 입력해 주세요.');
      e.preventDefault();
      return;
    }
    fetch('/user/changePw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        currentPw: currentPw.value,
        newPw: newPw.value,
      }),
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result == 0) {
          alert('현재 비밀번호가 일치하지 않습니다.');
          e.preventDefault();
          return;
        }
        if (result == 2) {
          alert('현재 비밀번호와 변경된 비밀번호가 일치합니다.');
          e.preventDefault();
          return;
        }
        if (result == 1) {
          alert('비밀번호가 변경되었습니다.');
          window.location.href = '/user/myPage';
        }
      });
  });
  
  //=========================================================================
  // 회원 탈퇴 (성공!)
  
  const checkSignout = {
    agreeSignout: false,
    currentPwConfirm: false,
  };
  
  const currentPwConfirm = document.querySelector('#currentPwConfirm');
  const agreeSignout = document.querySelector('#agreeSignout');
  const currentPwConfirmMessage = document.querySelector(
    '#currentPwConfirmMessage'
  );
  const signoutBtn = document.querySelector('#signoutBtn');
  
  const signoutForm = document.querySelector('#signoutForm');
  
  // 비밀번호 입력 시 이벤트
  currentPwConfirm.addEventListener('input', () => {
    if (currentPwConfirm.value.trim().length == 0) {
      currentPwConfirmMessage.innerText = '비밀번호를 입력해주세요';
      checkSignout.currentPwConfirm = false;
      return;
    }
  
    const inputPw = currentPwConfirm.value;
    fetch('/user/checkPw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: inputPw,
    })
      .then((resp) => resp.text())
      .then((result) => {
        if (result == 0) {
          currentPwConfirmMessage.innerText = '비밀번호 불일치';
          checkSignout.currentPwConfirm = false;
          return;
        }
        currentPwConfirmMessage.innerText = '비밀번호 일치';
        checkSignout.currentPwConfirm = true;
      });
  });
  
  // 동의체크박스
  agreeSignout.addEventListener('change', (e) => {
    console.log(e.target.checked);
    if (e.target.checked) checkSignout.agreeSignout = true;
    else checkSignout.agreeSignout = false;
  });
  
  // 최종 서브밋 될 때 이벤트
  signoutForm.addEventListener('submit', (e) => {
    if (!checkSignout.agreeSignout) {
      e.preventDefault();
      alert('탈퇴 약관에 동의해주세요');
      return;
    }
  
    if (!checkSignout.currentPwConfirm) {
      e.preventDefault();
      alert('비밀번호가 일치하지 않습니다');
      return;
    }
  
    alert('탈퇴 되었습니다!');
    return true;
  });