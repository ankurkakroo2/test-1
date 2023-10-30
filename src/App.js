import { useCallback, useReducer } from "react";

import { SearchResults } from "./components/SearchResults";
import { SearchInput } from "./components/SearchInput";
import { getResults, searchUniverse } from "./utils";

import "./styles.css";

const initialState = {
  query: "",
  results: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_QUERY": {
      return { query: action.query, results: getResults(action.query) };
    }
    default:
      return { ...state };
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleQueryChange = useCallback(
    (query) => {
      dispatch({ type: "SET_QUERY", query });
    },
    [dispatch]
  );
  return (
    <div className="App">
      <h1 id="search-header">Let's create your test</h1>
      <main className="app-content">
        <SearchInput onQueryChange={handleQueryChange} />
        <SearchResults
          results={state.query ? state.results : searchUniverse}
          title={state.query ? "Results" : "All roles"}
        />
      </main>
    </div>
  );
}
