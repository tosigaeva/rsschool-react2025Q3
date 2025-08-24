import { beforeEach, describe, expect, it } from 'vitest';

import { useCountriesStore } from '@/shared/store/countries-store';

describe('Countries Store', () => {
  beforeEach(() => {
    useCountriesStore.setState({
      countries: [
        { code: 'RU', name: 'Russia' },
        { code: 'US', name: 'USA' },
        { code: 'DE', name: 'Germany' },
        { code: 'FR', name: 'France' },
      ],
    });
  });

  it('initializes with default countries', () => {
    const state = useCountriesStore.getState();

    expect(state.countries).toHaveLength(4);
    expect(state.countries[0]).toEqual({ code: 'RU', name: 'Russia' });
    expect(state.countries[1]).toEqual({ code: 'US', name: 'USA' });
    expect(state.countries[2]).toEqual({ code: 'DE', name: 'Germany' });
    expect(state.countries[3]).toEqual({ code: 'FR', name: 'France' });
  });

  it('returns country names from countryNames selector', () => {
    const { countryNames } = useCountriesStore.getState();
    const names = countryNames();

    expect(names).toEqual(['Russia', 'USA', 'Germany', 'France']);
  });

  it('sets new countries and updates state', () => {
    const newCountries = [
      { code: 'CA', name: 'Canada' },
      { code: 'AU', name: 'Australia' },
    ];

    const { setCountries } = useCountriesStore.getState();
    setCountries(newCountries);

    const state = useCountriesStore.getState();

    expect(state.countries).toEqual(newCountries);
    expect(state.countries).toHaveLength(2);
    expect(state.countries[0]).toEqual({ code: 'CA', name: 'Canada' });
    expect(state.countries[1]).toEqual({ code: 'AU', name: 'Australia' });
  });

  it('updates countryNames selector after setting new countries', () => {
    const newCountries = [
      { code: 'CA', name: 'Canada' },
      { code: 'AU', name: 'Australia' },
    ];

    const { countryNames, setCountries } = useCountriesStore.getState();
    setCountries(newCountries);

    const names = countryNames();

    expect(names).toEqual(['Canada', 'Australia']);
  });

  it('maintains data integrity when updating countries', () => {
    const { setCountries } = useCountriesStore.getState();

    // Set countries with invalid data
    const invalidCountries = [
      { code: '', name: '' },
      { code: 'TEST', name: 'Test Country' },
    ];

    setCountries(invalidCountries);

    const state = useCountriesStore.getState();
    expect(state.countries).toEqual(invalidCountries);
  });

  it('handles empty countries array', () => {
    const { countryNames, setCountries } = useCountriesStore.getState();

    setCountries([]);

    const state = useCountriesStore.getState();
    expect(state.countries).toEqual([]);
    expect(state.countries).toHaveLength(0);

    const names = countryNames();
    expect(names).toEqual([]);
  });

  it('preserves country structure when updating', () => {
    const { setCountries } = useCountriesStore.getState();

    const countriesWithExtraFields = [
      {
        code: 'CA',
        continent: 'North America',
        name: 'Canada',
        population: 38000000,
      },
      {
        code: 'AU',
        continent: 'Oceania',
        name: 'Australia',
        population: 25000000,
      },
    ];

    setCountries(countriesWithExtraFields);

    const state = useCountriesStore.getState();
    expect(state.countries).toEqual(countriesWithExtraFields);
    expect(state.countries[0]).toHaveProperty('population');
    expect(state.countries[1]).toHaveProperty('continent');
  });
});
