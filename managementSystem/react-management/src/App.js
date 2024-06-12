import './App.css';
import Info from './manage/Info';
import Mypage from './manage/Mypage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
     
        <BrowserRouter>
          <Routes>
              <Route path={"/manage/info"} element={<Info />}></Route>
              <Route path={"/user/mypage"} element={<Mypage />}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;