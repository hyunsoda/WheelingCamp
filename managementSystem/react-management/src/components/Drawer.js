// @ts-nocheck
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Collapse } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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

  const [openCollapse, setOpenCollapse] = React.useState(false);

  const linkList = ['/member', '/item', '#', '#'];

  function handleOpenSettings() {
    setOpenCollapse(!openCollapse);
  }

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(true)}>
      <List>
        {['회원관리', '재고관리', '주문관리', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton to={linkList[index]}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
            {index === 1 ? (
              <Box
                sx={{ width: 250, display: 'flex', flexDirection: 'column' }}
                role="presentation"
                onClick={toggleDrawer(false)}
              >
                {' '}
                <List>
                  {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            ) : null}
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={handleOpenSettings}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>

            <Collapse in={openCollapse} timeout="auto" unmountOnExit>
              <List>
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary="1" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText primary="2" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Menu</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      {console.log(open)}
    </div>
  );
}
