import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_PROFILE } from '../utils/mutations';
import Auth from '../utils/auth';
import './Style.css';

const Questionnaire = () => {
  const [formData, setFormData] = useState({
    username: '',
    height: '',
    payMember: false,
    bw_start: '',
    bw_current: '',
    bw_goal: '',
    // dietary: ['654d4b4be6f309e1658ca671'],THIS INFORMATION IS BEING COLLECTED IN THE MEAL PLANNER ALREADY
    routines: ['654d4b4be6f309e1658ca680'],
    calendar: ['2023-11-09'],
  });

  const navigate = useNavigate();
  const [createProfile] = useMutation(CREATE_PROFILE);

  const handleChange = (e) => {
    const { name, type, checked, options } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (type === 'select-multiple') {
      let values = Array.from(options)
                       .filter(option => option.selected)
                       .map(option => option.value);
      setFormData({
        ...formData,
        [name]: values,
      });
    } else {
      setFormData({
        ...formData,
        [name]: e.target.value,
      });
    }
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
    const parsedCurrentWeight = formData.bw_current ? parseInt(formData.bw_current) : null;
    const parsedGoalWeight = formData.bw_goal ? parseInt(formData.bw_goal) : null;
    
    if (
      parsedHeight === null ||
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
        payMember: true, //HARDCODED FOR NOW
        bwStart: parsedCurrentWeight,
        bwCurrent: parsedCurrentWeight,
        bwGoal: parsedGoalWeight, 
        // dietary: formData.dietary, 
        // routines: formData.routines,
        // calendar: formData.calendar,
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
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="height">Height (in cm):</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bw_current">Current Weight (in kg):</label>
          <input
            type="number"
            id="bw_current"
            name="bw_current"
            value={formData.bw_current}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bw_goal">Goal Weight (in kg):</label>
          <input
            type="number"
            id="bw_goal"
            name="bw_goal"
            value={formData.bw_goal}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="dietary">Dietary Restrictions:</label>
          <select
            multiple
            id="dietary"
            name="dietary"
            value={formData.dietary}
            onChange={handleChange}
          >
            <option value="Paleo">Paleo</option>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Ketogenic">Ketogenic</option>
            <option value="GlutenFree">Gluten Free</option>
          </select>
        </div> */}
        <button type="submit" className="submit-btn">Create Profile</button>
      </form>
    </div>
  );
};
export default Questionnaire;
