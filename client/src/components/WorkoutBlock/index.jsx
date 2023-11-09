import React, { useState } from 'react';
import './WorkoutBlock.css';

const WorkoutBlock = ({ workout }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const getDescriptionPreview = () => {
    const words = workout.instructions.split(' ');
    if (expanded) {
      return words.join(' ');
    } else {
      return words.slice(0, 10).join(' ');
    }
  };

  return (
    <div className="workout-block" style={{ backgroundImage: `url(${workout.image})` }}>
      <div className="workout-content">
        <h3>{workout.name}</h3>
        <p>Category: {workout.category}</p>
        <p>Sets: {workout.sets}</p>
        <p>Reps: {workout.reps}</p>
        <div className={`description ${expanded ? 'expanded' : ''}`}>
          <p>{workout.instructions}</p>
        </div>
        {!expanded && (
          <div className="save-button-container">
            <button className="save-button">Save to Routine</button>
          </div>
        )}
        <button className="expand-button" onClick={toggleExpand}>
          {expanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
};

export default WorkoutBlock;
