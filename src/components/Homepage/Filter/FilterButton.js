import { useState } from "react";
import FilterIcon from "../../../assets/FilterIcon";
import Filter from "./Filter";

const FilterButton = () => {
  const [filterToggle, setFilterToggle] = useState(false);

  function showFilter() {
    setFilterToggle(true);
  }

  function hideFilter() {
    setFilterToggle(false);
  }

  return (
    <>
      {filterToggle && <Filter noFilter={hideFilter}/>}
      <button onClick={showFilter}>
        Filter <FilterIcon />
      </button>
    </>
  );
};

export default FilterButton;
