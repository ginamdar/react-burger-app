import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from "./ContactData/ContactData";
import { connect } from 'react-redux';

const Checkout = props => {
    const onCheckoutContinue = () =>{
        props.history.replace('/checkout/contact-data');
    };

    const onCheckoutCancelled = () =>{
        props.history.goBack();
    };

    let summary = <Redirect to='/' />;
//        console.log(`ingredient: ${JSON.stringify(this.state.ingredients)}`);

    if (props.ingredients) {
        const purchasedRedirect = props.purchased ? <Redirect to='/' /> : null;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary ingredients={props.ingredients}
                                 onCheckoutContinue={onCheckoutContinue}
                                 onCheckoutCancelled={onCheckoutCancelled}/>
                <Route path={props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        )
    }
    return summary;
};

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);
