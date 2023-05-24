import React from 'react';
import Main from './page/Main';
import Add from './page/Add';
import Login from './page/Login';
import Trail from './page/Trail';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Add" element={<Add />} />
        <Route path="/Trail" element={<Trail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
