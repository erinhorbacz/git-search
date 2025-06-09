import React, { useState, useEffect } from "react";
import SearchBox from "./components/SearchBox";
import SearchButton from "./components/SearchButton";
import SearchOutput from "./SearchOutput";
import { searchRepo, getBranches } from "../back-end/search";
import "../styles.css";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const SearchField = () => {
  const [matches, setMatches] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [branches, setBranches] = useState();

  const handleSearch = async () => {
    setError();
    if (repoLink === "" || keyWord === "") {
      console.log("these are the inputs", repoLink, keyWord);
      setMatches([]);
      setError("Input required. Please enter a value in both text boxes and try again.");
      return;
    }
    const splitRepo = repoLink.split("/");
    const repo = splitRepo.pop();
    const owner = splitRepo.pop();
    await searchRepo(keyWord, owner, repo, setMatches, setError);
    const gitBranches = await getBranches(owner, repo);
    console.log("git branches are", gitBranches);
    if (gitBranches) {
      setBranches(gitBranches);
    } else {
      setBranches([...new Set(matches?.map((match) => match?.branch))]);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [matches]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("enter button was pressed");
      setLoading(true);
      handleSearch();
    }
  };

  const getSearchScreen = () => {
    if (loading) {
      return (
        <div className='flex justify-center' style={{ flexAlign: "center" }}>
          <CircularProgress />
        </div>
      );
    }
    return (
      <>
        {!!error && <Alert severity='error'>{error}</Alert>}
        {matches?.length > 0 && matches !== "no ouput" && (
          <SearchOutput
            props={{
              matches,
              keyWord,
              repoLink,
              branches,
            }}
          />
        )}
        {matches === "no ouput" && (
          <p style={{ flexAlign: "right", justifyContent: "right" }}>
            No matches found ૮ ⸝⸝o̴̶̷᷄ ·̭ o̴̶̷̥᷅⸝⸝ ྀིა
          </p>
        )}
      </>
    );
  };

  return (
    <div>
      <div className='inline-container'>
        <SearchBox
          props={{
            tooltip: "Input text to search for",
            label: "Text to Match",
            id: "textToMatch",
            input: keyWord,
            setInput: setKeyWord,
            onKeyDown: handleKeyDown,
          }}
        />
        <SearchBox
          props={{
            tooltip: "Link to the master branch of the repository to search",
            label: "Link to Repo",
            id: "pathToRepo",
            input: repoLink,
            setInput: setRepoLink,
            onKeyDown: handleKeyDown,
          }}
        />
        <SearchButton handleSearch={handleSearch} setLoading={setLoading} />
      </div>
      <div style={{ padding: "10px", paddingTop: "20px" }}>{getSearchScreen()}</div>
    </div>
  );
};

export default SearchField;
