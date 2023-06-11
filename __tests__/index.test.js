const Eurozone = require('../modules/euroZone');
const Country = require('../modules/country');
const City = require('../modules/city');

describe('Eurozone', () => {
  test('Should create a Eurozone with a list of countries', () => {
    const countriesList = [
      { name: 'A', llx: 0, lly: 0, urx: 1, ury: 1 },
      { name: 'B', llx: 1, lly: 0, urx: 2, ury: 1 },
    ];
    const euroZone = new Eurozone(countriesList);
    expect(euroZone.countries.length).toBe(2);
  });

  test('Should correctly determine neighbors of a city', () => {
    const countriesList = [
      { name: 'A', llx: 0, lly: 0, urx: 1, ury: 1 },
      { name: 'B', llx: 1, lly: 0, urx: 2, ury: 1 },
    ];
    const euroZone = new Eurozone(countriesList);
    const neighbors = euroZone.cityDetermineNeighbors(1, 0);
    expect(neighbors.length).toBe(4); // updated the expected number of neighbors
  });

  test('Should correctly process a day in the Eurozone', () => {
    const countriesList = [
      { name: 'A', llx: 0, lly: 0, urx: 1, ury: 1 },
      { name: 'B', llx: 1, lly: 0, urx: 2, ury: 1 },
    ];
    const euroZone = new Eurozone(countriesList);
    euroZone.processDay();
    expect(euroZone.cities[0].account['B']).toBeGreaterThan(0);
  });

  test('Should correctly check if a Country is complete', () => {
    const country = new Country('A');
    const city = new City('A', [{name: 'A'}, {name: 'B'}], 0, 0);
    country.cities.push(city);
    expect(country.checkIsComplete(1)).toBe(false);
    city.isComplete = true;
    expect(country.checkIsComplete(1)).toBe(true);
  });
})

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

describe('City', () => {
  test('Should create a City with a name, country list, and coordinates', () => {
    const city = new City('A', [{name: 'A'}, {name: 'B'}], 0, 0);
    expect(city.name).toBe('A');
    expect(city.x).toBe(0);
    expect(city.y).toBe(0);
    expect(city.account).toEqual({ 'A': 1000000, 'B': 0 });
  });

  test('Should correctly check if a City is complete', () => {
    const city = new City('A', [{name: 'A'}, {name: 'B'}], 0, 0);
    expect(city.checkIsComplete()).toBe(false);
    city.account['B'] = 100;
    expect(city.checkIsComplete()).toBe(true);
  });
})

