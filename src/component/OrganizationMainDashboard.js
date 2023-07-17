import React, { useEffect, useState } from 'react';
import StatisticsGraphs from './StatisticsGraphs';


const OrganizationMainDashboard = () => {
  const [reimbursements, setReimbursements] = useState([]);
  console.log(reimbursements)

  useEffect(() => {
    // Fetch the list of employees who applied for reimbursement from the backend
    fetch('http://localhost:4000/api/reimbursements')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setReimbursements(data);
      })
      .catch((error) => console.error('Error fetching reimbursements:', error));
  }, []);

  const handleApproveReject = (id, status) => {
    // Update the reimbursement status (approve/reject) on the backend
    fetch(`http://localhost:4000/api/reimbursements/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the status in the local state
        setReimbursements((prevReimbursements) => {
          const updatedReimbursements = prevReimbursements.map((reimbursement) =>
            reimbursement._id === data._id ? { ...reimbursement, status: data.status } : reimbursement
          );
          return updatedReimbursements;
        });
      })
      .catch((error) => console.error('Error updating reimbursement status:', error));
  };

  return (
    <div>
      <h2>Reimbursement Requests</h2>
      <ul>
        {reimbursements.map((reimbursement) => (
          <li key={reimbursement._id}>
            {reimbursement.typeOfExpense} - {reimbursement.date.slice(0,10)} - {reimbursement.amount} - {reimbursement.status}
            <button onClick={() => handleApproveReject(reimbursement._id, 'approved')}>
              Approve
            </button>
            <button onClick={() => handleApproveReject(reimbursement._id, 'rejected')}>
              Reject
            </button>
          </li>
        ))}
      </ul>

      <StatisticsGraphs/>
    </div>
  );
};

export default OrganizationMainDashboard;
