import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return  sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchased();
        this.props.history.push('/checkout');
    };

    render() {
        let orderSummary = null;
        const disableInfo = {
            ...this.props.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        ordered={this.purchaseHandler}
                        price={this.props.totalPrice}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                    />
                </Aux>
            );
            orderSummary =
                <OrderSummary price={this.props.totalPrice}
                              purchaseCancelled={this.purchaseCancelHandler}
                              purchaseContinue={this.purchaseContinueHandler}
                              ingredients={this.props.ingredients}/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(actionTypes.initIngredients()),
        onIngredientAdded: (ingName) => dispatch(actionTypes.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actionTypes.removeIngredient(ingName)),
        onInitPurchased: () => dispatch(actionTypes.purchaseInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
