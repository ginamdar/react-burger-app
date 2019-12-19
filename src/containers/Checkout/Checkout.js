import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from "./ContactData/ContactData";
import { connect } from 'react-redux';

class Checkout extends Component {
    onCheckoutContinue = () =>{
        this.props.history.replace('/checkout/contact-data');
    };

    onCheckoutCancelled = () =>{
        this.props.history.goBack();
    };

    render() {
//        console.log(`ingredient: ${JSON.stringify(this.state.ingredients)}`);
        return(
            <div>
                <CheckoutSummary ingredients={this.props.ingredients}
                                 onCheckoutContinue={this.onCheckoutContinue}
                                 onCheckoutCancelled={this.onCheckoutCancelled}
                />
                {/*<Route path={this.props.match.path + '/contact-data'} component={ContactData}/>*/}
                <Route path={this.props.match.path + '/contact-data'}
                       component={ContactData}
//                       render={ (props) => (
//                            <ContactData ingredients={this.props.ingredients} price={this.props.totalPrice} {...props}/>
//                            )
//                       }
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);
