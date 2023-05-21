import React from 'react';
import { useLocation } from 'react-router-dom';
import Head from '../components/Head';
function Trail() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user_id = searchParams.get('user_id');
  const trail_id = searchParams.get('trail_id');

  return (
    <form>
      <div>
        <div>
          <Head />
        </div>
        <div>
          Trail Page; user_id: {user_id} , trail_id : {trail_id}
        </div>
      </div>
    </form>
  );
}

export default Trail;
