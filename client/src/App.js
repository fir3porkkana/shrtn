import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Header } from './components/Header'
import { Form } from './components/Form'
import { Stats } from './components/Stats'
import { Error } from './components/Error'
import './App.css'

const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000/api" : "/api"

const App = () => {
  const [error, setError] = useState()

  if (error) {
    return <Error/>
  }
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route
              path="/stats/:linkId"
              element={<Stats setError={setError} />}
            />
            <Route
              path=""
              element={<Form baseUrl={baseUrl} setError={setError} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
