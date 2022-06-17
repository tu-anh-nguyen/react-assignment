import React, { Component } from "react";
import PropTypes from "prop-types";

export default class TableHead extends Component {
  static propTypes = {
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        props: PropTypes.any,
        renderCell: PropTypes.func,
      })
    ),
  };

  render() {
    const { columns } = this.props;
    return (
      <thead
        className="thead-light sticky-top bg-primary text-light"
        style={{ top: 60 }}
      >
        <tr className="bg-white">
          <td align="center" colSpan={columns.length}>
            <h2 className="text-center text-uppercase py-3 fw-bold text-dark">
              User list Management
            </h2>
          </td>
        </tr>
        <tr>
          {columns.map(({ id, label, props }) => (
            <th scope="col" {...props} key={`${id}_${label}`}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}
