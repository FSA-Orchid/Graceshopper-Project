import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsersThunk } from '../store/users';

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    if (!this.props.users) {
      return <h1>No Users!</h1>;
    }
    let users = this.props.users;
    return (
      <div className="AllUsers">
        {users.map((user) => {
          return (
            <Link to={`/users/${user.id}`}>
              <div>
                <form key={user.id} className="userBox">
                  <h2>{user.username}</h2>
                </form>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}
const mapState = (state) => {
  return { users: state.users };
};

const mapDispatch = (dispatch) => {
  return {
    loadUsers: () => dispatch(fetchUsersThunk()),
  };
};

export default connect(mapState, mapDispatch)(AllUsers);
