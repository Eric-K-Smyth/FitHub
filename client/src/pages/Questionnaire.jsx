import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_PROFILE } from '../utils/mutations';
import Auth from '../utils/auth';

const Questionnaire = () => {
  const [formData, setFormData] = useState({
    username: '',
    height: '',
    payMember: false,
    bw_start: '',
    bw_current: '',
    bw_goal: '',
    dietary: ['654d4b4be6f309e1658ca671'],
    routines: ['654d4b4be6f309e1658ca680'],
    calendar: ['2023-11-09'],
  });

  const navigate = useNavigate();
  const [createProfile] = useMutation(CREATE_PROFILE);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
  };

  console.log('THIS IS THE FORMDATA:', formData);
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const profile = Auth.getProfile();
    console.log('THIS IS THE PROFILE:', profile);
  
    const userId = profile?.authenticatedPerson?._id;
    console.log('THIS IS THE USERID:', userId);

    const username = profile?.authenticatedPerson?.username;
    console.log('THIS IS THE USERNAME:', username);
  
    if (!userId) {
      console.error('No user ID found');
      return;
    }
    const parsedHeight = formData.height ? parseInt(formData.height) : null;
    const parsedStartWeight = formData.bw_start ? parseInt(formData.bw_start) : null;
    const parsedCurrentWeight = formData.bw_current ? parseInt(formData.bw_current) : null;
    const parsedGoalWeight = formData.bw_goal ? parseInt(formData.bw_goal) : null;
    
    if (
      parsedHeight === null ||
      parsedStartWeight === null ||
      parsedCurrentWeight === null ||
      parsedGoalWeight === null
    ) {
      console.error('One or more numeric fields are invalid.');
      return;
    }
  
  try {
    const { data } = await createProfile({
      variables: {
        id: userId, 
        username: username,
        height: parsedHeight,
        payMember: formData.payMember,
        bw_start: parsedStartWeight,
        bw_current: parsedCurrentWeight,
        bw_goal: parsedGoalWeight, 
        dietary: formData.dietary, 
        routines: formData.routines,
        calendar: formData.calendar,
      },
    });
  
      console.log('Profile created!!!! Data:', data.createProfile);
      navigate('/me');
    } catch (e) {
      console.error('Error submitting form:', e);
    }
  };  

  // if (error) {
  //   console.error('Error occurred while submitting the form:', error.message);
  //   return <p>An error occurred while submitting the form.</p>;
  // }
  

  return (
    <div className="questionnaire">
      <form onSubmit={handleSubmit}>
        <h2>Create Profile</h2>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Height (in cm):
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Starting Weight (in kg):
          <input
            type="number"
            name="bw_start"
            value={formData.bw_start}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Current Weight (in kg):
          <input
            type="number"
            name="bw_current"
            value={formData.bw_current}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Goal Weight (in kg):
          <input
            type="number"
            name="bw_goal"
            value={formData.bw_goal}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Paid Member:
          <input
            type="checkbox"
            name="payMember"
            checked={formData.payMember}
            onChange={handleChange}
          />
        </label>
        <label>
          Dietary Restrictions:
          <select multiple name="dietary" value={formData.dietary} onChange={handleChange}>
            {/* DIETARY OPTIONS HERE */}
          </select>
        </label>
        <label>
          Routines:
          <select multiple name="routines" value={formData.routines} onChange={handleChange}>
            {/* ROUTINE OPTIONS HERE */}
          </select>
        </label>
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};
export default Questionnaire;
