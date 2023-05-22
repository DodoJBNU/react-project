import React from 'react';
import Head from '../components/Head';
import Map from '../components/Map';
import AddList from '../components/AddList';
import TrailList from '../components/TrailList';

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
      <div>
        <AddList />
      </div>
    </div>
  );
}

export default Add;
