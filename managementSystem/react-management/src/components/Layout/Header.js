import React from 'react';
import TemporaryDrawer from '../Drawer';
import { Logout } from '../Logout';


const Header = () => {
  return (
    <div style={{backgroundColor:"#82a3ca ", display:"flex", flexDirection:"row",alignItems:'center', height:'45px'}}>
      <TemporaryDrawer />
      <div style={{width:'90%'}}></div>

      <Logout/>
    </div>
  );
};

export default Header;
