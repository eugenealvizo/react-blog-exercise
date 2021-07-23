import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="container form">
    <h1>Sorry Page Not Found!</h1>
    <Link className="btn" to="/">
      Go Home
    </Link>
  </div>
);

export default NotFound