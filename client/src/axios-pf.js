import axios from 'axios'
const instance = axios.create({

    // Base Domain Name

    // baseURL: 'https://thedevang.com/' 
    baseURL: 'http://127.0.0.1:6161/'

})

// export let base = 'https://thedevang.com/'
export let base = 'http://127.0.0.1:6161/'

export default instance