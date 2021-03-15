import axios from 'axios';
const instance = axios.create({

    // Base Domain Name

    baseURL: 'http://35.165.61.67/api/'
    // baseURL: 'http://127.0.0.1:6161/'

});

export let base = 'http://35.165.61.67/';
// export let base = 'http://127.0.0.1:6161/';

export default instance;