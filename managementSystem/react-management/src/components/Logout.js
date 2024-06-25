import { Button } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

export const Logout = () => {

  const onLogout = () => {
    // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
      sessionStorage.removeItem('loginMember')
      // App 으로 이동(새로고침)
      document.location.href = '/'
  }

  return (
    <div> <Button onClick={onLogout} style={{textDecoration:'none',color:'white'}}>Logout</Button></div>
  )
}
