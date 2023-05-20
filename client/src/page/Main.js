import React, { useState } from 'react';

import Head from '../components/Head';
import Map from '../components/Map';
import List from '../components/List';
import '../components/Head.css';
import '../components/List.css';

function Main() {
  const [locations, setLocations] = useState([]);

  const setLocationsUpdate = (newLocations) => {
    setLocations(newLocations);
  };
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
          <Map locations={locations} />
        </div>
        <div style={{ flex: 2 }}>
          <List UpdateLocations={setLocationsUpdate} />
        </div>
      </div>
    </div>
  );
}

export default Main;
