import React from 'react';
import { connect } from 'react-redux';
import {
  fetchUserThunk,
  updateUserThunk,
  fetchUser,
} from '../store/singleUser';

class EditSingleUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      address: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.loadUser(this.props.match.params.userId);

  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.setState({
        username: this.props.user.username,
        email: this.props.user.email,
        address: this.props.user.address,
      });
    }
  }
  componentWillUnmount() {
    this.props.clearUser();
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });


  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateUser({
      ...this.state,
      id: this.props.match.params.userId,
    });
  }

  render() {
    return (
      <form>

        <h2>Edit User Info:</h2>
        <label>Username:</label>
        <input
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <label>Email:</label>
        <input
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <label>Address:</label>
        <input
          name="address"
          value={this.state.address}
          onChange={this.handleChange}
        />
        <button type="submit" onClick={(evt) => this.handleSubmit(evt)}>
          Submit
        </button>
      </form>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadUser: (id) => dispatch(fetchUserThunk(id)),
    updateUser: (user) => dispatch(updateUserThunk(user)),
    clearUser: () => dispatch(fetchUser({})),
  };
};

export default connect(mapState, mapDispatch)(EditSingleUser);

// export default EditCampus;
