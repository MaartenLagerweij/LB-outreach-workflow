const fs = require('fs');
const axios = require('axios');

const FILEPATH = __dirname+'/../data/dentists-test.json';

const businesses = JSON.parse(fs.readFileSync(FILEPATH, 'utf-8'));

businesses.forEach(business => {
    try{
        if(business.website){
            getEmail(business.website);
        }
    }catch(err){
        console.log(`There was an error with getEmail for ${business}`)
    }
})

async function getEmail(url){
    const response = await axios.get(url);
    const html = response.data
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;

    const emailsFound = html.match(emailRegex);
    emails = [...new Set(emailsFound)]

    if (emails) {
        console.log("E-mailadres(sen) gevonden:", emails);
    } else {
        console.log("Geen e-mailadressen gevonden.");
    }
}


