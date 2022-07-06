import React from 'react';
import { Link } from 'react-router-dom';


const Page404 = () => {
  return (
  <div>
      <h1>
      Page Not Found
      </h1>

      <Link to="/home" className="mb-3">
        <h3>Click here to return to the Home Page</h3>
      </Link>
    </div>
  );
};

export default Page404;
