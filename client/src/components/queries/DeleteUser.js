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

const DeleteUser = () => {
  const [user, setUser] = useState([])
  const [success, setSuccess] = useState(false)
  const [errMessage, setErrMessage] = useState('')

  const id = useFormInput('')

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()

    axios
      .delete(`${apiUrl}/users/${id.value}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res)
        setSuccess(true)
      })
      .catch((err) => {
        console.log(err)
        setErrMessage(err.message)
      })
  }

  return (
    <CRow>
      <CCard className="mb-4">
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CInputGroup className="mb-3">
              <CInputGroupText>#</CInputGroupText>
              <CFormInput placeholder="Id" {...id} required />
            </CInputGroup>
            <div className="d-grid">
              <CButton color="success" type="submit">
                Delete User
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>

      <CAlert
        visible={errMessage !== ''}
        color="danger"
        dismissible
        onClose={() => setErrMessage('')}
      >
        {errMessage}
      </CAlert>
      <CAlert visible={success} color="success" dismissible onClose={() => setSuccess(false)}>
        User successfully deleted!
      </CAlert>
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

export default DeleteUser
