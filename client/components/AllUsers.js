import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import productsReducer from '../store/products'

class AllUsers extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      users: []
    }
  }
  componentDidMount() {
    this.setState({
      users: this.props.users
    })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.users !== this.props.users){
      this.setState({
        users: this.props.users || [],
      })
    }
  }

  render(){
    if(!this.props.users){return <h1>No Products!</h1>}
    let users = this.state.users
    return (
      <div className='AllUsers'>
        {users.map((user) => {
          return (
            <form key={user.id} className='userBox'>
              <Link to={`/users/${user.id}`} >
                <h2>{user.username}</h2>
              </Link>
            </form>
          )
        })}
      </div>
    )
  }

}
// const mapState = (state) => {
//   return state.users
// }

const mapDispatch = (dispatch) => {
  return {
    loadUsers: () => dispatch(/* NEED THUNK FOR USERS */)
  }

}

export const AllUsersPaged = connect(null, mapDispatch)(AllUsers)
