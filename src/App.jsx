import { useState } from 'react'
import{ BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/header';
import Body from './components/body';
import Footer from './components/footer';
import Login from './components/login';
import './App.css'
import { Provider } from 'react-redux';
import appStore from './store/appStore';
import Feed from './components/feed';

function App() {

  return (
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} >
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter >
    </Provider>
  )
}

export default App
