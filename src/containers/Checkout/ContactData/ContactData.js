import React, {useState} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../../store/actions';
import {checkValidity} from '../../../store/utility';

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your email'
            },
            value: props.email,
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        postalCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Postal / Zip Code',
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [{
                    value: 'fastest', displayValue: 'Fastest'
                }, {
                    value: 'cheapest', displayValue: 'Cheapest'
                }]
            },
            value: 'fastest',
            valid: true,
            validation: {}
        },
    });
    const [formIsValid, setIsFormValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        // console.log(`contact data: ${JSON.stringify(this.props.ingredients)}`);
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData,
            userId: props.userId
        };
        props.onOrderBurger(order, props.token);
    };

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let isFormValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            isFormValid = updatedOrderForm[inputIdentifier].valid && isFormValid;
        }
        setOrderForm(updatedOrderForm);
        setIsFormValid(isFormValid);
    };

    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        })
    }
    let form = <form onSubmit={orderHandler}>
        {
            formElementsArray.map((formElement) => (
                <Input key={formElement.id}
                       elementType={formElement.config.elementType}
                       elementConfig={formElement.config.elementConfig}
                       value={formElement.config.value}
                       invalid={!formElement.config.valid}
                       touched={formElement.config.touched}
                       shouldValidate={formElement.config.validation}
                       change={(event) => inputChangedHandler(event, formElement.id)}
                />
            ))}
        <Button btnType="Success" disabled={!formIsValid}>Order</Button>
    </form>;
    if (props.loading) {
        form = <Spinner/>
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your details</h4>
            {form}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        email: state.auth.emailId
    }
};

const mapDispatchToPops = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actionTypes.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToPops)(withErrorHandler(ContactData, axios));
