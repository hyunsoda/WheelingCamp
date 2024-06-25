import React from 'react';
import TemporaryDrawer from '../Drawer';
import { Logout } from '../Logout';
import Store from '../Store';

const Header = () => {
  return (
    <div style={{backgroundColor:"#82a3ca ", display:"flex", flexDirection:"row",alignItems:'center', height:'45px'}}>
      <TemporaryDrawer />
      <div style={{width:'86%'}}></div>
      <Store/>
      <div style={{width:'1%'}}></div>
      <Logout/>
    </div>
  );
};

export default Header;
