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
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', width: '100vw', flex: 1 }}>
      <div style={{ flex: 8 }}>
        <div style={{ width: '70vw', height: '90vh', marginLeft: '5vw', marginTop: '5vh' }}>
          <Map locations={locations} />
        </div>
      </div>

      <div style={{ flex: 2 }}>
        <div>
          <Head />
        </div>
        <div>
          <List UpdateLocations={setLocationsUpdate} />
        </div>
      </div>
    </div>
  );
}

export default Main;
