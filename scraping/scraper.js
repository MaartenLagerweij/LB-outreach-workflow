const fs = require('fs');
const axios = require('axios');
require('dotenv').config({path: __dirname+'/../.env'});

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const baseURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

const results = [];

function getPlacesData(query){
    axios.get(`${baseURL}?query=${query}&key=${GOOGLE_MAPS_API_KEY}`).then(response => {
        response.data.results.forEach(dentist => {
            results.push({
                name: dentist.name,
                place_id: dentist.place_id
            })
        })
        console.log(results)
        fs.writeFileSync(__dirname+'/../data/'+query+'.json', JSON.stringify(results, null, 3))
    }).catch(err => {
        console.log(err);
    })
}

getPlacesData('tandartsen+in+Amsterdam');
