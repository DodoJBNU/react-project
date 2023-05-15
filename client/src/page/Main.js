import React from 'react';

import Head from '../components/Head';
import Map from '../components/Map';
import List from '../components/List';
import '../components/Head.css';
import '../components/List.css';

function Main() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
      }}
    >
      <div style={{ width: '100vw' }}>
        <Head />
      </div>
      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ flex: 8 }}>
          <Map />
        </div>
        <div style={{ flex: 2 }}>
          <List />
        </div>
      </div>
    </div>
  );
}

export default Main;
