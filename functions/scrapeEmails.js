const fs = require('fs');
const axios = require('axios');

const FILEPATH = __dirname+'/../data/dentists.json';

const businesses = JSON.parse(fs.readFileSync(FILEPATH, 'utf-8'));

async function getEmail(url){
    try{
        const response = await axios.get(url);
        const html = response.data;
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;
    
        const emailsFound = html.match(emailRegex);
        const emails = emailsFound ? [...new Set(emailsFound)] : [];
        return emails;
    }catch(err){
        console.log(`Error with fetching the url ${url}: ${err.message}`);
        return [];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function updateBusinessWithEmails(){
    for(let business of businesses){
        try{
            if(business.website){
                const emails = await getEmail(business.website);
                business.emails = emails.join('|');
                await sleep(200);
            }
        }catch(err){
            console.log(`There was an error with getEmail for ${business.name}: ${err.message}`)
        }
    }
}
async function main(){
    await updateBusinessWithEmails();
    fs.writeFileSync(FILEPATH, JSON.stringify(businesses, null, 3));
    console.log(businesses);
}

main();



