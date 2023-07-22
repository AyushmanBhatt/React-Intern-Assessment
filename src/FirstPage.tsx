import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const FirstPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name && phone && email) {
      const userDetails = {
        name,
        phone,
        email,
      };

      // Save user details in localStorage
      localStorage.setItem('userDetails', JSON.stringify(userDetails));

      // Route the user to the second page
      navigate('/second-page');
    } else {
      alert('Please enter all the details before proceeding.');
    }
  };

  return (
    <div>
      <h1>First Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <TextField type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Phone Number:
          <TextField type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <TextField type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FirstPage;
