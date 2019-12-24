import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name,
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name,
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
      type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
  return dispatch => {
      axios.get('https://reactmyburger-52679.firebaseio.com/ingredients.json')
           .then((resp) => {
               dispatch(setIngredients(resp.data));
           })
          .catch(err => {
              dispatch(fetchIngredientsFailed())
          })
  };
};
