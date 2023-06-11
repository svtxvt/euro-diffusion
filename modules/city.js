const INITIAL_ACCOUNT_BALANCE = 1000000;

/**
 * Class representing a city.
 */
class City {
  /**
   * @constructor
   * @param {string} name - The name of the city.
   * @param {string[]} countryList - The list of countries' names.
   * @param {number} x - The x coordinate of the city.
   * @param {number} y - The y coordinate of the city.
   */
  constructor(name, countryList, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;

    this.account = {};
    for (const country of countryList) {
      this.account[country.name] = 0;
    }
    this.account[name] = INITIAL_ACCOUNT_BALANCE;
    this.neighbors = [];
    this.isComplete = false;
  }

  /**
   * Checks if the city is complete, i.e., if it has at least one coin of each motif.
   * @returns {boolean} - Whether the city is complete.
   */
  checkIsComplete() {
    for (const amount of Object.values(this.account)) {
      if (amount === 0) {
        return false;
      }
    }
    this.isComplete = true;
    return true;
  }
}

module.exports = City;
