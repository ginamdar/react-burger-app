import React, {Component} from 'react'
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map((igKey) => {
            return <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}
            </li>
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A Delicious Burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price:{props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout</p>
            <Button clicked={props.purchaseCancelled} btnType='Danger'>CANCEL</Button>
            <Button clicked={props.purchaseContinue} btnType='Success'>CONTINUE</Button>
        </Aux>
    )

};

export default OrderSummary;
