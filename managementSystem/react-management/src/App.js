import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Info from './pages/Home';
import Item from './pages/Item';
import Member from './pages/Member';
import Order from './pages/Order';
import Login from './pages/Login';

function App() {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if(sessionStorage.getItem('loginMember') === null){
      
    } else {
    // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
    // 로그인 상태 변경
      setIsLogin(true);
    }
  })

  return (
    <div>
    <BrowserRouter>
      <Routes>
        {/* 관리자 메인 페이지 */}
      {!isLogin?
          <Route path='/' element={<Login/>}/>
          :
        <Route element={<Layout />}>
          <Route path="/" element={<Info />} />
          {/* 상품 관리 페이지 */}
          <Route path="/Item" element={<Item />} />
          {/* 회원 관리 페이지*/}
          <Route path="/Member" element={<Member />} />
          {/* 대여 관리 페이지*/}
          <Route path="/Order" element={<Order />} />
          {/* 구매 관리 페이지*/}
          <Route path="/Order" element={<Order />} />
        </Route>  }
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
