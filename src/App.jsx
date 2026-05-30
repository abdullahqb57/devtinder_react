import { useState } from 'react'
import{ BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/header';
import Body from './components/body';
import Footer from './components/footer';
import Login from './components/login';
import './App.css'

function App() {

  return (
    <BrowserRouter basename='/'>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} >
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<h1>About Page</h1>} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter >
  )
}

export default App
