const Country = require('../modules/country');
const City = require('../modules/city');

describe('Country', () => {
  test('Should create a Country with a name', () => {
    const country = new Country('A');
    expect(country.name).toBe('A');
  });

  test('Should correctly check if a Country is complete', () => {
    const country = new Country('A');
    const city = new City('A', [{name: 'A'}, {name: 'B'}], 0, 0);
    country.cities.push(city);
    expect(country.checkIsComplete(1)).toBe(false);
    city.isComplete = true;
    expect(country.checkIsComplete(1)).toBe(true);
  });

});
