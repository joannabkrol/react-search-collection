import React, { useState } from "react";
import "./Search.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="search_container">
      <h1 className="search_heading">React Live Search</h1>
      <label htmlFor="search-input" className="search_label">
        <input
          id="search-input"
          type="text"
          value=""
          placeholder="Search ..."
        />
        <div className="search_icon">
          <FontAwesomeIcon icon={faSearch} size="3x" color="#808080" />
        </div>
      </label>
    </div>
  );
};

export default Search;
