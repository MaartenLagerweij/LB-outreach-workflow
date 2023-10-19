const fs = require('fs');
const axios = require('axios');
require('dotenv').config({path: __dirname+'/../.env'});

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const baseURL = 'https://maps.googleapis.com/maps/api/place/';


async function getPlaceWebsite(place_id){
    try{
        const response = await axios.get(`${baseURL}details/json?place_id=${place_id}&fields=website&key=${GOOGLE_MAPS_API_KEY}`)
        return response.data.result.website ? response.data.result.website.replace(/\?.*/, '') : null;
    } catch(err){
        console.log('Error during fetching place details in getPlaceDetails:  ', err)
    }
}

//This function takes in a query and requests the data from the Places API and writes that to a filename with that query
async function getPlacesData(query, niche){
    let nextPageToken = '';
    const results = [];
    let index = 1;
    
    do {
        try{
            const response = await axios.get(`${baseURL}textsearch/json`,{
                params: {
                    query: query,
                    key: GOOGLE_MAPS_API_KEY,
                    pagetoken: nextPageToken
                }
            })
            
                for(const dentist of response.data.results){
                    const website = await getPlaceWebsite(dentist.place_id);
                    results.push({
                        id: index,
                        name: dentist.name,
                        address: dentist.formatted_address,
                        place_id: dentist.place_id,
                        website: website,
                        usedSearchTerm: query
                    })
                    index++;
                }
    
            nextPageToken = response.data.next_page_token || '';
            
            if (nextPageToken) {
                // Wacht enkele seconden voor de volgende aanroep vanwege de quota's van Google API
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        } catch(err){
            console.log('Error during data retrieval in getPlacesData: ', err);
        }

    } while(nextPageToken);
            
    try {
        fs.writeFileSync(__dirname+'/../data/'+niche+'.json', JSON.stringify(results, null, 3))
        console.log(results)
        console.log('wrote data to file');
    } catch(err){
        console.log('Error during writing data to file in getPlacesData: ', err)
    }
}

getPlacesData('tandartsen+in+zeeland', 'dentists-zeeland');
