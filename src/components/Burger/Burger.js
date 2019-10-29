import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    let transformedIngrdients = Object.keys(props.ingredients)
        .map(igKey => {
           return [...Array(props.ingredients[igKey])].map((_, index) => {
               return (<BurgerIngredient key={igKey + index} type={igKey}/>);
           });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    console.log(transformedIngrdients);
    if (transformedIngrdients.length === 0) {
        transformedIngrdients = <p>Please start adding ingredients to your Burger!</p>
    }
        return (
            <div className={classes.Burger}>
                <BurgerIngredient type='bread-top'></BurgerIngredient>
                {transformedIngrdients}
                <BurgerIngredient type='bread-bottom'></BurgerIngredient>
            </div>
    );
};

export default burger;