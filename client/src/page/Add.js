import React from 'react';
import Head from '../components/Head';
import Map from '../components/Map';
import AddList from '../components/AddList';
import MapDistance from '../components/MapDistance';
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
      <div>
        <MapDistance />
      </div>
    </div>
  );
}

export default Add;
