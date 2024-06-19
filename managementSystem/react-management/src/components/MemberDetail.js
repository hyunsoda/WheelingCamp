import React, { useState } from 'react'


const MemberDetail = (props) => {
    const {memberNo,memberId,memberName,memberEmail,memberPhoneNo,
        memberNickName,memberAddress,memberBirth,memberEnrollDate,memberDelFl,
        license} = props;
   
    const [member,setMember] = useState([{memberNo:props.memberNo, 
                                        memberId : props.memberId,
                                        memberName : props.memberName,
                                        memberEmail : props.memberEmail,
                                        memberPhoneNo : props.memberPhoneNo,
                                        memberNickName : props.memberNickName,
                                        memberAddress : props.memberAddress,
                                        memberBirth : props.memberBirth,
                                        memberEnrollDate : props.memberEnrollDate,
                                        memberDelFl : props.memberDelFl,
                                        license : props.license }]); 

    const [inputValue, setInputValue] = useState([]);
    const content = `안녕하세요 제 이름은 ${props.memberNo}이고,${memberId}`;


    // const handleToggleTodo = (index) => {
    //     // 얕은 복사 방법 2 번째 : 전개(spread) 연산자 이용
    //     // - 배열이나 객체의 모든 요소를 개별적으로 펼쳐서 새로운 배열이나 객체를 생성할 때 사용
    //     const newTodos = [...todos];

    //     // 해당 인덱스의 todo 항목의 isDone 값을 반전
    //     newTodos[index].isDone = !newTodos[index].isDone;

    //     // 새로운 배열로 상태를 업데이트
    //     setTodos(newTodos);

    // }
   const test = (abc)=>{
    console.log(abc);
    console.log(inputValue);
   }


  return (
    <table>
    {  // map : 배열을 순회하며 뿌리는 함수
        member.map((mem,index) =>(  
            <>
            <ul >
                  <li><input placeholder={mem.memberNo} value={inputValue[index]} onChange={(e) => setInputValue(e.target.value)} ></input> </li> 
                  <li> <input placeholder={mem.memberId} value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input> </li>
                  <li> <input placeholder={mem.memberName}></input> </li>
                  <li> <input placeholder={mem.memberEmail}></input> </li>
                  <li> <input placeholder={mem.memberPhoneNo}></input> </li>
                  <li> <input placeholder={mem.memberNickName}></input> </li>
                  <li> <input placeholder={mem.memberAddress}></input> </li>
                  <li> <input placeholder={mem.memberBirth}></input> </li>
                  <li> <input placeholder={mem.memberEnrollDate}></input> </li>
                  <li> <input placeholder={mem.memberDelFl}></input> </li>
                  <li> <input placeholder={mem.license}></input> </li>
                    

                
            </ul>
                <button onClick={()=>test(mem.memberNo)}>수정</button>
           
            </>

        ))
    }
</table>
  )
}

export default MemberDetail