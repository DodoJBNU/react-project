import React from 'react';
import Head from '../components/Head';
import Map from '../components/Map';
import AddList from '../components/AddList';
function Add() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
      }}
    >
      <div style={{ width: '100vw', height: '10vh' }}>
        <Head />
      </div>
      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ flex: 6 }}>
          <Map />
        </div>
        <div
          style={{
            flex: 4,
            boxSizing: 'border-box',
            padding: '0',
            border: '0.5vh solid',
          }}
        >
          <AddList />
        </div>
      </div>
    </div>
  );
}

export default Add;
