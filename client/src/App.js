import React, { useState } from 'react'
import './scss/style.scss'
import { CCol, CRow, CForm, CFormLabel, CFormSelect, CContainer } from '@coreui/react'
import QueryResult from './components/QueryResult'

const App = () => {
  const queryTypes = ['Create user', 'Get all users', 'Get user', 'Update user', 'Delete user']
  const queryType = [0, 1, 2, 3, 4]
  const [query, setQuery] = useState(0)

  const [data, setData] = useState({})

  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <div className="body flex-grow-1 px-3 py-4">
        <CContainer lg>
          <CRow className="align-items-center py-4">
            <CForm className="py-4">
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Query Type</CFormLabel>
                <CFormSelect
                  aria-label="Default select example"
                  value={query}
                  onChange={(e) => setQuery(parseInt(e.target.value))}
                >
                  {queryType.map((qt, index) => {
                    return (
                      <option key={index} value={qt}>
                        {queryTypes[qt]}
                      </option>
                    )
                  })}
                </CFormSelect>
              </div>
            </CForm>
            <CCol className="align-items-center">
              <QueryResult queryType={query} />
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  )
}

export default App
