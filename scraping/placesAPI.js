const fs = require('fs');
const axios = require('axios');
require('dotenv').config({path: __dirname+'/../.env'});

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const baseURL = 'https://maps.googleapis.com/maps/api/place/';


async function getPlaceWebsite(place_id){
    try{
        const response = await axios.get(`${baseURL}details/json?place_id=${place_id}&fields=website&key=${GOOGLE_MAPS_API_KEY}`)
        return response.data.result.website
    } catch(err){
        console.log('Error with getting the place details inside getPlaceDetails: ', err)
    }
    
}
//getPlaceWebsite('ChIJh7VwDMAJxkcRpsvc30zKvF4').then(website => console.log(website));

//This function takes in a query and requests the data from the Places API and writes that to a filename with that query
async function getPlacesData(query, niche){
    const response = await axios.get(`${baseURL}textsearch/json?query=${query}&key=${GOOGLE_MAPS_API_KEY}`);
    const results = [];
        for(const dentist of response.data.results){
            const website = await getPlaceWebsite(dentist.place_id);
            results.push({
                name: dentist.name,
                address: dentist.formatted_address,
                place_id: dentist.place_id,
                website: website,
                usedSearchTerm: query
            })
        }
            
        console.log(results)
        fs.writeFileSync(__dirname+'/../data/'+niche+'.json', JSON.stringify(results, null, 3), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("Wrote data to file");
        })
    }

getPlacesData('tandartsen+in+Amsterdam', 'dentists');
