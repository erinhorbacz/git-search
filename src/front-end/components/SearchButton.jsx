import React, { useState } from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

export function SearchButton({ handleSearch, setLoading, setError }) {
  return (
    <div style={{ paddingTop: 50 }}>
      <Button
        startIcon={<SearchIcon />}
        variant='contained'
        onClick={async () => {
          setError();
          setLoading(true);
          handleSearch();
        }}
        size='small'
        style={{ paddingLeft: 30, paddingRight: 40 }}>
        <p style={{ color: "white" }}>Search</p>
      </Button>
    </div>
  );
}

export default SearchButton;
