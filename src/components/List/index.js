import React, { Component } from "react";
import fetcher from "../../services/fetcher";
import TableFooter from "./TableFooter";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

const defaultPaging = {
  skip: 0,
  limit: 10,
};

const noAvatarUrl =
  "https://tse2.mm.bing.net/th/id/OIP.1QE_bLwBgy4tLarLPJYrEAHaHa?pid=ImgDet&rs=1";

export default class UserList extends Component {
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
      id: "company",
      label: "Working Details",
      renderCell: (val) => (
        <>
          <p>
            <b>Position:</b> {val.title}
          </p>
          <p>
            <b>At company:</b> {val.name}
          </p>
          <p>
            <b>Department:</b> {val.department}
          </p>
        </>
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
        totalPage: resp.total,
        currentPage: Math.floor(_skip / _limit),
      });
    } catch (error) {
      console.log("error", error);
      this.setState((pre) => ({ ...pre, error: error.message }));
    }
    this.setState((pre) => ({ ...pre, loading: false }));
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

  handleChangeLimit(_limit) {}

  render() {
    console.log("this.state", this.state);
    const { customers, loading, error, currentPage, totalPage, limit } =
      this.state;
    return (
      <div>
        <div className="container">
          <div className="row">
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
                      key={customer.id}
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
                          disabled={currentPage === 0}
                          onClick={this.handlePagination(currentPage - 1)}
                        >
                          previous
                        </button>
                        <button
                          disabled={!totalPage || currentPage === totalPage - 1}
                          onClick={this.handlePagination(currentPage + 1)}
                        >
                          next
                        </button>
                      </div>
                      <TableFooter
                        limitOptions={[5, 10, 20]}
                        currentLimit={limit}
                        handleChangeLimit={(_limit) =>
                          this.getListUser(0, _limit)
                        }
                      />
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
