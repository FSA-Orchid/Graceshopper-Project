import axios from 'axios';

const initialstate = {};

const FetchUser = 'FETCH_User';
const DeleteUser = 'DELETE_USER';
const UpdateUser = 'UPDATE_USER';

//this page is for admin control of user

export const fetchUser = (user) => {
  return { type: FetchUser, user };
};

export const deleteUser = (user) => {
  return { type: DeleteUser, user };
};

export const updateUser = (user) => {
  return { type: UpdateUser, user };
};

export const fetchUserThunk = (id) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/api/users/${id}`);
      let user = response.data;
      dispatch(fetchUser(user));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateUserThunk = (user) => {
  return async function (dispatch) {
    try {
      let response = await axios.put(`/api/users/${user.id}`, user);
      let newUser = response.data;
      dispatch(updateUser(newUser));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function userReducer(state = initialstate, action) {
  switch (action.type) {
    case FetchUser:
      return action.user;
    case DeleteUser:
      return initialstate;
    case UpdateUser:
      return action.user;
    default:
      return state;
  }
}
