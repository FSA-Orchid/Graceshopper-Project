import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserThunk } from '../store/singleUser';

class SingleUser extends React.Component {
  componentDidMount() {
    this.props.loadSingleUser(this.props.match.params.userId);

  }

  render() {
    const user = this.props.user;

    return (
      <div className="SingleUser">
        <p>{`Username: ${user.username}`}</p>
        <p>{`Email: ${user.email}`}</p>
        <p>{`Address: ${user.address}`}</p>
      </div>
    );
  }
}
const mapState = (state) => {
  return { user: state.user };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleUser: (id) => dispatch(fetchUserThunk(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleUser);
