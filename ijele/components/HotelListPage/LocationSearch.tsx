import { useState } from "react";
import debounce from "lodash.debounce";
import axios from "axios";
import { TitleCase } from "@/lib/customTools";

interface Suggestion {
  name: string;
  iataCode: string;
}

interface LocationSearchProps {
  onSelect: (location: Suggestion) => void;
  type: "origin" | "destination" | "city";
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onSelect, type }) => {
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

  const placeholderText: { [key in LocationSearchProps["type"]]: string } = {
    origin: "Search Origin City...",
    destination: "Search Destination City...",
    city: "Search City...",
  };

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholderText[type]}
          className="sidebar-inputfield w-40 h-8 m-2 pl-2 focus:outline-none"
        />
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 mt-1 w-full max-h-60 overflow-auto bg-white border border-gray-300 rounded-lg z-10">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSelect(suggestion)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {TitleCase(suggestion.name)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSearch;
