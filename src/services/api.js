import axios from "axios";

const headers = {
    'dev-email-address': 'sandylohran@gmail.com'
  };

const api = axios.create({

    baseURL: 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/',
    headers,
    
});

export default api;