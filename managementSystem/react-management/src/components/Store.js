import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Store = () => {


  return (
    <div> <Button><Link style={{textDecoration:'none',color:'white'}} to={"http://localhost:80"}>Store</Link></Button></div>
  )
}

export default Store