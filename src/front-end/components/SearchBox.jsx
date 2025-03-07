import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TextField from "@mui/material/TextField";
import "../../styles.css";

const SearchBox = ({ props }) => {
  const { tooltipLabel, label, setInput } = props;

  const onChange = (event) => {
    setInput(event?.target?.value);
  };
  console.log(tooltipLabel);
  return (
    <div>
      <div
        style={{
          gap: 0,
          display: "inline-flex",
          whiteSpace: "nowrap",
          alignItems: "center",
        }}>
        <p>{label}</p>
        <Tooltip title={tooltipLabel} placement='right-start'>
          <IconButton>
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      </div>
      <form>
        <div className='inline-container' style={{ padding: 0 }}>
          <TextField id='outlined-search' type='search' onChange={onChange} />
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
