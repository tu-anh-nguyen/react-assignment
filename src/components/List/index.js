import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import withRouter from "../../helpers/withRouter";
import fetcher from "../../services/fetcher";
import deleter from "../../services/deleter";
import TableFooter from "./TableFooter";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

const defaultPaging = {
  skip: 0,
  limit: 10,
};

const noAvatarUrl =
  "https://tse2.mm.bing.net/th/id/OIP.1QE_bLwBgy4tLarLPJYrEAHaHa?pid=ImgDet&rs=1";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      totalPage: 0,
      customers: [],
      skip: defaultPaging.skip,
      limit: defaultPaging.limit,
    };
  }

  columns = [
    {
      id: "index",
      label: "No.",
      renderCell: (idx) => idx + 1 + this.state.skip,
      props: {
        className: "text-center",
      },
    },
    {
      id: "image",
      label: "Avatar",
      renderCell: (val) => (
        <div className="d-flex justify-content-center">
          <img
            src={val || noAvatarUrl}
            alt={val}
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              border: "1px solid #ADADAD",
              objectFit: "cover",
            }}
          />
        </div>
      ),
    },
    {
      label: "Name",
      renderCell: (_, fullVal) => `${fullVal.firstName} ${fullVal.lastName}`,
    },
    {
      id: "age",
      label: "Age",
      props: {
        style: {
          textAlign: "center",
        },
      },
    },
    {
      id: "gender",
      label: "Gender",
      props: {
        style: {
          textAlign: "center",
          textTransform: "capitalize",
        },
      },
    },
    { id: "email", label: "Email" },
    {
      id: "address",
      label: "Address",
      renderCell: (val) => (
        <>
          {val.address}
          {val.city ? `, ${val.city}` : ""}
          {val.state ? `, ${val.state}` : ""}
          {val.postalCode ? `, ${val.postalCode}` : ""}
        </>
      ),
    },
    {
      id: "id",
      label: "Action",
      props: {
        className: "text-center",
      },
      renderCell: (id) => (
        <div className="d-flex justify-content-around align-items-center">
          <NavLink to={`/update/${id}`}>
            <button
              type="button"
              title="Update user"
              className="btn btn-outline-dark rounded-5 mx-2"
            >
              <i className="fa-solid fa-pen"></i>
            </button>
          </NavLink>
          <button
            type="button"
            title="Remove user"
            className="btn btn-outline-dark rounded-5"
            onClick={this.handleRemoveUser(id)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  async getListUser(_skip, _limit) {
    this.setState((pre) => ({ ...pre, loading: true }));
    try {
      const { data: resp } = await fetcher("/users", {
        skip: _skip,
        limit: _limit,
      });
      this.setState({
        customers: resp.users,
        skip: _skip,
        limit: _limit,
        totalPage: resp.total / _limit,
        currentPage: Math.floor(_skip / _limit),
      });
    } catch (error) {
      this.setState((pre) => ({ ...pre, error: error.message }));
    }
    this.setState((pre) => ({ ...pre, loading: false }));
  }

  async removeUser(_id) {
    try {
      await deleter(`/users/${_id}`);
      this.getListUser(0, this.state.limit);
    } catch (error) {
      this.setState((pre) => ({ ...pre, error: error.message }));
    }
  }

  componentDidMount() {
    const { skip, limit } = this.state;
    this.getListUser(skip, limit);
  }

  handlePagination(_pageIndex) {
    return () => {
      const { limit } = this.state;
      const skip = _pageIndex * limit;
      this.getListUser(skip, limit);
    };
  }

  handleChangeLimit(_limit) {
    this.getListUser(0, _limit);
  }

  handleRemoveUser(_id) {
    return (_) => {
      this.removeUser(_id);
    };
  }
  render() {
    const { customers, loading, error, currentPage, totalPage, limit } =
      this.state;
    return (
      <div className="container-lg overflow-auto">
        <h2 className="text-center text-uppercase py-3 fw-bold">
          User list Management
        </h2>
        <table className="table table-hover align-middle">
          <TableHead columns={this.columns} />
          <tbody>
            {loading ? (
              <tr className="text-center">
                <td colSpan={this.columns.length}>
                  <div className="d-flex align-items-center justify-content-center py-4">
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    />
                    <span className="sr-only text-primary fs-5">
                      Loading...
                    </span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr className="text-center">
                <td colSpan={this.columns.length}>
                  <h6>{error}</h6>
                </td>
              </tr>
            ) : (
              Array.isArray(customers) &&
              customers.map((customer, index) => (
                <TableRow
                  key={`${customer.id}_${index}`}
                  columns={this.columns}
                  data={{ ...customer, index }}
                />
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={this.columns.length}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      disabled={currentPage === 0}
                      onClick={this.handlePagination(currentPage - 1)}
                    >
                      <i className="fa-solid fa-angle-left"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      disabled={!totalPage || currentPage === totalPage - 1}
                      onClick={this.handlePagination(currentPage + 1)}
                    >
                      <i className="fa-solid fa-angle-right"></i>
                    </button>
                  </div>
                  <TableFooter
                    limitOptions={[5, 10, 20]}
                    currentLimit={limit}
                    handleChangeLimit={(_limit) =>
                      this.handleChangeLimit(_limit)
                    }
                  />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default withRouter(UserList);
