import React from 'react';
import './infoblocks.css';
import { Link } from 'react-router-dom';
import mealPic from '../../../src/assets/images/meals-pic.jpg';
import runningPic from '../../../src/assets/images/running-pic.jpg';
import signPic from '../../../src/assets/images/sign-pic.jpg';


const HoverBlocks = () => {
  return (
    <section className="hover-blocks-section">
       <Link to="./mealapp" className="block hover-shadow"> 
      <div className="block hover-shadow" style={{ backgroundImage: `url(${mealPic})` }}>
        <h3 className="block-title">Meal Suggestions</h3>
        <div className="block-caption">
          Personalized meals tailored to your unique fitness goals and dietary needs.
        </div>
      </div>
      </Link>
      <div className="block hover-shadow" style={{ backgroundImage: `url(${runningPic})` }}>
      <h3 className="block-title">Progress Tracker</h3>
        <div className="block-caption">
          Visualize your progress and keep your workout streaks unbroken with our intuitive fitness tracker.
        </div>
      </div>
      <div className="block hover-shadow" style={{ backgroundImage: `url(${signPic})` }}>
      <h3 className="block-title">Daily Motivation</h3>
        <div className="block-caption">
          Discover daily curated quotes that propel you towards your goals, and start your day off right.
        </div>
      </div>
    </section>
  );
}

export default HoverBlocks;
