import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {
    const [inputValue, setInputValue] = useState(''); 
    const [value, setValue] = useState(''); 

    const handleLogin = ()=>{

        console.log(inputValue);
        setValue(inputValue);

        if(inputValue.length===0){
            alert("비밀번호를 입력해주세요.");
            setInputValue("");
            return;
        }

        axios.post('/manage/login',inputValue)
        .then(res=>{
            console.log(res.data);
            if(res.data ===1){
                sessionStorage.setItem('loginMember', 'loginMember');
                
                window.location.href='/';
            }else{
                alert("비밀번호를 확인해주세요.");
            }
            setInputValue("");
        });
    }

  return (
    <div style={{width:'100%', height:'100vh', backgroundColor:'#82a3ca'}}>
        <div style={{color:'white', display:'flex', flexDirection:'column', 
        justifyContent:'center', alignItems:'center', paddingTop:'130px'}}>
            <h1 style={{fontSize:'65px', marginBottom:'10px'}}>Wheeling Camp</h1>
            <h2 style={{fontSize:'45px', marginTop:'10px'}}>Management System</h2>
        </div>

        <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'40px'}}>
           
                <input type='password' style={{width:'300px', height:'35px', fontSize:'30px'}} value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>

                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', marginLeft:'10px',alignItems:'center',textAlign:'center'}}>
                    <button style={{backgroundColor:'#82a3ca', border:'none', cursor:'pointer', justifyContent:'center'}} onClick={handleLogin}>
                        <h3 style={{fontSize: '30px', color:'white', fontWeight:'450', textAlign:'center'}}>Login</h3>
                    </button>
                </div>
            
            
        </div>
    </div>
  )
}

export default Login