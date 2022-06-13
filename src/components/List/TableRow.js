import React, { Component } from "react";
import PropTypes from "prop-types";

export default class TableRow extends Component {
  render() {
    const { columns, data } = this.props;
    return (
      <tr>
        {columns.map(({ id, props, renderCell }, idx) => (
          <td {...props} key={`${id}_${idx}`}>
            {renderCell ? renderCell(data[id], data) : data[id]}
          </td>
        ))}
      </tr>
    );
  }
}

TableRow.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      props: PropTypes.object,
      renderCell: PropTypes.func,
    })
  ),
  data: PropTypes.object,
};
