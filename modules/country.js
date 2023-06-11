/**
 * Class representing a country.
 */
class Country {
  /**
   * @constructor
   * @param {string} name - The name of the country.
   */
  constructor(name) {
    this.name = name;
    this.isComplete = false;
    this.completionDay = -1;
    this.cities = [];
  }

  /**
   * Checks if all the cities in the country are complete on a specific day.
   * @param {number} day - The day to check.
   * @returns {boolean} - Whether the country is complete.
   */
  checkIsComplete(day) {
    if (this.isComplete) {
      return true;
    }
    for (const city of this.cities) {
      if (!city.isComplete) {
        return false;
      }
    }
    this.isComplete = true;
    this.completionDay = day;
    return true;
  }
}

module.exports = Country;
