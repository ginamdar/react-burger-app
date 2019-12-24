import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
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
        let summary = <Redirect to='/' />;
//        console.log(`ingredient: ${JSON.stringify(this.state.ingredients)}`);

        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ingredients}
                                     onCheckoutContinue={this.onCheckoutContinue}
                                     onCheckoutCancelled={this.onCheckoutCancelled}/>
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);
