// @ts-nocheck
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';


export default function TemporaryDrawer() {
  // 사이드바 열림 판단
  const [open, setOpen] = React.useState(false);
  const [finalOpen, setFinalOpen] = React.useState(false);
  const [newOpen, setNewOpen] = React.useState(false);

  // 기본메뉴
  const linkList = ['/member', '/item', '/order'];
  const itemLinkList = ['/item?categoryCode=1', '/item?categoryCode=2', '/item?categoryCode=3'];

  // 아이템 메뉴
  const itemlinkList = ['/item?categoryCode=1','/item?categoryCode=2','item?categoryCode=3']
  
  const orderLinkList = ['/order?payCode=1','/order?payCode=2']


  
  const handleClick = (e) => {
    finalOpen? setFinalOpen(!finalOpen): setFinalOpen(false);
    setOpen(!open);
  };

  const orderHandleClick = (e) => {
    open? setOpen(!open): setOpen(false);
    setFinalOpen(!finalOpen);
  }

  const toggleDrawer = () => () => {
    setNewOpen(!newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <Box width={'100%'}>
        <ListItemButton sx={{ pl: 4 }} to={'/'} >
                  <HomeIcon  sx={{ fontSize: 30 }} color="">
                    <InboxIcon />
                  </HomeIcon>
                  <ListItemText primary={'홈'} />
                </ListItemButton>
         </Box>       
      <Divider />
      <List>
        {['회원관리', '재고관리', '주문관리'].map((text, index) => (
          <ListItem key={text} disablePadding>
            {index === 1 ? (
              <Box width={'100%'}>
                <ListItemButton onClick={orderHandleClick}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={finalOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {['차량 관리', '캠핑용품 관리', '패키지 관리'].map((text, index) => (
                      <ListItem key={text} disablePadding>
                        <ListItemButton sx={{ pl: 4 }} to={itemlinkList[index]}>
                          <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ) :index === 2 ? (
              <Box width={'100%'}>
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {['구매 관리', '대여 관리'].map((text, index) => (
                      <ListItem key={text} disablePadding>
                        <ListItemButton sx={{ pl: 4 }} to={orderLinkList[index]}>
                          <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ): (
              <ListItemButton to={linkList[index]}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Menu</Button>
      <Drawer open={newOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
