import axios from 'axios'
import React, { useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CRow,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CCardHeader,
  CTableHead,
  CTable,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
} from '@coreui/react'

const apiUrl = 'https://nao9id5aeg.execute-api.us-east-1.amazonaws.com/dev/api'

const GetUser = () => {
  const [user, setUser] = useState([])
  const [errMessage, setErrMessage] = useState('')

  const id = useFormInput('')

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()

    axios
      .get(`${apiUrl}/users/${id.value}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res)
        setUser(res.data)
      })
      .catch((err) => {
        console.log(err)
        setErrMessage(err.message)
      })
  }

  return (
    <CRow>
      <CRow>
        <CAlert
          className="mx-4"
          visible={errMessage !== ''}
          color="danger"
          dismissible
          onClose={() => setErrMessage('')}
        >
          {errMessage}
        </CAlert>
        <CCard>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CInputGroup className="mb-3">
                <CInputGroupText>#</CInputGroupText>
                <CFormInput placeholder="Id" {...id} required />
              </CInputGroup>
              <div className="d-grid">
                <CButton color="success" type="submit">
                  Get User
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CRow>
      <CCard className="my-4">
        <CCardHeader>User</CCardHeader>
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
              <CTableRow>
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
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CRow>
  )
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  return {
    value,
    onChange: handleChange,
  }
}

export default GetUser
