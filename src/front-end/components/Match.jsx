import React, { useState } from "react";
import { searchFile } from "../../back-end/search";
import "../../styles.css";

const Match = ({ branch, file, line, content, keyword, repoLink }) => {
  const [loading, setLoading] = useState(false);
  const folders = file?.split("/");
  if (folders && folders[0] === "build") {
    return;
  }

  const highlightedContent = content?.split(keyword)?.map((part, index, arr) => {
    if (index < arr?.length - 1) {
      return (
        <span key={index}>
          {part}
          <span className='highlight'>{keyword}</span>
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });

  const handleFileClick = async () => {
    console.log("Opening file:", repoLink, branch, file);
    const fileUrl = await searchFile(repoLink, branch, file);
    window.open(fileUrl, "_blank");
    setLoading(false);
  };

  return (
    <div className={`match ${loading ? "loading" : ""}`}>
      <p className='branch'>{branch}</p>
      <a
        onClick={() => {
          setLoading(true);
          handleFileClick();
        }}
        style={{ cursor: "pointer" }}>
        <p className='file-path'>{file}</p>
      </a>
      <p className='line-number'>Line number: {line}</p>
      <code className='match-content'>{highlightedContent}</code>
    </div>
  );
};

export default Match;
