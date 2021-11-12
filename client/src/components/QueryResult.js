import axios from 'axios'
import React from 'react'
import PropTypes from 'prop-types'
import { CreateUser, GetAllUsers, GetUser, UpdateUser, DeleteUser } from './queries'

const queryTypes = ['Create user', 'Get all users', 'Get user', 'Update user', 'Delete user']

const QueryResult = ({ queryType }) => {
  switch (queryType) {
    case 0:
      return <CreateUser />
    case 1:
      return <GetAllUsers />
    case 2:
      return <GetUser />
    case 3:
      return <UpdateUser />
    case 4:
      return <DeleteUser />
    default:
      return <div>hello world</div>
  }
}

QueryResult.propTypes = {
  queryType: PropTypes.number,
}

export default QueryResult
