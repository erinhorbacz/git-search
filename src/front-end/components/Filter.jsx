import React, { useState } from "react";
import FilterMenu from "./FilterMenu";
// import CheckboxGroup from './CheckboxGroup';
import Checkbox from "./Checkbox";

const Filter = ({ props }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { matches, setFilteredMatches } = props;
  const branches = [...new Set(matches?.map((match) => match?.branch))];
  const [filters, setFilters] = useState(branches);

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };

  const handleChange = ({ target: { checked } }, branch) => {
    if (checked) {
      setFilters((previous) => [...previous, branch]);
    } else {
      setFilters((prev) => prev.filter((item) => item !== branch));
    }
  };

  const handleResetClick = () => {
    setFilters(branches);
    // setFilteredMatches(matches);
  };

  const handleClearClick = () => {
    setFilters([]);
  };

  const handleApplyFilter = () => {
    setFilteredMatches(matches.filter((match) => Object.values(filters)?.includes(match?.branch)));
    handleToggleMenu();
  };

  return (
    <FilterMenu
      filtersAppliedCount={0}
      id='filter'
      menuStyles={{ height: "400px", width: "50%" }}
      showMenu={toggleMenu}
      onApplyButtonClick={handleApplyFilter}
      onApplyAllButtonClick={handleApplyFilter}
      onCloseClick={handleToggleMenu}
      onFilterButtonClick={handleToggleMenu}
      onMenuClose={handleToggleMenu}
      onResetButtonClick={handleResetClick}
      onClearButtonClick={handleClearClick}>
      {branches?.map((branch, index) => {
        if (branch) {
          return (
            <Checkbox
              id={`checkbox-${index}`}
              key={index}
              label={branch}
              checked={Object.values(filters)?.includes(branch)}
              onChange={(e) => handleChange(e, branch)}
            />
          );
        } else return null;
      })}
    </FilterMenu>
  );
};

export default Filter;
