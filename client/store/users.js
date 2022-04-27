import axios from "axios";

const initialstate = []

const FetchUsers = 'FETCH_USERS'
const DeleteUser = 'DELETE_USER'
const UpdateUser = 'UPDATE_USER'

//this page is for admin control of users


export const fetchUsers = (users) => {
  return {type: FetchUsers,
          users
        }
}

export const deleteUser = (user) => {
  return {type: DeleteUser,
          user
        }
}

export const updateUser = (user) => {
  return {type: UpdateUser,
          user
    }
}

export const fetchUsersThunk = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get('/api/users')
      let users = response.data
      dispatch(fetchUsers(users))
    }
    catch (err){console.log(err)}
  }
}

export const deleteUserThunk = (user) => {
  return async function (dispatch) {
    try {
      let response = await axios.delete(`/api/users/${user.id}`)
      dispatch(deleteUser(user))
    }
    catch (err){console.log(err)}
  }
}

export const updateUserThunk = (user) => {
  return async function (dispatch) {
    try {
      let response = await axios.put(`/api/users/${user.id}`)
      let upUser = response.data
      dispatch(deleteUser(upUser))
    }
    catch (err){console.log(err)}
  }
}


export default function userReducer(state = initialstate, action) {
  switch (action.type) {
    case FetchUsers:
    return action.users
    case DeleteUser:
    return state.filter((user) => user.id !== action.user.id)
    case UpdateUser:
    return state.map((user) => {
        if (user.id === action.user.id){return action.user}
        else
        {return user}})
    default:
    return state
  }
}
