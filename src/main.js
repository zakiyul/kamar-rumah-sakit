import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const baseUrl = 'https://rs-bed-covid-api.vercel.app/api';

const getDataProvinsi = () => {
    axios.get(`${baseUrl}/get-provinces`)
     .then(res => console.log(res.data))
     .catch(err => console.log(err))
}

document.addEventListener("DOMContentLoaded", e => {
    getDataProvinsi()
})