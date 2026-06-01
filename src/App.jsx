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
import Profile from './components/profile';
import Connections from './components/connections';
import Requests from './components/requests';

function App() {

  return (
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} >
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Requests />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter >
    </Provider>
  )
}

export default App
