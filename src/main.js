import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

import './web-components/card-component.js';

const baseUrl = 'https://rs-bed-covid-api.vercel.app/api';
const selectProvinsi = document.getElementById('pilih-provinsi');
const selectKabupaten = document.getElementById('pilih-kabupaten');
const btnCari = document.getElementById('btn-cari')

let provinsiId = '';
let hospitals = [];

const getDataHospital = (provinsiId, kabupatenId) => {
    axios.get(`${baseUrl}/get-hospitals?provinceid=${provinsiId}&cityid=${kabupatenId}&type=1`)
     .then(res => {
        console.log(res.data);
        hospitals = res.data.hospitals;
     })
     .catch(err => {
         console.log(err)
     })
}

const getDataKabupaten = provinsiId => {
    axios.get(`${baseUrl}/get-cities?provinceid=${provinsiId}`)
     .then(res => {
         const kabupatens = res.data.cities;
         console.log(kabupatens)
         kabupatens.map(kabupaten => {
             const kabupatenOption = document.createElement('option');
             kabupatenOption.setAttribute('value', kabupaten.id);
             kabupatenOption.innerText = kabupaten.name;
             selectKabupaten.appendChild(kabupatenOption);
         })
         console.log('ubah jadi enable')
         selectKabupaten.removeAttribute('disabled')
     })
     .catch(err => {
         console.log(err.message)
     })
}

const getDataProvinsi = () => {
    axios.get(`${baseUrl}/get-provinces`)
     .then(res => {
         console.log(res.data)
         const provinces = res.data.provinces;
         provinces.map(province => {
             const provinsiOption = document.createElement('option');
             provinsiOption.setAttribute('value', province.id);
             provinsiOption.innerText = province.name;
             selectProvinsi.appendChild(provinsiOption)
         })
    })
     .catch(err => console.log(err))
}

selectProvinsi.addEventListener('change', e => {
    getDataKabupaten(e.target.value);
    provinsiId = e.target.value;
})

selectKabupaten.addEventListener('change', e => {
    getDataHospital(provinsiId, e.target.value);
})

btnCari.addEventListener('click', e => {
    console.log(hospitals)
    hospitals.map(hospital => {
        const cardItemElement = document.createElement('card-component');
        cardItemElement.konten = hospital;
        document.getElementById('card-component').appendChild(cardItemElement);
    })
})

document.addEventListener("DOMContentLoaded", e => {
    getDataProvinsi();
    selectKabupaten.setAttribute('disabled', true);
})