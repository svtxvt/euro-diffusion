const fs = require('fs');
const { processInput } = require('./helpers/input');

const EuroZone = require('./modules/euroZone');

const INPUT_PATH = './data/input.txt';
const OUTPUT_PATH = './data/output.txt';

const app = () => {
  try {
    console.log('Starting...');

    const caseList = processInput(INPUT_PATH);
    const file = fs.createWriteStream(OUTPUT_PATH);

    console.log('Parsed input...');
    console.log('Starting cases...');

    for (let i = 0; i < caseList.length; i++) {
      const countryList = caseList[i];
      file.write(`Case Number ${i + 1}\n`);
      const euroZone = new EuroZone(countryList);
      const countries = euroZone.processLifeCycle();
      for (const country of countries) {
        file.write(`${country.name} ${country.completionDay}\n`);
      }
    }

    console.log('Finished cases...');
    file.end();
    console.log(`Written to:${OUTPUT_PATH}`);
  } catch (e) {
    console.log(e);
  }
};

app();
