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
        className="thead-light sticky-top bg-secondary text-light"
        style={{ top: 60 }}
      >
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
