import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./ProductItem.css";

class ProductItem extends Component {
  onDelete = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure about that?")) {
      this.props.onDelete(id);
    }
  };

  render() {
    let { product, index } = this.props;
    const statusName = product.name ? "Con Hang" : "Het Hang";
    const statusClass = product.status ? "warning" : "default";
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>
          <span className={`label label-${statusClass}`}>{statusName}</span>
        </td>
        <td>
          <Link to={`/product/${product.id}/edit`} className="btn btn-success">
            Sua
          </Link>
          <button
            type="button"
            className="btn btn-danger ml-10"
            onClick={() => this.onDelete(product.id)}
          >
            Xoa
          </button>
        </td>
      </tr>
    );
  }
}

export default ProductItem;
