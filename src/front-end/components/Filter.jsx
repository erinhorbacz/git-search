import React, { useState, useMemo } from "react";
import FilterMenu from "./FilterMenu";
// import CheckboxGroup from './CheckboxGroup';
import SearchBox from "./SearchBox";
import Checkbox from "./Checkbox";

const Filter = ({ props }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { matches, setFilteredMatches, branches } = props;
  // const branches = [...new Set(matches?.map((match) => match?.branch))];
  const [filters, setFilters] = useState([]);
  const [searchedFilter, setSearchedFilter] = useState("");

  const filteredBranches = useMemo(() => {
    if (!searchedFilter) return branches;
    return branches.filter((branch) => branch.toLowerCase().includes(searchedFilter.toLowerCase()));
  }, [searchedFilter, branches]);

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };

  const handleChange = ({ target: { checked } }, branch) => {
    if (checked) {
      setFilters((prev) => [...prev, branch]);
    } else {
      setFilters((prev) => prev.filter((item) => item !== branch));
    }
  };

  const handleResetClick = () => {
    setFilters([]);
    setFilteredMatches(matches);
    setSearchedFilter("");
  };
  const handleApplyFilter = () => {
    setFilteredMatches(matches.filter((match) => filters.includes(match?.branch)));
    handleToggleMenu();
  };
  // const handleClearClick = () => {
  //   setFilters([]);
  // };

  // const handleApplyFilter = () => {
  //   setFilteredMatches(matches.filter((match) => Object.values(filters)?.includes(match?.branch)));
  //   handleToggleMenu();
  // };

  return (
    <FilterMenu
      filtersAppliedCount={filters.length}
      id='filter'
      menuStyles={{ height: "400px", width: "100%" }}
      showMenu={toggleMenu}
      onApplyButtonClick={handleApplyFilter}
      onApplyAllButtonClick={handleApplyFilter}
      onCloseClick={handleToggleMenu}
      onFilterButtonClick={handleToggleMenu}
      onMenuClose={handleToggleMenu}
      // onClearButtonClick={handleClearClick}
      onResetButtonClick={handleResetClick}>
      <SearchBox
        props={{
          tooltip: "Filter by branch",
          label: "Repo Branch",
          id: "repoBranch",
          input: searchedFilter,
          setInput: setSearchedFilter,
          onCloseClick: handleToggleMenu,
        }}
      />
      <div style={{ marginBottom: "10px" }} />
      {filteredBranches?.map(
        (branch, index) =>
          branch && (
            <Checkbox
              id={`checkbox-${index}`}
              key={index}
              label={branch}
              checked={filters.includes(branch)}
              onChange={(e) => handleChange(e, branch)}
            />
          )
      )}
    </FilterMenu>
  );
};

export default Filter;
