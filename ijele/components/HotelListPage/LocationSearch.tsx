import { useState } from "react";
import debounce from "lodash.debounce";
import axios from "axios";

interface Suggestion {
  name: string;
  iataCode: string;
}

interface LocationSearchProps {
  onSelect: (location: Suggestion) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onSelect }) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const fetchSuggestions = async (value: string) => {
    try {
      const response = await axios.get<Suggestion[]>(
        `/api/location-search?query=${value}`
      );
      setSuggestions(response.data);
    } catch (error: any) {
      console.error(
        "Error fetching location suggestions:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);

    if (value.length > 2) {
      debouncedFetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion: Suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
    onSelect(suggestion);
  };

  return (
    <div className="relative mb-6">
      <h2 className="text-2xl font-semibold mb-2">Search Hotels</h2>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a city..."
        className="input input-bordered w-full max-w-xs"
      />
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white shadow-lg rounded-lg">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
