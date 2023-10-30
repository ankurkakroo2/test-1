import { useMemo, useState } from "react";
import _ from "lodash-es";

import "./SearchInput.css";

const SearchInput = ({ onQueryChange = () => {} }) => {
  const [value, setValue] = useState("");

  const debouncedOnQueryChange = useMemo(() => _.debounce(onQueryChange, 200), [
    onQueryChange
  ]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    debouncedOnQueryChange(newValue);
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      className="search-input"
      aria-labelledby="search-header"
      placeholder="Look for job titles, roles, skills..."
    />
  );
};

export default SearchInput;
