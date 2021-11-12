import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTableHead,
  CTable,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
} from '@coreui/react'

const apiUrl = 'https://nao9id5aeg.execute-api.us-east-1.amazonaws.com/dev/api'

const GetAllUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get(`${apiUrl}/users`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res)
        setUsers(res.data)
      })
  }, [])

  return (
    <CCard className="mb-4">
      <CCardHeader>All Users</CCardHeader>
      <CCardBody>
        <CTable align="middle" className="mb-0 border px-2" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>Id</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map((user, index) => (
              <CTableRow key={index}>
                <CTableDataCell>
                  <div className="py-3">{user.id}</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div className="py-3">{user.name}</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div className="py-3">{user.email}</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div className="py-3">{user.phone}</div>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default GetAllUsers
