import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import callApi from "../../utils/apiCaller";
import "./ProductActionPage.css";
import { actAddProductRequest } from "../../actions";

class ProductActionPage extends React.Component {
  state = {
    id: "",
    txtName: "",
    txtPrice: "",
    chkbStatus: "",
  };

  // Load lai thong tin tren input
  componentDidMount() {
    let { match } = this.props;
    if (match) {
      let id = match.params.id;
      callApi(`products/${id}`, "GET", null).then((res) => {
        let data = res.data;
        this.setState({
          id: data.id,
          txtName: data.name,
          txtPrice: data.price,
          chkbStatus: data.status,
        });
      });
    }
  }

  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value,
    });

  };  

  onSave = (e) => {
    e.preventDefault();
    let { id, txtName, txtPrice, chkbStatus } = this.state;
    let { history } = this.props;
    let product = {
      id: id,
      name: txtName,
      price: txtPrice,
      status: chkbStatus,
    };
    if (id) {
      callApi(`products/${id}`, "PUT", {
        name: txtName,
        price: txtPrice,
        status: chkbStatus,
      }).then((res) => {
        history.goBack();
      });
    } else {
      this.props.onAddProduct(product);
      history.goBack();
    }
  };
  render() {
    let { txtName, txtPrice, chkbStatus } = this.state;
    console.log(this.state);
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <form onSubmit={this.onSave}>
          <div className="form-group">
            <label>Ten San Pham:</label>
            <input
              type="text"
              className="form-control"
              name="txtName"
              value={txtName}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Gia:</label>
            <input
              type="number"
              className="form-control"
              name="txtPrice"
              value={txtPrice}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Trang Thai:</label>
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                name="chkbStatus"
                value={chkbStatus}
                onChange={this.onChange}
                checked={chkbStatus}
              />
              Con Hang
            </label>
          </div>
          <Link to="/product-list" className="btn btn-danger">
            Back
          </Link>
          <button type="submit" className="btn btn-primary ml-10">
            Save
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddProduct: (product) => {
      dispatch(actAddProductRequest(product));
    },
  };
};

export default connect(null, mapDispatchToProps)(ProductActionPage);
