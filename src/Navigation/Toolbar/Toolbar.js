import React from 'react'
import classes from './Toolbar.css';
import Logo from '../../components/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolBar = (props) => {
    return(
        <div className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked}></DrawerToggle>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </div>
    )
};

export default toolBar;