import { useState } from "react";
import FilterIcon from "../../../assets/FilterIcon";
import Filter from "./Filter";

const FilterButton = (props) => {
  const [filterToggle, setFilterToggle] = useState(false);

  function showFilter() {
    setFilterToggle(true);
  }

  function hideFilter() {
    setFilterToggle(false);
  }

  function receiveData(formState) {
    props.parseData(formState); 
  }

  return (
    <>
      {filterToggle && <Filter parseData={receiveData} noFilter={hideFilter}/>}
      <button className={props.className} onClick={showFilter}>
        Filter <FilterIcon />
      </button>
    </>
  );
};

export default FilterButton;
