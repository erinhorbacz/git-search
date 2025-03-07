import React, { useState } from "react";
import Match from "./components/Match";
import Filter from "./components/Filter";

const SearchOutput = ({ props }) => {
  const { keyWord, matches } = props;
  const [filteredMatches, setFilteredMatches] = useState(matches);

  return (
    <div>
      <div className='inline-container' style={{ padding: "0px" }}>
        <p>{`Search Results for "${keyWord}"`}</p>
        <Filter props={{ matches, setFilteredMatches }} />
      </div>
      {filteredMatches?.length === 0 || filteredMatches === "no output" ? (
        <p>No filter selected... please reset filters</p>
      ) : (
        <>
          <div>
            {filteredMatches?.map((match, index) => {
              console.log("match", match);
              if (match) {
                return (
                  <Match
                    key={index}
                    branch={match?.branch}
                    file={match?.file}
                    line={match?.line}
                    content={match?.content}
                    keyword={keyWord}
                  />
                );
              } else return null;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchOutput;
