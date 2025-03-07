import React, { useState } from "react";
import SearchBox from "./components/SearchBox";
import SearchButton from "./components/SearchButton";
import SearchOutput from "./SearchOutput";
import { searchBranch } from "../back-end/search";
import "../styles.css";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const SearchField = () => {
  const [matches, setMatches] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [pathToRepo, setPathToRepo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleSearch = async () => {
    if (pathToRepo === "" || keyWord === "") {
      setLoading(false);
      setMatches([]);
      setError("Input required. Please enter a value and try again.");
      return;
    }
    console.log(pathToRepo, keyWord);
    const returnedMatches = await searchBranch(keyWord, pathToRepo).then((data) => data);
    if (returnedMatches[0]?.error) {
      const parts = returnedMatches[0]?.error?.split(":");
      setLoading(false);
      setMatches([]);
      setError(
        `There is an issue with that file path. ${parts[parts.length - 1]}: ${
          parts[parts.length - 2]
        }`
      );
      return;
    }
    if (returnedMatches.length === 0) {
      setLoading(false);
      setMatches("no output");
      return;
    }
    setLoading(false);
    setMatches(returnedMatches);
  };

  return (
    <div>
      <div className='inline-container'>
        <SearchBox
          props={{
            tooltipLabel: "Input the text you want to search for",
            label: "Text to Match",
            setInput: setKeyWord,
          }}
        />
        <SearchBox
          props={{
            tooltipLabel: "Input the global path to the local repository you want to search in",
            label: "Path to Local Repo",
            setInput: setPathToRepo,
          }}
        />
        <SearchButton handleSearch={handleSearch} setLoading={setLoading} setError={setError} />
      </div>
      <div style={{ padding: "10px", paddingTop: "20px" }}>
        {loading && (
          <div className='flex justify-center' style={{ flexAlign: "center" }}>
            <CircularProgress />
          </div>
        )}
        {!!error && <Alert severity='error'>{error}</Alert>}
        {matches.length > 0 && matches !== "no output" && !loading && (
          <SearchOutput
            props={{
              matches,
              keyWord,
            }}
          />
        )}
        {matches === "no output" && !loading && (
          <p style={{ flexAlign: "right", justifyContent: "right" }}>
            No matches found ૮ ⸝⸝o̴̶̷᷄ ·̭ o̴̶̷̥᷅⸝⸝ ྀིა
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchField;
