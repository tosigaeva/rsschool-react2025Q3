import { create } from 'zustand';

type Country = { code: string; name: string };

type CountryState = {
  countries: Country[];
  countryNames: () => string[];
  setCountries: (countries: Country[]) => void;
};

export const useCountriesStore = create<CountryState>((set, get) => ({
  countries: [
    { code: 'RU', name: 'Russia' },
    { code: 'BY', name: 'Belarus' },
    { code: 'UA', name: 'Ukraine' },
    { code: 'US', name: 'USA' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'PL', name: 'Poland' },
    { code: 'CN', name: 'China' },
    { code: 'JP', name: 'Japan' },
    { code: 'CA', name: 'Canada' },
    { code: 'BR', name: 'Brazil' },
    { code: 'AU', name: 'Australia' },
  ],
  countryNames: () => get().countries.map((c) => c.name),
  setCountries: (countries) => set({ countries }),
}));
