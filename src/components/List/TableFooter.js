import React, { Component } from "react";

export default class TableFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 0,
    };
  }

  render() {
    const { limitOptions, currentLimit, handleChangeLimit } = this.props;
    const { show } = this.state;
    const handleToggle = () => {
      this.setState(({ show }) => ({ show: !show }));
    };
    const handleSelectOption = (_limit) => (event) => {
      handleChangeLimit(_limit);
      handleToggle();
    };
    return (
      <div className="dropup-center dropup">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropupCenterBtn"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={handleToggle}
        >
          {currentLimit}
        </button>
        <ul
          className={`dropdown-menu dropdown-menu-dark ${show ? "show" : ""}`}
          style={{ minWidth: "unset", inset: "auto auto 0px 0px" }}
        >
          {limitOptions.map((value, idx) => (
            <li key={`${value}_${idx}`}>
              <button
                className={`dropdown-item ${
                  currentLimit === value ? "active" : ""
                }`}
                onClick={handleSelectOption(value)}
              >
                {value}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
