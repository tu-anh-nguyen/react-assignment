import React, { Component } from "react";
import fetcher from "../services/fetcher";
import UserForm from "../components/Form";
import withRouter from "../helpers/withRouter";
class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {},
      loading: false,
    };
  }
  async fetchUserDetail(id) {
    const data = await fetcher(`/users/${id}`);
    return data.data;
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      document.title = "Update user";
      this.setState({ loading: true });
      const initialValues = await this.fetchUserDetail(id);
      this.setState({ initialValues, loading: false });
    } else {
      document.title = "Create new user";
    }
  }

  render() {
    const { initialValues, loading } = this.state;
    if (loading) {
      return (
        <div className="d-flex align-items-center justify-content-center py-4">
          <div className="spinner-border text-primary" role="status" />
          <span className="sr-only text-primary fs-5">Loading...</span>
        </div>
      );
    }
    return <UserForm initialValues={initialValues} />;
  }
}

export default withRouter(CreateUser);
