import styles from "./styles.module.css"

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/material/Icon';

export default function ButtonAppBar() {
  return (
    <div>
      <AppBar position="static" style={{flexGrow:1}}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" className={styles.appbar_menuButton}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{flexGrow:1}}>
            2ONE.TECH
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
