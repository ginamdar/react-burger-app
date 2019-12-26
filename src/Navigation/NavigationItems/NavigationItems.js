import React, { Component } from 'react'
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

class NavigationItems extends Component {
    render() {
        const auth = this.props.isAuthenticated ? <NavigationItem link="/logout">Logout</NavigationItem> : <NavigationItem link="/auth">Authenticate</NavigationItem>
        const orders = this.props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null;
        return (
            <ul className={classes.NavigationItems}>
                <NavigationItem exact link="/">Burger Builder</NavigationItem>
                {orders}
                {auth}
            </ul>
        )
    }
}

export default NavigationItems;
