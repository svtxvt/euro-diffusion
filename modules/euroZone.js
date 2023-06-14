const Country = require('./country');
const City = require('./city');

/**
 * Class representing the Eurozone.
 */
class Eurozone {
  /**
   * @constructor
   * @param {Object[]} countriesList - The list of country data.
   */
  constructor(countriesList) {
    this.countries = [];
    this.cities = [];
    this.populateEurozone(countriesList);
  }

  /**
   * Checks if all the cities in the Eurozone are connected.
   * A Eurozone is connected if there is a path from every city to every other city.
   *
   * The method uses a depth-first search algorithm starting from the first city.
   * If all the cities have been visited after the search, the cities are connected.
   *
   * @returns {boolean} - Whether all the cities are connected.
   */
  isConnected() {
    if (this.cities.length === 0) {
      return false;
    }
    let visited = new Set();
    let toVisit = [this.cities[0]];

    while (toVisit.length > 0) {
      let current = toVisit.pop();
      visited.add(current);
      for (let neighbor of current.neighbors) {
        if (!visited.has(neighbor)) {
          toVisit.push(neighbor);
        }
      }
    }

    return visited.size === this.cities.length;
  }

  /**
   * Calculates the daily diffusion of coins.
   * @returns {Object} - The daily diffuse.
   */
  calculateDailyDiffuse() {
    const dailyDiffuse = {};
    for (const city of this.cities) {
      const denoms = {};
      for (const [motif, amount] of Object.entries(city.account)) {
        denoms[motif] = Math.floor(amount / 1000);
      }
      dailyDiffuse[[city.x, city.y]] = denoms;
    }
    return dailyDiffuse;
  }

  /**
   * Adds a country to the Eurozone.
   * @param {Object} countryData - The data of the country to add.
   * @param {Object[]} countriesList - The list of country data.
   */
  addCountry(countryData, countriesList) {
    const country = new Country(countryData.name);
    const cordsX = [countryData.llx, countryData.urx + 1];
    const cordsY = [countryData.lly, countryData.ury + 1];

    for (let x = cordsX[0]; x < cordsX[1]; x++) {
      for (let y = cordsY[0]; y < cordsY[1]; y++) {
        const city = new City(country.name, countriesList, x, y);
        country.cities.push(city);
        this.cities.push(city);
      }
    }
    this.countries.push(country);
  }

  /**
   * Determines the neighbors for each city in the grid.
   */
  gridDetermineNeighbors() {
    for (const city of this.cities) {
      city.neighbors = this.cityDetermineNeighbors(city.x, city.y);
    }
  }

  /**
   * Checks if all the countries in the Eurozone are complete on a specific day.
   * @param {number} day - The day to check.
   * @returns {boolean} - Whether the Eurozone is complete.
   */
  completeCheck(day) {
    let complete = true;
    for (const country of this.countries) {
      if (!country.checkIsComplete(day)) {
        complete = false;
      }
    }
    return complete;
  }

  /**
   * Populates the Eurozone with countries.
   * @param {Object[]} countriesList - The list of country data.
   */
  populateEurozone(countriesList) {
    for (const countryData of countriesList) {
      this.addCountry(countryData, countriesList);
    }
    this.gridDetermineNeighbors();
  }

  /**
   * Determines the neighbors of a city given its coordinates.
   * @param {number} x - The x coordinate of the city.
   * @param {number} y - The y coordinate of the city.
   * @returns {City[]} - The neighbors of the city.
   */
  cityDetermineNeighbors(x, y) {
    const neighbors = [];

    for (const city of this.cities) {
      if (city.x === x && city.y === y + 1) { // North neighbor
        neighbors.push(city);
      }
      if (city.x === x && city.y === y - 1) { // South neighbor
        neighbors.push(city);
      }
      if (city.x === x + 1 && city.y === y) { // East neighbor
        neighbors.push(city);
      }
      if (city.x === x - 1 && city.y === y) { // West neighbor
        neighbors.push(city);
      }
    }
    return neighbors;
  }


  /**
   * Simulates a day in the Eurozone with coin distribution.
   */
  processDay() {
    const dailyDiffuse = this.calculateDailyDiffuse();
    const denoms = this.countries.map((country) => country.name);
    for (const denom of denoms) {
      for (const city of this.cities) {
        const cityDailyDiffuse = dailyDiffuse[[city.x, city.y]][denom];
        for (const neighbor of city.neighbors) {
          city.account[denom] -= cityDailyDiffuse;
          neighbor.account[denom] += cityDailyDiffuse;
        }
        city.checkIsComplete();
      }
    }
  }

  /**
   * Simulates the lifecycle of the Eurozone until all countries are complete.
   * @returns {Country[]} - The countries in the Eurozone.
   */
  processLifeCycle() {
    if (!this.isConnected()) {
      console.log('Eurozone is not fully connected, skipping simulation...');
      return;
    }
    if (this.countries.length < 2) {
      const country = this.countries[0];
      country.isComplete = true;
      country.completionDay = 0;
      return this.countries;
    }
    let complete = false;
    let day = 1;
    while (!complete) {
      this.processDay();
      complete = this.completeCheck(day);
      if (complete) break;
      day++;
    }
    this.countries.sort((a, b) => (a.completionDay - b.completionDay) || a.name.localeCompare(b.name));
    return this.countries;
  }
}

module.exports = Eurozone;
