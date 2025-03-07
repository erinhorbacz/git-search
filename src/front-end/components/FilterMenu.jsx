import React from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { X, Filter } from "lucide-react";
import "../../styles.css";

const FilterMenu = ({
  children,
  showMenu,
  onFilterButtonClick,
  onCloseClick,
  onResetButtonClick,
  onApplyButtonClick,
  onClearButtonClick,
}) => {
  return (
    <div className='filter-container'>
      <TuneIcon onClick={onFilterButtonClick} color='primary' />
      {showMenu && (
        <div className='filter-menu'>
          <div className='filter-header'>
            <h4>Filter By Branch</h4>
            <button className='close-button' onClick={onCloseClick}>
              <X size={20} />
            </button>
          </div>
          <div className='filter-options'>{children}</div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className='apply-button' onClick={onApplyButtonClick}>
              Apply
            </button>
            <button className='apply-button' onClick={onResetButtonClick}>
              Reset
            </button>
            <button className='apply-button' onClick={onClearButtonClick}>
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMenu;
