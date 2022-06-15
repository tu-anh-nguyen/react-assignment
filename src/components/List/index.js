import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToast } from "../../redux/actions";
import { ToastType } from "../../redux/constants/toastConstant";
import deleter from "../../services/deleter";
import fetcher from "../../services/fetcher";
import { ErrorComponent, LoadingComponent } from "../common";
import RowLimit from "./RowLimit";
import TableHead from "./TableHead";
import TablePagination from "./TablePagination";
import TableRow from "./TableRow";

const noAvatarUrl =
  "https://tse2.mm.bing.net/th/id/OIP.1QE_bLwBgy4tLarLPJYrEAHaHa?pid=ImgDet&rs=1";

export default function List() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);

  const dispatch = useDispatch();

  const getListUser = useCallback(async (_skip, _limit) => {
    setLoading(true);
    try {
      const { data: resp } = await fetcher("/users", {
        skip: _skip,
        limit: _limit,
      });
      setCustomers(resp.users);
      setSkip(_skip);
      setLimit(_limit);
      setTotalPage(resp.total / _limit);
      setCurrentPageIdx(Math.floor(_skip / _limit));
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  const removeUser = async (_id) => {
    try {
      await deleter(`/users/${_id}`);
      await getListUser(skip, limit);
      dispatch(
        addToast({
          type: ToastType.SUCCESS,
          title: "Removed user successfully!",
          description: "",
        })
      );
    } catch (error) {
      dispatch(
        addToast({
          type: ToastType.ERROR,
          title: "Something went wrong",
          description: error?.message,
        })
      );
    }
  };

  const handlePagination = (_pageIndex) => () => {
    const skip = _pageIndex * limit;
    setSkip(skip);
  };

  const handleRemoveUser = (_id) => (_) => removeUser(_id);

  const columns = [
    {
      id: "index",
      label: "No.",
      renderCell: (idx) => idx + 1 + skip,
      props: {
        className: "text-center",
      },
    },
    {
      id: "image",
      label: "Avatar",
      props: { className: "text-center" },
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
        className: "text-center",
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
          <Link to={`/update/${id}`}>
            <button
              type="button"
              title="Update user"
              className="btn btn-outline-dark rounded-5 mx-2"
            >
              <i className="fa-solid fa-pen"></i>
            </button>
          </Link>
          <button
            type="button"
            title="Remove user"
            className="btn btn-outline-dark rounded-5"
            onClick={handleRemoveUser(id)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getListUser(skip, limit);
  }, [skip, limit, getListUser]);

  return (
    <div className="container-lg">
      <table className="table table-hover align-middle">
        <TableHead columns={columns} />
        <tbody>
          {loading ? (
            <tr className="text-center">
              <td colSpan={columns.length}>
                <LoadingComponent />
              </td>
            </tr>
          ) : error ? (
            <tr className="text-center">
              <td colSpan={columns.length}>
                <ErrorComponent message={error} />
              </td>
            </tr>
          ) : (
            Array.isArray(customers) &&
            customers.map((customer, index) => (
              <TableRow
                key={`${customer.id}_${index}`}
                columns={columns}
                data={{ ...customer, index }}
              />
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={columns.length}>
              <div className="d-flex justify-content-between align-items-center">
                <TablePagination
                  currentPageIdx={currentPageIdx}
                  totalPage={totalPage}
                  loading={loading}
                  handlePagination={handlePagination}
                />
                <RowLimit
                  limitOptions={[5, 10, 20, 50]}
                  currentLimit={limit}
                  handleChangeLimit={setLimit}
                />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
