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

const CreateUser = () => {
  const [errMessage, setErrMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const name = useFormInput('')
  const email = useFormInput('')
  const phone = useFormInput('')

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()

    axios
      .post(
        `${apiUrl}/users`,
        {
          name: name.value,
          email: email.value,
          phone: phone.value,
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
        if (res.status === 201) {
          setSuccess(true)
        }
      })
      .catch((err) => {
        console.log(err)
        setErrMessage(err.message)
      })
  }

  return (
    <CRow className="align-items-center">
      <CAlert
        visible={errMessage !== ''}
        color="danger"
        dismissible
        onClose={() => setErrMessage('')}
      >
        {errMessage}
      </CAlert>
      <CAlert visible={success} color="success" dismissible onClose={() => setSuccess(false)}>
        User successfully created!
      </CAlert>
      <CCard>
        <CCardBody className="p-4">
          <CForm onSubmit={handleSubmit}>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput placeholder="Name" {...name} autoComplete="username" required />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText>@</CInputGroupText>
              <CFormInput
                type="email"
                placeholder="Email"
                {...email}
                autoComplete="email"
                required
              />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilPhone} />
              </CInputGroupText>
              <CFormInput placeholder="Phone" {...phone} autoComplete="Phone" required />
            </CInputGroup>

            <div className="d-grid">
              <CButton color="success" type="submit">
                Create user
              </CButton>
            </div>
          </CForm>
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

export default CreateUser
