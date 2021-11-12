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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPhone, cilUser } from '@coreui/icons'

const apiUrl = 'https://nao9id5aeg.execute-api.us-east-1.amazonaws.com/dev/api'

const UpdateUser = () => {
  const [errMessage, setErrMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState([])

  const id = useFormInput('')

  const handleGet = (e) => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()

    axios
      .put(
        `${apiUrl}/users/${id.value}`,
        {
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        console.log(res)
        setSuccess(true)
      })
      .catch((err) => {
        console.log(err.response)
        setErrMessage(err.message)
      })
  }

  return (
    <CRow className="align-items-center">
      <CRow className="align-items-center">
        <CAlert
          className="mx-4"
          visible={errMessage !== ''}
          color="danger"
          dismissible
          onClose={() => setErrMessage('')}
        >
          {errMessage}
        </CAlert>
        <CAlert
          className="mx-4"
          visible={success}
          color="success"
          dismissible
          onClose={() => setSuccess(false)}
        >
          User successfully updated!
        </CAlert>
        <CCard className="mx-4">
          <CCardBody className="p-4">
            <CForm onSubmit={handleGet}>
              <CInputGroup className="mb-3">
                <CInputGroupText>#</CInputGroupText>
                <CFormInput placeholder="Id" {...id} required />
              </CInputGroup>
              <div className="d-grid">
                <CButton color="success" type="submit">
                  Get user
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CRow>
      <CRow className="align-items-center">
        <CCard className="mx-4 my-4">
          <CCardBody className="p-4">
            <CForm onSubmit={handleSubmit}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Name"
                  value={user?.name}
                  autoComplete="username"
                  required
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </CInputGroup>

              <CInputGroup className="mb-3">
                <CInputGroupText>@</CInputGroupText>
                <CFormInput
                  type="email"
                  placeholder="Email"
                  value={user?.email}
                  autoComplete="email"
                  required
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </CInputGroup>

              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilPhone} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Phone"
                  value={user?.phone}
                  autoComplete="Phone"
                  required
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
              </CInputGroup>

              <div className="d-grid">
                <CButton color="success" type="submit">
                  Update user
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CRow>
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

export default UpdateUser
