import React from 'react';
import Main from './page/Main';
import Add from './page/Add';
import Login from './page/Login';
import AddList from './components/AddList';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Add" element={<Add />} />
        <Route path="/AddList" element={<AddList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
