import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Info from './pages/manage/Info';
import Item from './pages/manage/Item';
import Member from './pages/manage/Member';
import Test from './pages/manage/test';

function App() {


  return (
    <BrowserRouter>
      <Routes>
          {/* 관리자 메인 페이지 */}
          <Route path="/manage/info" element={<Info />}/>
          {/* 상품 관리 페이지 */}
          <Route path="/manage/item" element={<Item />}/>
          {/* 회원 관리 페이지*/}
          <Route path="/manage/member" element={<Member />}/>
          <Route path="/manage/test" element={<Test />}/>


          {/* 대여 관리 페이지*/}
          {/* 구매 관리 페이지*/}

      </Routes>
    </BrowserRouter>

  );
}

export default App;
