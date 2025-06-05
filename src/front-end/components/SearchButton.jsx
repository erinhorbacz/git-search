import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

export function SearchButton({ handleSearch, setLoading }) {
  return (
    <div style={{ paddingTop: 50 }}>
      <Button
        startIcon={<SearchIcon />}
        variant='contained'
        onClick={async () => {
          setLoading(true);
          handleSearch();
        }}
        size='small'
        style={{ paddingLeft: 30, paddingRight: 40, height: 40 }}>
        <p style={{ color: "white" }}>Search</p>
      </Button>
    </div>
  );
}

export default SearchButton;
