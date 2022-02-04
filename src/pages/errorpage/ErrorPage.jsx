import React from 'react';
import {Link} from 'react-router-dom'

function ErrorPage() {
  return <div className='pa-2 m-2' style={{ textAlign:'center' }}>
      <h1>Oops</h1>

      <p>Please visit homepage</p>

      <Link to="/all-banks">
       <button type="button" className="btn btn-dark">Homepage</button>
       </Link>
  </div>
}

export default ErrorPage;
