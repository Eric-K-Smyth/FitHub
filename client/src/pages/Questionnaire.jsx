import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_PROFILE } from '../utils/mutations';
import Auth from '../utils/auth';
import './Style.css';
import { Input, FormControl, FormLabel } from "@chakra-ui/react";


const Questionnaire = () => {

  const navigate = useNavigate();
  //get the USER data 
  const profile = Auth.getProfile();
    const userId = profile?.authenticatedPerson?._id;
    const username = profile?.authenticatedPerson?.username;
  

  //initialize Diets selection
  const [selectedDietary, setSelectedDietary] = useState('');
  //initialize FormState
  const [formData, setFormData] = useState({
    username: username,
    height: '',
    bw_start: '',
    bw_goal: '',
    diets: ''
  });
  const [createProfile] = useMutation(CREATE_PROFILE);

  const handleChange = (e) => {
    if(e.target.id === 'dietary'){
      setSelectedDietary(e.target.value);
    }
    
    e.preventDefault();
    const { name, type, options } = e.target;
      setFormData({
        ...formData,
        [name]: e.target.value,
      });
  };
  
  console.log('THIS IS THE FORMDATA:', formData);
  
  const handleSubmit = async (event) => {
    event.preventDefault();

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
        payMember: false, //HARDCODED FOR NOW
        bwStart: parsedCurrentWeight,
        bwCurrent: parsedCurrentWeight,
        bwGoal: parsedGoalWeight, 
        dietary: formData.dietary, 
        routines: [],
        calendar: [],
      },
    });
  
      console.log('Profile created!!!! Data:', data.createProfile);
      navigate('/me');
    } catch (e) {
      console.error('Error submitting form:', e);
    }
  };  
  

  return (
    <div className="questionnaire">
      <h4>Welcome {formData.username}!</h4>
      <form onSubmit={handleSubmit} className="profile-form">
        <h3>Fill the form to create your profile</h3>
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
        <div className="form-group">
          <label htmlFor="dietary">Dietary Restrictions:</label>
          <select
            id="dietary"
            name="dietary" 
            onChange={handleChange}
            value={selectedDietary}
            >
                  <option value="">None</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Paleo">Paleo</option>
                  <option value="Ketogenic">Ketogenic</option>
                  <option value="Gluten Free">Gluten Free</option>
                  <option value="Vegan">Vegan</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">Create Profile</button>
      </form>
    </div>
  );
};
export default Questionnaire;
