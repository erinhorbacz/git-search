import React, { useState } from "react";
import Button from "@mui/material/Button";
import Match from "./components/Match";
import Filter from "./components/Filter";

const SearchOutput = ({ props }) => {
  const { keyWord, matches, repoLink, branches } = props;
  const [filteredMatches, setFilteredMatches] = useState(matches);
  const [visibleCount, setvisibleCount] = useState(100);

  const showMore = () => {
    setvisibleCount((prev) => prev + 100);
  };

  const showLess = () => {
    setvisibleCount((prev) => prev - 100);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p>{`Search Results for "${keyWord}"`}</p>
        <Filter props={{ matches, setFilteredMatches, branches }} />
      </div>
      {filteredMatches?.length === 0 || filteredMatches === "no ouput" ? (
        <p>No filter selected... please reset filters</p>
      ) : (
        <>
          <div>
            {filteredMatches?.slice(0, visibleCount)?.map((match, index) => {
              if (match) {
                return (
                  <Match
                    key={index}
                    branch={match?.branch}
                    file={match?.file}
                    line={match?.line}
                    content={match?.code}
                    keyword={keyWord}
                    repoLink={repoLink}
                  />
                );
              } else return null;
            })}
          </div>
          {filteredMatches?.length > visibleCount && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              {visibleCount < filteredMatches?.length && (
                <Button size='small' onClick={showMore} variant='contained'>
                  <p style={{ color: "white" }}>Show More</p>
                </Button>
              )}
              {visibleCount >= filteredMatches?.length && (
                <Button size='small' onClick={showLess} variant='contained'>
                  <p style={{ color: "white" }}>Show Less</p>
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SearchOutput;
