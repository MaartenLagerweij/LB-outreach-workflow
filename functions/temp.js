const fs = require('fs');

const FILEPATH = __dirname+'/../data/dentists.json';
// const FILEPATH2 = __dirname+'/../data/dentists-brabant.json';
// const FILEPATH3 = __dirname+'/../data/dentists-drenthe.json';
// const FILEPATH4 = __dirname+'/../data/dentists-flevoland.json';
// const FILEPATH5 = __dirname+'/../data/dentists-friesland.json';
// const FILEPATH6 = __dirname+'/../data/dentists-gelderland.json';
// const FILEPATH7 = __dirname+'/../data/dentists-groningen.json';
// const FILEPATH8 = __dirname+'/../data/dentists-limburg.json';
// const FILEPATH9 = __dirname+'/../data/dentists-overijssel.json';
// const FILEPATH10 = __dirname+'/../data/dentists-utrecht.json';
// const FILEPATH11 = __dirname+'/../data/dentists-zeeland.json';

const data = JSON.parse(fs.readFileSync(FILEPATH, 'utf-8'));
// const data2 = JSON.parse(fs.readFileSync(FILEPATH2, 'utf-8'));
// const data3 = JSON.parse(fs.readFileSync(FILEPATH3, 'utf-8'));
// const data4 = JSON.parse(fs.readFileSync(FILEPATH4, 'utf-8'));
// const data5 = JSON.parse(fs.readFileSync(FILEPATH5, 'utf-8'));
// const data6 = JSON.parse(fs.readFileSync(FILEPATH6, 'utf-8'));
// const data7 = JSON.parse(fs.readFileSync(FILEPATH7, 'utf-8'));
// const data8 = JSON.parse(fs.readFileSync(FILEPATH8, 'utf-8'));
// const data9 = JSON.parse(fs.readFileSync(FILEPATH9, 'utf-8'));
// const data10 = JSON.parse(fs.readFileSync(FILEPATH10, 'utf-8'));
// const data11 = JSON.parse(fs.readFileSync(FILEPATH11, 'utf-8'));

let allData = {
    // data2: data2,
    // data3: data3,
    // data4: data4,
    // data5: data5,
    // data6: data6,
    // data7: data7,
    // data8: data8,
    // data9: data9,
    // data10: data10,
    // data11: data11,
};

for(let i = 2; i <= Object.keys(allData).length+1; i++){
    let currentData = allData['data'+i];
    currentData.forEach(element => {
        if(!data.some(e => e.place_id == element.place_id)){
            data.push(element);
        }
    });
}

data.map((el, i) => {
    el.id = i+1
})

console.log(data)

//fs.writeFileSync(FILEPATH, JSON.stringify(data, null, 3));
