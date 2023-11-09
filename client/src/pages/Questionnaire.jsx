import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Questionnaire = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    fitnessGoals: {
      loseWeight: false,
      buildMuscle: false,
      improveCardio: false,
      increaseFlexibility: false,
    },
    currentFitnessLevel: '',
    fitnessEquipment: '',
    workoutPreference: '',
    dietaryRestrictions: '',
    dietaryDetails: '',
    eatingHabits: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'fitnessGoals') {
      setFormData({
        ...formData,
        fitnessGoals: { ...formData.fitnessGoals, [value]: checked },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    try {
        // NEED TO IMPLEMENT DATA SUBMISSION TO BACKEND
        navigate('/me');
      } catch (error) {
        console.error('Error submitting form:', error);
      }
  };

  return (
    <div className="questionnaire">
      <form onSubmit={handleSubmit}>
        <h2>Fitness Questionnaire</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="preferNotToSay">Prefer not to say</option>
          </select>
        </div>
        <div>
          <label>Height:</label>
          <input
            type="text"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="e.g., 5'8'' or 172 cm"
          />
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="e.g., 150 lbs or 68 kg"
          />
        </div>
        <div>
          <label>Fitness Goals (select all that apply):</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="fitnessGoals"
                value="loseWeight"
                checked={formData.fitnessGoals.loseWeight}
                onChange={handleChange}
              />
              Lose Weight
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="fitnessGoals"
                value="buildMuscle"
                checked={formData.fitnessGoals.buildMuscle}
                onChange={handleChange}
              />
              Build Muscle
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="fitnessGoals"
                value="improveCardio"
                checked={formData.fitnessGoals.improveCardio}
                onChange={handleChange}
              />
              Improve Cardiovascular Health
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="fitnessGoals"
                value="increaseFlexibility"
                checked={formData.fitnessGoals.increaseFlexibility}
                onChange={handleChange}
              />
              Increase Flexibility
            </label>
          </div>
        </div>
        <div>
          <label>Current Fitness Level:</label>
          <select
            name="currentFitnessLevel"
            value={formData.currentFitnessLevel}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="sedentary">Sedentary (little to no physical activity)</option>
            <option value="lightlyActive">Lightly Active (light exercise a few times a week)</option>
            <option value="moderatelyActive">Moderately Active (regular exercise 3-5 times a week)</option>
            <option value="veryActive">Very Active (intense exercise most days of the week)</option>
          </select>
        </div>
        <div>
          <label>Fitness Preferences:</label>
          <label>
            <input
              type="radio"
              name="fitnessEquipment"
              value="yes"
              checked={formData.fitnessEquipment === 'yes'}
              onChange={handleChange}
            />
            Yes, I have fitness equipment
          </label>
          <label>
            <input
              type="radio"
              name="fitnessEquipment"
              value="no"
              checked={formData.fitnessEquipment === 'no'}
              onChange={handleChange}
            />
            No, I don't have fitness equipment
          </label>
        </div>
        <div>
          <label>Do you prefer home workouts or going to a gym?</label>
          <label>
            <input
              type="radio"
              name="workoutPreference"
              value="homeWorkouts"
              checked={formData.workoutPreference === 'homeWorkouts'}
              onChange={handleChange}
            />
            Home Workouts
          </label>
          <label>
            <input
              type="radio"
              name="workoutPreference"
              value="gymWorkouts"
              checked={formData.workoutPreference === 'gymWorkouts'}
              onChange={handleChange}
            />
            Gym Workouts
          </label>
        </div>
        <div>
          <label>Nutrition and Diet:</label>
          <label>
            <input
              type="radio"
              name="dietaryRestrictions"
              value="yes"
              checked={formData.dietaryRestrictions === 'yes'}
              onChange={handleChange}
            />
            Yes (please specify):
          </label>
          {formData.dietaryRestrictions === 'yes' && (
            <input
              type="text"
              name="dietaryDetails"
              value={formData.dietaryDetails}
              onChange={handleChange}
              placeholder="Specify dietary restrictions"
            />
          )}
          <label>
            <input
              type="radio"
              name="dietaryRestrictions"
              value="no"
              checked={formData.dietaryRestrictions === 'no'}
              onChange={handleChange}
            />
            No
          </label>
        </div>
        <div>
          <label>How would you rate your current eating habits?</label>
          <select
            name="eatingHabits"
            value={formData.eatingHabits}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Questionnaire;
