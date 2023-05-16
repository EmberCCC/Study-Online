import React from 'react';

import './index.css';
import Router from '../../route';
import { BrowserRouter } from 'react-router-dom';

export default function Admin(props) {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
