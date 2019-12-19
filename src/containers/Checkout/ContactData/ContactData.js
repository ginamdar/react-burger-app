import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';

class ContactData extends Component {
    state = {
        orderForm: {
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
                value: '',
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
                value: '',
                valid: true,
                validation: {}
            },
        },
        formIsValid: false,
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        console.log(`contact data: ${JSON.stringify(this.props.ingredients)}`);
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
        };
        axios.post('/orders.json', order)
            .then((resp) => {
                console.log(resp);
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch((err) => {
                this.setState({loading: false});
                console.log(err);
            });
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let isFormValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            isFormValid = updatedOrderForm[inputIdentifier].valid && isFormValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: isFormValid});
    };

    checkValidity(value, rule) {
        let isValid = true;
        if (rule.require) {
            isValid = value.trim() !== '';
        }
        if (isValid && rule.minLength) {
            isValid = value.trim().length >= rule.minLength;
        }
        if (isValid && rule.maxLength) {
            isValid = value.trim().length <= rule.maxLength;
        }
        return isValid;
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = <form onSubmit={this.orderHandler} >
                        {
                            formElementsArray.map((formElement) => (
                                <Input key={formElement.id}
                                       elementType={formElement.config.elementType}
                                       elementConfig={formElement.config.elementConfig}
                                       value={formElement.config.value}
                                       invalid={!formElement.config.valid}
                                       touched={formElement.config.touched}
                                       shouldValidate={formElement.config.validation}
                                       change={(event) => this.inputChangedHandler(event, formElement.id)}
                                />
                            ))}
                        <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
                    </form>;
        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your details</h4>
                {form}
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
};

export default connect(mapStateToProps)(ContactData);
