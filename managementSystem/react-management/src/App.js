import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Info from './manage/Info';
import Header from './fregment/Header';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/manage/info"} element={<Info/>} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
