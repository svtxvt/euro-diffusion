const City = require('../modules/city');

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
