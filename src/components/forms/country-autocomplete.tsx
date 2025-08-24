import { useState } from 'react';

import { Input } from '@/components/ui';
import { useCountriesStore } from '@/shared/store';

type Props = {
  name: string;
  onChange?: (value: string) => void;
  value?: string;
};

export function CountryAutocomplete({ name, onChange, value = '' }: Props) {
  const countries = useCountriesStore((state) => state.countries);
  const [query, setQuery] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered =
    showDropdown && query && query !== value
      ? countries.filter((country) =>
          country.name.toLowerCase().includes(query.toLowerCase())
        )
      : countries;

  const handleSelect = (countryName: string) => {
    setQuery(countryName);
    setShowDropdown(false);
    onChange?.(countryName);
  };

  return (
    <div className="relative">
      <Input
        autoComplete="off"
        className="w-full"
        id={name}
        name={name}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        onChange={(event) => {
          setQuery(event.target.value);
          onChange?.(event.target.value);
        }}
        onFocus={() => setShowDropdown(true)}
        value={query}
      />

      {showDropdown && filtered.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded border bg-white shadow">
          {filtered.map((country) => (
            <li
              className="cursor-pointer px-2 py-1 hover:bg-gray-100"
              key={country.code}
              onMouseDown={(event) => {
                event.stopPropagation();
                handleSelect(country.name);
              }}
            >
              {country.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
