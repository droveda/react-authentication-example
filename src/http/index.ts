import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        Accept: 'application/json',
        Content: 'application/json'
    }
})

http.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = sessionStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
}, function (error) {
    // Do something with request error
    console.log('Erro no interceptor do axios');
    return Promise.reject(error);
});

// http.interceptors.response.use(function (response) {
//     // Qualquer código de status que esteja dentro do intervalo de 2xx faz com que esta função seja acionada
//     // Faça algo com os dados de resposta
//     return response;
// }, function (error: AxiosError) {
//     // Qualquer código de status que esteja fora do intervalo de 2xx faz com que esta função seja acionada
//     //Faça algo com erro de resposta

//     return Promise.reject(error);
// });



export default http;