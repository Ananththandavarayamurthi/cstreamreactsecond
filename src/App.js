import React from 'react';
import EmployeeReimbursementForm from './component/EmployeeReimbursementForm';
import OrganizationMainDashboard from './component/OrganizationMainDashboard';

import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {
  return (
    
    <div>
      <BrowserRouter>
      <h1>Reimbursement Tracker</h1>
      <Routes>
      
      <Route path="/employerreimbersment" element={<EmployeeReimbursementForm />}/>
      
      <Route path="/" element={<OrganizationMainDashboard  />}/>
      
      
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
