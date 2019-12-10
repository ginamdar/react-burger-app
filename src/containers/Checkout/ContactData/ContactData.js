import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        console.log(`contact data: ${JSON.stringify(this.props.ingredients)}`);
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Guru Inamdar',
                address: {
                    street: 'My Test St, Kitchener, N2A 4L2',
                    state: 'ON',
                    country: 'CA'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
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

    render() {
        let form = <form>
                        <input className={classes.Input} type='text' name="name" placeholder="Your name"/>
                        <input className={classes.Input} type='email' name="email" placeholder="Your email"/>
                        <input className={classes.Input} type='text' name="street" placeholder="Your street address"/>
                        <input className={classes.Input} type='text' name="postal" placeholder="Your postal code"/>
                        <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
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

export default ContactData;
