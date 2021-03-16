import axios from 'axios';
const instance = axios.create({

    // Base Domain Name

    baseURL: 'https://65.0.108.90/' 
    // baseURL: 'http://127.0.0.1:6161/'

});

export let base = 'https://65.0.108.90/';
// export let base = 'http://127.0.0.1:6161/';

export default instance;