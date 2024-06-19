import React from 'react';
import { Link } from 'react-router-dom';

const Info = () => {
  return (
    <>
      <div>관리자 메인 페이지</div>
      <div>
        <Link to={'/member'}>회원 관리 페이지</Link>
      </div>
      <div>
        <Link to={'/item'}>상품 관리 페이지</Link>
      </div>
    </>
  );
};

export default Info;
