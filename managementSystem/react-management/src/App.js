import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Info from './pages/Home';
import Item from './pages/Item';
import Member from './pages/Member';
import Order from './pages/Order';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 관리자 메인 페이지 */}
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
