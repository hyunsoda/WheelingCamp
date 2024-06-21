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

export default function TemporaryDrawer() {
  // 사이드바 열림 판단
  const [open, setOpen] = React.useState(false);
  const [newOpen, setNewOpen] = React.useState(false);

  const linkList = ['/member', '/item', '/order'];

  const handleClick = () => {
    setOpen(!open);
  };

  const toggleDrawer = () => () => {
    setNewOpen(!newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <List>
        {['회원관리', '재고관리', '주문관리'].map((text, index) => (
          <ListItem key={text} disablePadding>
            {index === 1 ? (
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
                    {['하하하', '안녕', '반가워'].map((text, index) => (
                      <ListItem key={text} disablePadding>
                        <ListItemButton sx={{ pl: 4 }} to={linkList[index]}>
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
            ) : (
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
