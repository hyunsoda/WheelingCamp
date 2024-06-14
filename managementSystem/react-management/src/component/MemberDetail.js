import React from 'react'


const MemberDetail = (props) => {
    const {memberNo} = props;
   


    const content = `안녕하세요 제 이름은 ${memberNo}이고,`;

  return (
    <div>{content}</div>
  )
}

export default MemberDetail