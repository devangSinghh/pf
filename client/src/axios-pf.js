import axios from 'axios';
const instance = axios.create({

    // Base Domain Name

    baseURL: 'http://18.237.204.86/api/'
    // baseURL: 'http://127.0.0.1:6161/api/'

});

export let base = 'http://18.237.204.86/';
// export let base = 'http://127.0.0.1:6161/';

export default instance;