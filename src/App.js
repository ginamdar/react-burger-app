import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Auth from './containers/Auth/Auth';
import {Route, Switch, withRouter, Redirect} from "react-router";
import Orders  from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';
import { connect } from 'react-redux';

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
                <Route path="/auth" component={Auth}/>
                <Redirect to="/"/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/logout" component={Logout}/>
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
