/**
 * Reads the file at the given path and processes the input to create an array of cases where each case is an array of countries.
 * Each country is represented by an object with name and coordinates.
 *
 * @param {string} path - The path to the input file
 * @returns {Array<Array<Object>>} An array of cases. Each case is an array of countries where each country is represented by an object.
 */
const processInput = (path) => {
  const lines = processLines(path).map((line) => line.replace('\r', ''));
  const cases = [];
  let countries = -1;
  let currentCase = [];
  for (const line of lines) {
    const tokens = line.trim().split(' ');
    if (tokens.length > 0) {
      if (tokens.length < 2 && tokens[0].match(/^\d+$/)) {
        countries = parseInt(tokens[0], 10);
        if (currentCase.length > 0) {
          cases.push(currentCase);
          currentCase = [];
        }
        if (parseInt(tokens[0], 10) === 0) {
          break;
        }
      } else if (tokens.length === 5 && currentCase.length < countries) {
        const country = processCountry(line);
        currentCase.push(country);
      }
    }
  }
  return cases;
};

/**
 * Takes a line from the input file and extracts country information from it.
 * The country information includes the country's name and its lower left and upper right city coordinates.
 *
 * @param {string} line - A line from the input file representing a country
 * @returns {Object} An object containing the name of the country and its lower left and upper right city coordinates
 */
const processCountry = (line) => {
  const tokens = line.split(' ');
  return {
    name: tokens[0],
    llx: parseInt(tokens[1], 10),
    lly: parseInt(tokens[2], 10),
    urx: parseInt(tokens[3], 10),
    ury: parseInt(tokens[4], 10),
  };
};

/**
 * Reads a file from a given path and splits its content into lines.
 *
 * @param {string} filepath - The path to the file
 * @returns {Array<string>} An array of lines from the file
 */
const processLines = (filepath) => {
  const fs = require('fs');
  const data = fs.readFileSync(filepath, 'utf8');
  return data.split('\n');
};

module.exports = { processInput };
