import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css";
import Spinner from "../spinner.gif";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);

  let source = "";

  useEffect(() => {
    // if (query !== "") fetchSearchResults(1);
    let pageNumber = page ? `&page=${page}` : "";
    const searchUrl = `https://pixabay.com/api/?key=21756805-62eaf3cdff32977aeb1697d2a&q=${query}${pageNumber}`;
    if (query !== "") {
      if (source) {
        source.cancel(); //this method comes from axios
      }
      source = axios.CancelToken.source();

      axios
        .get(searchUrl, { cancelToken: source.token })
        .then((res) => {
          // const resultNotFoundMessage =
          console.log(res.data);
          const resultNotFoundMsg = !res.data.hits.length
            ? "There are no results. Please try another search"
            : "";

          setResults(res.data.hits);
          setLoading(false);
          setMessage(resultNotFoundMsg);
        })
        .catch((error) => {
          if (axios.isCancel(error) || error) {
            setLoading(false);
            setMessage("Somthing went wrong. Please try again");
          }
        });
      return () => source.cancel();
    }
  }, [query]);

  const handleOnInputChange = (event) => {
    console.log("input changed");
    const value = event.target.value;
    setQuery(value);
    setLoading(true);
    setMessage("");
  };

  const renderSearchResults = () => {
    if (Object.keys(results).length && results.length) {
      return (
        <div className="results-container">
          {results.map((result) => {
            return (
              <a
                key={result.id}
                href={result.previewURL}
                className="result-items"
              >
                <h6 className="image-username">{result.user}</h6>
                <div className="image-wrapper">
                  <img
                    className="image"
                    src={result.previewURL}
                    alt={result.user}
                  />
                </div>
              </a>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="search_container">
      <h1 className="search_heading">React Live Search</h1>
      <label htmlFor="search-input" className="search_label">
        <input
          id="search-input"
          name="query"
          type="text"
          value={query}
          placeholder="Search ..."
          onChange={handleOnInputChange}
        />
        <div className="search_icon">
          <FontAwesomeIcon icon={faSearch} size="3x" color="#808080" />
        </div>
      </label>
      {/* {loading ? (
        <img src={Spinner} className="spinner" />
      ) : (
        renderSearchResults()
      )} */}

      {/*Error Message*/}
      {message && <p className="message">{message}</p>}
      {/*Loader*/}
      <img
        src={Spinner}
        className={`search-loading ${loading ? "show" : "hide"}`}
        alt="loader"
      />
      {renderSearchResults()}
    </div>
  );
};

export default Search;
