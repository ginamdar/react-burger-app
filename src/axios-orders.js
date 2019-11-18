import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reactmyburger-52679.firebaseio.com/'
});

export default instance;
