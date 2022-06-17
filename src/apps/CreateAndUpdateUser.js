import React, { useEffect, useState } from "react";
import fetcher from "../services/fetcher";
import UserForm from "../components/Form";
import withRouter from "../helpers/withRouter";
import { useParams } from "react-router-dom";
import { ErrorComponent } from "../components/common";

function CreateUser() {
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchUserDetail = async (id) => {
      setLoading(true);
      try {
        const data = await fetcher(`/users/${id}`);
        setInitialValues(data.data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    if (id) {
      document.title = "Update user";
      fetchUserDetail(id);
    } else {
      document.title = "Create new user";
      setInitialValues({});
    }
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center py-4">
        <div className="spinner-border text-primary" role="status" />
        <span className="sr-only text-primary fs-5">Loading...</span>
      </div>
    );
  }

  if (error) return <ErrorComponent message={error} />;

  return (
    <UserForm
      key={JSON.stringify(initialValues)}
      initialValues={initialValues}
    />
  );
}

export default withRouter(CreateUser);
