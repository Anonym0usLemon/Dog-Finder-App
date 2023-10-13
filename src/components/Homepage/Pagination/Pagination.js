import { useEffect, useState } from "react";
import LeftArrow from "../../../assets/LeftArrow";
import RightArrow from "../../../assets/RightArrow";
import "./Pagination.scss";
const Pagination = (props) => {
  const [disabled, setDisabled] = useState({
    next: undefined,
    prev: undefined
  });

  useEffect(() => {
    // Update the disabled state when props change
    setDisabled({
        next: props.paginationInfo.nextLink,
        prev: props.paginationInfo.prevLink
    });
  }, [props.paginationInfo]); 

  function nextPage() {
    props.pagination("next");
  }

  function previousPage() {
    props.pagination("prev");
  }

  return (
    <div className="pagination">
      <button
        onClick={previousPage}
        disabled={disabled.prev === undefined}
        className={props.paginationInfo.prevLink !== undefined ? "" : "disabled"}
      >
        <LeftArrow />
        <span>Prev</span>
      </button>
      <button
        onClick={nextPage}
        disabled={props.paginationInfo.total < 25}
        className={props.paginationInfo.nextLink !== undefined ? "" : "disabled"}
      >
        <span>Next</span>
        <RightArrow />
      </button>
    </div>
  );
};

export default Pagination;
