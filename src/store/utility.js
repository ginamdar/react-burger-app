export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

export const checkValidity = (value, rule) =>{
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

    if (isValid && rule.isEmail) {
        //const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9])/;
        const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        isValid = pattern.test(value);
    }
    return isValid;
}
