const fs = require('fs');
const axios = require('axios');

require('dotenv').config({path: __dirname+'/../.env'});

const API_KEY = process.env.SEMRUSH_API_KEY;

//There is no API units left for Semrush to make calls
// async function getSearchVolume(keyword, apiKey) {
//     const DOMAIN = 'https://api.semrush.com';
//     const ENDPOINT = '/analytics/v1/keyword_volume'; // Zorg ervoor dat dit het juiste endpoint is
//     const DATABASE = 'nl'; // Kies de database die relevant is voor je markt

//     const url = `${DOMAIN}`;
//     const params = {
//         key: apiKey,
//         database: DATABASE,
//         keyword: keyword
//     };

//     try {
//         const response = await axios.get(`https://api.semrush.com/?type=domain_rank&key=${API_KEY}&export_columns=Dn,Rk,Or,Ot,Oc,Ad,At,Ac&domain=seobook.com&database=us`);
//         return response.data; // Hier moet je mogelijk de respons aanpassen afhankelijk van de structuur
//     } catch (error) {
//         console.error('Error fetching data from Semrush API:', error);
//     }
// }
// getSearchVolume('tandarts Amsterdam', API_KEY).then(console.log);


const FILEPATH = __dirname+'/../data/dentists.json';
const data = JSON.parse(fs.readFileSync(FILEPATH, 'utf-8'));

//Create and write a new keywords object with the city and province like "dentist <city>" and "dentist <province>"
function createKeywordLocation(){
    data.map(item => {
        const regex = /\b\d{4}\s?[A-Z]{2}\s(.+), Netherlands/;
        const match = item.address.match(regex);
        
        if (match) {
            const city = match[1];
            const keyword1 = 'tandarts '+city;
            const keyword2 = item.usedSearchTerm.replace(/\+/g, ' ');
            item.keywords = {
                [keyword1]: null,
                [keyword2]: null,
            }
        }
    });
    fs.writeFileSync(FILEPATH, JSON.stringify(data, null, 3));
}

//Get a unique list of the keywords that were set in createKeywordLocation()
function createKeywordList(){
    const keywords = []
    data.forEach(element => {
        if(element.keywords) {
            Object.keys(element.keywords).forEach(keyword => !keywords.includes(keyword) ? keywords.push(keyword) : null);
        } else {
            //console.log(element.id);
        }
    });
    fs.writeFileSync(__dirname+'/../data/keywords.text', keywords.join('\n'))
}

//createKeywordLocation();
//createKeywordList();

const test = JSON.parse(fs.readFileSync(FILEPATH));
console.log(test.forEach())


//console.log(data);