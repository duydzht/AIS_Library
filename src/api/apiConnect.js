import axios from 'axios';

export const apiLib = axios.create({
    baseURL: 'http://localhost:8093/',
});

// export const apiLib =  axios.create({
//     baseURL: 'http://81f8-113-183-116-94.ngrok.io/',
// });

export const apiStu = axios.create({
    baseURL: 'http://localhost:8085/',
});

// export const apiStu =  axios.create({
//     baseURL: 'http://dc7b-113-183-116-94.ngrok.io/',
// });

export const apiAcc = axios.create({
    baseURL: 'http://localhost:8091/',
});

// export const apiAcc =  axios.create({
//     baseURL: 'http://3151-14-232-152-250.ngrok.io/',
// });
