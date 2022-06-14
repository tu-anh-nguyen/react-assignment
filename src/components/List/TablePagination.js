import React from "react";
import PropTypes from "prop-types";

const TablePagination = ({
  currentPageIdx,
  totalPage,
  loading,
  handlePagination,
}) => {
  const disabledPreviousButton = loading || currentPageIdx === 0;
  const disabledNextButton =
    loading || !totalPage || currentPageIdx === totalPage - 1;
  return (
    <div>
      <button
        type="button"
        className={`btn mx-2 ${
          disabledPreviousButton
            ? "btn-outline-secondary"
            : "btn-outline-primary"
        }`}
        disabled={disabledPreviousButton}
        onClick={handlePagination(currentPageIdx - 1)}
      >
        <i className="fa-solid fa-angle-left"></i>
      </button>
      <button
        type="button"
        className={`btn mx-2 ${
          disabledNextButton ? "btn-outline-secondary" : "btn-outline-primary"
        }`}
        disabled={disabledNextButton}
        onClick={handlePagination(currentPageIdx + 1)}
      >
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
};

TablePagination.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      currentPageIdx: PropTypes.number,
      totalPage: PropTypes.number,
      loading: PropTypes.bool,
      handlePagination: PropTypes.func.isRequired,
    })
  ),
};

export default TablePagination;
