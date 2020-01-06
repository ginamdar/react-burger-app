import React, {useState, useEffect} from 'react';
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

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, []);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return  sum > 0;
    };

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        }else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchased();
        props.history.push('/checkout');
    };

    let orderSummary = null;
    const disableInfo = {
        ...props.ingredients
    };
    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
    }
    let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
    if (props.ingredients) {
        burger = (
            <Aux>
                <Burger ingredients={props.ingredients}/>
                <BuildControls
                    ordered={purchaseHandler}
                    price={props.totalPrice}
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disableInfo}
                    purchasable={updatePurchaseState(props.ingredients)}
                    isAuth={props.isAuthenticated}
                />
            </Aux>
        );
        orderSummary =
            <OrderSummary price={props.totalPrice}
                          purchaseCancelled={purchaseCancelHandler}
                          purchaseContinue={purchaseContinueHandler}
                          ingredients={props.ingredients}/>
    }
    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(actionTypes.initIngredients()),
        onIngredientAdded: (ingName) => dispatch(actionTypes.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actionTypes.removeIngredient(ingName)),
        onInitPurchased: () => dispatch(actionTypes.purchaseInit()),
        onSetAuthRedirectPath: (path) =>  dispatch(actionTypes.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
