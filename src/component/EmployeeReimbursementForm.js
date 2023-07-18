import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeReimbursementForm = () => {
  const [formData, setFormData] = useState({
    typeOfExpense: '',
    date: '',
    amount: '',
  });
  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new FormData object to send the form data including the file
    const formDataToSend = new FormData();
    formDataToSend.append('typeOfExpense', formData.typeOfExpense);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('amount', formData.amount);

    // Make the API call to submit the reimbursement form data
    fetch('https://cstreambacknedsec.onrender.com/api/reimbursements', {
      method: 'POST',
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Reimbursement submitted:', data);
        // Reset the form after successful submission
        setFormData({
          typeOfExpense: '',
          date: '',
          amount: '',
        });
      }).then(navigate("/"))
      .catch((error) => console.error('Error submitting reimbursement:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add form fields to capture required details */}
      <label>
        Type of Expense:
        <input
          type="text"
          name="typeOfExpense"
          value={formData.typeOfExpense}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </label>
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default EmployeeReimbursementForm;
