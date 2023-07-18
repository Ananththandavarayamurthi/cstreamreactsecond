import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EmployeeReimbursementForm = () => {
  const [formData, setFormData] = useState({
    typeOfExpense: '',
    date: '',
    amount: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation to check if the form fields have valid values
    if (!formData.typeOfExpense || !formData.date || !formData.amount) {
      toast.error('Please fill in all required fields.');
      return;
    }

    // Convert the amount to a number if needed (depends on server requirements)
    const amount = parseFloat(formData.amount);

    // Make the API call to submit the reimbursement form data
    fetch('https://cstreambacknedsec.onrender.com/api/reimbursements', {
      method: 'POST',
      body: JSON.stringify({
        typeOfExpense: formData.typeOfExpense,
        date: formData.date,
        amount: amount,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Check if the response contains an error message
        if (data.error) {
          toast.error(`Error submitting reimbursement: ${data.error}`);
        } else {
          toast.success('Reimbursement submitted successfully.');
          // Reset the form after successful submission
          setFormData({
            typeOfExpense: '',
            date: '',
            amount: '',
          });
          // Navigate to the root route ("/") after successful submission
          navigate('/');
        }
      })
      .catch((error) => toast.error('Error submitting reimbursement:', error));
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
