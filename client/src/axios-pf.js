import axios from 'axios';
const instance = axios.create({

    // Base Domain Name

    baseURL: 'http://devang.design/api/'
    // baseURL: 'http://127.0.0.1:6161/api/'

});

export let base = 'http://devang.design/';
// export let base = 'http://127.0.0.1:6161/';

export default instance;