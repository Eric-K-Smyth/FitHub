import React from 'react';
import './infoblocks.css';
import mealPic from '../../../dist/assets/images/fithub-food-pic.jpg';

const HoverBlocks = () => {
  return (
    <section className="hover-blocks-section">
      <div className="block hover-shadow" style={{ backgroundImage: `url(${mealPic})` }}>
        <div className="overlay-text">
          <h2>Meal Suggestions</h2>
          <p>We put together meal suggestions for you that help you to reach your fitness goals</p>
        </div>
      </div>
      <div className="block hover-shadow" style={{ backgroundImage: `url(${mealPic})` }}></div>
      <div className="block hover-shadow" style={{ backgroundImage: `url(${mealPic})` }}></div>
    </section>
  );
}

export default HoverBlocks;
