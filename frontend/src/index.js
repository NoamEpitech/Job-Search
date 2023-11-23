import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import About from './About';
import Contact from './Contact';
import Navbar from './Navbar';
import SignUp from './SignUp';
import SignIn from './SignIn';
import AdminPage from './AdminPage';

ReactDOM.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path='/About' element={<About />} />
      <Route path='/Contact' element={<Contact />} />
      <Route path='/AdminPage' element={<AdminPage />} />
      <Route path='/SignIn' element={<SignIn />} />
      <Route path='/SignUp' element={<SignUp />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
