import axios from "axios";
import { useState,useEffect } from "react";

const Member = () => {

    const [memberList, setMemberList] = useState([]);
    const [memberNo,setMemberNo] = useState('');

    useEffect(()=>{
        axios.get("/manage/selectAllMember",{
           
        }).then(data => {
            setMemberList(data.data);

        })
        
    },[]);


    const sortMemberList=(e)=>{
        axios.get(`/manage/selectAllMember?sortNo=${e}`)
        .then(data => {
            setMemberList(data.data);
         
        })
        
    };

    const selectOneMember = (e) => {
        axios.get(`/manage/selectOneMember?memberNo=${e}`)
    .then(data => {
        console.log(data);
    })
}
    


    return(
        <div >
            <h1>회원 목록 조회</h1>
            <>
                <button onClick={()=>{sortMemberList(1)}}  >이름순</button>
                <button onClick={()=>{sortMemberList(2)}}>자격증 있는 회원 조회</button>
                <button onClick={()=>{sortMemberList(3)}}>탈퇴 회원 조회</button>
            </>
            <table border={1}>
                <thead>
                    <tr>
                            <th>번호</th>
                            <th>회원 번호</th>
                            <th>이름</th>
                            <th>닉네임</th>
                            <th>이메일</th>
                            <th>주소</th>
                            <th>전화번호</th>
                            <th>생년월일</th>
                            <th>가입일</th>
                            <th>운전 면허 여부</th>
                            <th>탈퇴 여부</th>
                            <th></th>
                            <th></th>
                        </tr>
                </thead>
                <tbody>
                    {memberList && memberList.map((member, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{member.memberNo}</td>
                                <td>{member.memberName}</td>
                                <td>{member.memberNickName}</td>
                                <td>{member.memberEmail}</td>
                                <td>{member.memberAddress}</td>
                                <td>{member.memberPhoneNo}</td>
                                <td>{member.memberBirth}</td>
                                <td>{member.memberEnrollDate}</td>
                                <td>{member.license}</td>
                                <td>{member.memberDelFl}</td>
                                <td><button onClick={(e)=>{selectOneMember(e.target.value)}} value={member.memberNo}>조회</button></td>
                                <td><button>삭제</button></td>
                            </tr>
                            ))}
                
                </tbody>
            </table>
        </div>
    ); 
}

export default Member;