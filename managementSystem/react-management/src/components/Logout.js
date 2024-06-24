import { Button } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

export const Logout = () => {

  return (
    <div> <Button><Link style={{textDecoration:'none',color:'white'}} to={"http://localhost:80/member/logout"}>Logout</Link></Button></div>
  )
}
