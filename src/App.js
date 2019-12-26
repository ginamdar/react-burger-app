import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Auth from './containers/Auth/Auth';
import {Route, Switch, withRouter, Redirect} from "react-router";
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
   return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
   return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
   return import('./containers/Auth/Auth');
});

class App extends Component {
    state = {
        show: true
    };

    componentDidMount(): void {
        this.props.logBackInIfApplicable();
        setTimeout(() => {
            this.setState( {show: false} );
        }, 5000);
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/" exact component={BurgerBuilder}/>
                <Route path="/auth" component={asyncAuth}/>
                <Redirect to="/"/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={asyncCheckout}/>
                    <Route path="/orders" component={asyncOrders}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/auth" component={asyncAuth}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Redirect to="/"/>
                </Switch>
            );
        }

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logBackInIfApplicable: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
